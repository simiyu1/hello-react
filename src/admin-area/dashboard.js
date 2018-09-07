import React, { Component } from 'react';
import {BrowserRouter, Switch,Link, Route,Redirect} from 'react-router-dom';
import logo from '../booklogo.png';
import '../header/header.css';
import send, {saveStateToLocalStorage} from '../Helper';
import {NavLink} from "react-router-dom";
import AdminPanel from './admin-panel';
import ManageUser from './manage-users';
import Library from '../library';
import EditBook from './single-book/edit-book';
import swal from 'sweetalert';

const confirmLogout= () => (
    swal("You are about to logout", {
      buttons: {
        confirmLogout: {
          text: "Logout",
          value: "logout",
        },
        Cancel: true,
      },
    })
    .then((value) => {
      switch (value) {
     
        case "Cancel":
          swal("Logout cancelled!");
          break;
     
        case "logout":
          handleLogout();
          swal("Logged Out!", "see you soon", "success");
          break;
     
        default:
          swal("cancelled");
      }
    })
  )
  
  
  
  const handleLogout = () => {
    //e.preventDefault()
    send({},'POST', '/api/v1/auth/logout', true)
    .then(response => response.json())
    .catch(err => console.log("Error",err ))
    .then(data => {
        console.log("Props History>>>>>>",this.props)
        saveStateToLocalStorage(data)
        localStorage.setItem("isauthenticated", false)
        })
      .then(saveStateToLocalStorage(this.state)
    ).then(<Redirect to="/" />)
   
  }
class DashBoard extends Component {
    state = { selected_book_id: "",
    total_results:""
    }

    componentDidMount(){
        console.log("Mounting Dashboard");
        this.fetchAllUsers();
      }

    fetchAllUsers = () => {
      console.log("fetching users-------")
      send({},'GET', '/api/v1/users/', true)
      .then(response => response.json())
      .then(allUsers =>{
        this.allUsers = allUsers;
        saveStateToLocalStorage(allUsers)
        console.log("watu wa>>>>>",allUsers.total_results);
        console.log(allUsers.objects);
        console.log("----After All users fetched-----");
      })
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
                          <li><a href="#dashboard" id="targeted">Dashboard</a></li>
                          <NavLink to='/admin' activeClassName="selected">New DashBoard</NavLink>
                          <NavLink to='/manage-library' activeClassName="selected">Library</NavLink>
                          <NavLink to='/manage-users/' activeClassName="selected">Users</NavLink>
                          <NavLink to='/admin-reset' activeClassName="selected">Security</NavLink>
                          <NavLink to='/admin-reset' activeClassName="selected" onClick={confirmLogout}>Logout</NavLink>
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
                            <Route exact path='/admin' component={AdminPanel}/>
                            <Route path='/admin' component={AdminPanel}/>
                            <Route path='/manage-library' component={Library}/>
                            <Route path='/manage-users/' component={ManageUser}/>
                            <Route path='/edit-book/:id' component={EditBook}/>
                            </Switch>
                        </div>
                        {/* </BrowserRouter> */}
                        
                </div>
            </div>
            );
    }
    
}
 
export default DashBoard;