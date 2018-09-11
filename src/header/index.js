import React from 'react';
import {NavLink} from "react-router-dom";
import './header.css';

const Header = (props) => (
    <header className="row">
        <nav className="menu-navigation-round">
            <NavLink to="/" exact activeClassName="selected" >Home</NavLink>
            <NavLink to="/library" activeClassName="selected" >Library</NavLink>
            <NavLink to="/reach-us" activeClassName="selected">Reach us</NavLink>
            <NavLink to="/about" activeClassName="selected">About</NavLink>
            <NavLink to="/login" activeClassName="selected">Login</NavLink>
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
                    <NavLink to="/logout" activeClassName="selected" >Logout</NavLink>
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