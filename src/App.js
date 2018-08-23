import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Link, Switch, Route} from 'react-router-dom';

import 
const Root = () => (
  <h2> Home Component</h2>
)
const Search = () =>(
  <h2>Serch Component</h2>
)
const List = () =>(
  <h2>List Component</h2>
) 

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
            <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          </header>
          <ul>
            <li><Link to='/home/search'>Home</Link></li>
            <li><Link to='/search'>Search</Link></li>
            <li><Link to='List'>List</Link></li>
          </ul>
          <Switch>
            <Route path='/home/search' component={Root}/>
            <Route path='/search' component={Search}/>
            <Route path='/lIst' component={List}/>
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

