var Remarkable = require('remarkable');
var md = new Remarkable();

var $ = new Vue({
    el: '#editor',
    data: {
    input: '# hello',
    messageHtml: this.input,
    htmlModel: '',
    path:''
    },
    computed: {
        compiledMarkdown: function () {
            this.messageHtml = md.render(this.input)
          return this.messageHtml
        }
    },
    methods: {
        update: function (e) {
          this.input = e.target.value
        },
        download: function() {
            this.htmlModel = `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
            ${this.messageHtml}
            </body>
        </html>`
            //this.path = `${__dirname}/html/${new Date().getTime()}.html`
            //this.save(this.path, this.htmlModel)
            this.inputFileName()
        },
        openFile: function() {
            var spawn = require('child_process').spawn;
            var ls = spawn('open', [`${this.path}`])
            ls.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });
            ls.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
                if (data) {
                    $.$message({
                    type: 'success',
                    message: '文件打开失败!'
                    });
                } else {
                }
            });
            ls.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                this.$message({
                type: 'success',
                message: '文件打开成功!'
                });
            });
        },
        save: function(path, content) {
            const fs = require('fs')
            fs.writeFile(path, content, function(error) {
                if (error !== null) {
                    $.$message({
                    type: 'warning',
                    message: '文件写入失败!'
                    });
                } else {
                    $.$message({
                    type: 'success',
                    message: '文件保存成功!'
                    });
                    //console.log('文件保存成功!');
                $.openAlert()
                }
            })
        },
        inputFileName() {
            $.$prompt('请输入文件名', '保存', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                this.path = `${__dirname}/html/${value}.html`
                // this.$message({
                // type: 'success',
                // message: '文件保存路径: ' + this.path
                // });
                this.save(this.path, this.htmlModel)
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '取消输入'
                });
            });
        },
        openAlert() {
            this.$confirm(`${this.path.slice(-100)}`, '打开文件', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.openFile()
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消打开文件'
                });
            });
        }
    }
})
