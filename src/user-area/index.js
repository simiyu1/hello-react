import React, { Component } from 'react';
import './user-area.css';
import Header, {UserHeader} from '../header';
import {BrowserRouter, Switch,Link, Route,Redirect} from 'react-router-dom';

import Auth from '../auth-pages';
import Reset from '../auth-pages/reset';
import Library from '../library';
import BorrowBook from '../library/borrow';
import ReturnBook from '../library/returnbook';
import MyBook from '../library/mybooks';
import MyHistory from '../library/myhistory';
import About from './about';
import ReachUs from './reach';
import {saveStateToLocalStorage, hydrateStateWithLocalStorage } from '../Helper';
import CheckoutBook from '../library/checkoutbook';
import MyReturned from '../library/myreturned';

import swal from 'sweetalert';

const Root = () => (
  <h2> Home Component</h2>
)


const PrivateRoute = ({component: Component, ...rest}) =>(
  <Route {...rest} render={(props) => (
    localStorage.getItem("isauthenticated") === "true"
    ? <Component {...props}/>
    :  <Redirect to='/login'/>
  )} /> 
)

// const CheckAuth={
//   fkisAuthenticated: localStorage.isauthenticated
// }

const AuthDiv = () =>(
  localStorage.getItem("isauthenticated") === "true"
  ? <UserHeader/>
  : <Header subtitle={<li><Link to='/login/'>Please login</Link></li>}/>
)


class App extends Component {

  componentDidMount() {
    hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      saveStateToLocalStorage()
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      saveStateToLocalStorage()
    );

    // saves if component has a chance to unmount
    saveStateToLocalStorage();
  }

  
  

  render() {
    
    return (
      // <div className="container">
      //   <Header subtitle="Hello Books"/>
      //   <FeaturedBook book={this.state.allBooks}/>
      // </div>
      <BrowserRouter>
      <div className="App">
      <AuthDiv/>
      {console.log("------Rendering-----",localStorage.getItem("isauthenticated"))}
        
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
          <Route path='/reach-us' component={ReachUs}/>
          <Route path='/checkoutbook' component={CheckoutBook}/>
          <PrivateRoute exact path='/borrow/:id' component={BorrowBook}/>
          <PrivateRoute exact path='/borrowed' component={MyBook}/>
          <PrivateRoute exact path='/returned' component={MyReturned}/>
          <PrivateRoute exact path='/history/' component={MyHistory}/>
          <PrivateRoute exact path='/return/:id' component={ReturnBook}/>
          <PrivateRoute exact path='/reset' component={Reset}/>
          {/* <Route path="/category/:catId" component={Category} /> */}
        </Switch>
        
        
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
