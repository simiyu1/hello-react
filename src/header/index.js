import React from 'react';
import {NavLink,Redirect, withRouter} from "react-router-dom";
import './header.css';
import swal from 'sweetalert';
import send, {saveStateToLocalStorage} from '../Helper';


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

const Header = (props) => (
    <header className="row">
        <nav className="menu-navigation-round">
            <NavLink to="/" exact activeClassName="selected" >Home</NavLink>
            <NavLink to="/library" activeClassName="selected" >Library</NavLink>
            <NavLink to="/reach-us" activeClassName="selected">Reach us</NavLink>
            <NavLink to="/about" activeClassName="selected">About</NavLink>
            <NavLink to="/login" activeClassName="selected">Login</NavLink>
            <NavLink to='/borrow' activeClassName="selected">Borrow</NavLink>
        </nav>
        <div className="col-md-7 mt-5 subtitle">
            {props.subtitle}
        </div>
    </header>
);

const UserHeader = (props) => (
    <header className="row">
        <nav className="menu-navigation-round">
            <NavLink to='/library' activeClassName="selected">Library</NavLink>
            <NavLink to="/borrowed" activeClassName="selected" >Borrowed</NavLink>
            <NavLink to="/returned" activeClassName="selected">Returned</NavLink>
            <NavLink to="/history" activeClassName="selected">History</NavLink>
            <div className="dropdown">
            <span className="prof-area"><i class="fa fa-user-circle-o"></i>Profile</span>
                <div className="dropdown-content btn">
                    <NavLink to="/reset" activeClassName="selected">Reset Password</NavLink>
                    <NavLink to="/logout" activeClassName="selected" onClick={confirmLogout}>Logout</NavLink>
                </div>
            </div>  
        </nav>
        
        <div className="col-md-7 mt-5 subtitle">
            {props.subtitle}
        </div>
    </header>
);

const AdminPanel = ()=>(
    <div class="admin-panel clearfix">
        <div class="slidebar">
            <div class="logo">
            <a href=""></a>
            </div>
            <ul>
            <li><a href="#dashboard" id="targeted">Dashboard</a></li>
            <NavLink to='/manage-library' activeClassName="selected">Library</NavLink>
            <NavLink to='/manage-users' activeClassName="selected">Users</NavLink>
            <NavLink to='/admin-reset' activeClassName="selected">Security</NavLink>
            </ul>
        </div>
        <div class="main">
            <ul class="topbar clearfix">
            <li><a href="#">D</a></li>
            <li><a href="#">L</a></li>
            <li><a href="#">U</a></li>
            <li><a href="#">S</a></li>
            </ul>
        </div>
  </div>
)

export default Header;
export {UserHeader, AdminPanel};