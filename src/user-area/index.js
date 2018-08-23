import React, { Component } from 'react';
import './user-area.css';
import Header from './header';
import FeaturedBook from './featured-book';
import {BrowserRouter,Link, Switch, Route} from 'react-router-dom'

import Auth from '../auth-pages'

const Root = () => (
  <h2> Home Component</h2>
)
const Search = () =>(
  <h2>Serch Component</h2>
)


class App extends Component {
  state = { }

  componentDidMount() {
    console.log("Mounting");
    this.fetchBooks();
  }

  fetchBooks = () => {
    fetch('http://127.0.0.1:5000/api/v1/books/')
    .then(response => response.json())
    .then(allBooks =>{
      this.allBooks = allBooks;
      this.setState({allBooks});
      console.log(allBooks.objects);
    })
  }

  render() {
    return (
      // <div className="container">
      //   <Header subtitle="Hello Books"/>
      //   <FeaturedBook book={this.state.allBooks}/>
      // </div>
      <BrowserRouter>
      <div className="App">
        <Header subtitle="Hello Books"/>
        <ul>
          <li><Link to='/home/'>Home</Link></li>
          <li><Link to='/search'>Browse</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
        <Switch>
          <Route exact path='/' component={Root}/>
          <Route path='/search' component={Search}/>
          <Route path='/login' component={Auth}/>
        </Switch>
        <div>
        <FeaturedBook book={this.state.allBooks}/>
        </div>
        
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
