import React, { Component } from 'react';
import './user-area.css';
import Header from '../header';
import {BrowserRouter, Switch, Route,Redirect} from 'react-router-dom';

import Auth from '../auth-pages';
import Library from '../library';

const Root = () => (
  <h2> Home Component</h2>
)
const BorrowBook = () =>(
  <h2>Serch Component</h2>
)
const About = () =>(
  <h2>Your simple library</h2>
)


const PrivateRoute = ({component: Component, ...rest}) =>(
  <Route {...rest} render={(props) => (
    Auth.state.isAuthenticated === true
    ? <Component {...props}/>
    : <Redirect to='/login'/>
  )} /> 
)

const CheckAuth={
  fkisAuthenticated: false,
  authenticate(cb){
    this.fkisAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb){
    this.fkisAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthDiv = ({history}) =>(
  CheckAuth.isAuthenticated === true
  ? <Header subtitle="Hello Books Logged in" />
  : <Header subtitle="Hello Books Not logged in" />
)


class App extends Component {
  

  render() {
    return (
      // <div className="container">
      //   <Header subtitle="Hello Books"/>
      //   <FeaturedBook book={this.state.allBooks}/>
      // </div>
      <BrowserRouter>
      <div className="App">
        <AuthDiv />
        {/* <ul>
          <li><Link to='/home/'>Home</Link></li>
          <li><Link to='/search'>Browse</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul> */}
        <Switch>
          <Route exact path='/' component={Root}/>
          <Route path='/library' component={Library}/>
          <Route path='/login' component={Auth}/>
          <Route path='/about' component={About}/>
          <PrivateRoute path='/borrow' component={BorrowBook}/>
        </Switch>
        
        
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
