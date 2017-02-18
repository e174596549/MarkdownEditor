import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MarkdownEditor from './editor'


// 程序的主入口
// class 是 es6 的语法
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <MarkdownEditor />
      </div>
    )
    // *** 需要注意的是, 组件必须 /> 结尾, 规定
  }
}

export default App;
