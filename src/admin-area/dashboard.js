import React, { Component } from 'react';
import {BrowserRouter, Switch,Link, Route,Redirect} from 'react-router-dom';
import logo from '../booklogo.png';
import '../header/header.css';
import {NavLink} from "react-router-dom";
import AdminPanel from './admin-panel';
import ManageUser from './manage-users';
import Library from '../library';
import EditBook from './single-book/edit-book';
import AddBook from './single-book/add-book';
import DeleteBook from './single-book/delete-book';
import Reset from '../auth-pages/reset';
import swal from 'sweetalert';
import Logout from '../auth-pages/logout';


class DashBoard extends Component {
    state = { selected_book_id: "",
    total_results:""
    }

    componentDidMount(){
        console.log("Mounting Dashboard");
      }

    render() {
            console.log("Dashboard-------")
            return (
                <div class="admin-panel clearfix">
                    <div class="slidebar">
                        <div class="logo">
                          <a href=""></a>
                        </div>
                        <ul>
                          <NavLink to='/' activeClassName="selected">DashBoard</NavLink>
                          <NavLink to='/manage-library' activeClassName="selected">Library</NavLink>
                          <NavLink to='/addbook' activeClassName="selected">Add Book</NavLink>
                          <NavLink to='/manage-users/' activeClassName="selected">Users</NavLink>
                          <NavLink to='/admin-reset' activeClassName="selected">Security</NavLink>
                          <NavLink to='/adminlogout' activeClassName="selected" >Logout</NavLink>
                        </ul>
                    </div>
                    <div class="main">
                        <ul class="topbar clearfix">
                        <li><a href="#">D</a></li>
                        <li><a href="#">L</a></li>
                        <li><a href="#">U</a></li>
                        <li><a href="#">S</a></li>
                        </ul>
                        {/* <BrowserRouter> */}
                        <div className="App">
                            <Switch>
                            <Route exact path='/' component={AdminPanel}/>
                            {/* <Route path='/admin' component={AdminPanel}/> */}
                            <Route path='/manage-library' component={Library}/>
                            <Route path='/manage-users/' component={ManageUser}/>
                            <Route path='/edit-book/:id' component={EditBook}/>
                            <Route path='/adminlogout' component={Logout}/>
                            <Route path='/addbook' component={AddBook}/>
                            <Route path='/admin-reset' component={Reset}/>
                            <Route path='/delete/:id' component={DeleteBook}/>
                            </Switch>
                        </div>
                        {/* </BrowserRouter> */}
                        
                </div>
            </div>
            );
    }
    
}
 
export default DashBoard;