import React, { Component } from "react";
import "./user-area.css";
import Header, {UserHeader} from "../header";
import {BrowserRouter, Switch,Link, Route,Redirect} from "react-router-dom";

import Auth from "../auth-pages";
import Reset from "../auth-pages/reset";
import Library from "../library";
import BorrowBook from "../library/borrow";
import ReturnBook from "../library/returnbook";
import MyBook from "../library/mybooks";
import MyHistory from "../library/myhistory";
import About from "./about";
import ReachUs from "./reach";
import {saveStateToLocalStorage } from "../Helper";
import CheckoutBook from "../library/checkoutbook";
import MyReturned from "../library/myreturned";

import DashBoard from "../admin-area/dashboard";

import Logout from "../auth-pages/logout";

const Root = () => (
  <div>
    <Library/>
  </div>
)
// localStorage.setItem("isauthenticated","unset")

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

const AuthDiv = () =>{
  if ((localStorage.getItem("role")==="normal") && (localStorage.getItem("isauthenticated") === "true")){
    return(<UserHeader/>)
  }
  else{
    return(<Header subtitle={<li><Link to='/login/'>Please login</Link></li>}/>)
  }
}

const AuthAdminDiv = () =>(
  ((localStorage.getItem("role")==="admin") && (localStorage.getItem("isauthenticated") === "true"))
    ? <DashBoard/>
    : <Header subtitle={<li><Link to='/login/'>Please login</Link></li>}/>
)


class App extends Component {
  static defaultProps = {saveStateToLocalStorage}

  componentDidMount() {
    // state ? hydrateStateWithLocalStorage(): state = {};
    

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.props.saveStateToLocalStorage()
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
    console.log(typeof localStorage.getItem("isauthenticated"))
    if((localStorage.getItem("role")==="admin") && (localStorage.getItem("isauthenticated") === "true")){
      return(
        <BrowserRouter>
          <div className="App">
            <AuthAdminDiv/>
          </div>
        </BrowserRouter>);
    }
    else{
      return (
        <BrowserRouter >
          <div className="App userApp">
            <AuthDiv/>
            {/* {console.log("------Rendering-----",localStorage.getItem("isauthenticated"))} */}
        
            <Switch>
              <Route exact path='/' component={Root}/>
              <Route path='/library' component={Library}/>
              <Route path='/login' component={Auth}/>
              <Route path='/logout' component={Logout}/>
              <Route path='/about' component={About}/>
              <Route path='/reach-us' component={ReachUs}/>
              <Route path='/checkoutbook' component={CheckoutBook}/>
              <PrivateRoute exact path='/borrow/:id' component={BorrowBook}/>
              <PrivateRoute exact path='/borrowed' component={MyBook}/>
              <PrivateRoute exact path='/returned' component={MyReturned}/>
              <PrivateRoute exact path='/history/' component={MyHistory}/>
              <PrivateRoute exact path='/return/:id' component={ReturnBook}/>
              <PrivateRoute exact path='/reset' component={Reset}/>
            </Switch>
        
        
          </div>
        </BrowserRouter>
      );
    }
  }
}

export default App;
export {AuthAdminDiv, AuthDiv}
