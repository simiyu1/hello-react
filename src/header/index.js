import React from "react";
import {NavLink} from "react-router-dom";
import "./header.css";

const Header = (props) => (
  <div className="myheader">
    <ul>
      <NavLink to="/" exact activeClassName="selected" >Home</NavLink>
      <NavLink to="/library" activeClassName="selected" >Library</NavLink>
      <NavLink to="/reach-us" activeClassName="selected">Reach us</NavLink>
      <NavLink to="/about" activeClassName="selected">About</NavLink>
      <NavLink to="/login" activeClassName="selected">Login</NavLink>
    </ul>
    {props.subtitle}
  </div>
);

const UserHeader = (props) => (
  <div className="userheader">
    <ul>
      <NavLink to='/library' activeClassName="selected">Library</NavLink>
      <NavLink to="/borrowed" activeClassName="selected" >Borrowed</NavLink>
      <NavLink to="/returned" activeClassName="selected">Returned</NavLink>
      <NavLink to="/history" activeClassName="selected">History</NavLink>
      <div className="dropdown">
        <span className="prof-area"><i className="fa fa-user-circle-o"></i>Profile</span>
        <div className="dropdown-content btn">
          <NavLink to="/reset" activeClassName="selected">Reset Password</NavLink>
          <NavLink to="/logout" activeClassName="selected" >Logout</NavLink>
        </div>
      </div>
    </ul>
    {props.subtitle}
  </div>
);

const AdminHeader = ()=>(
  <div className="adminheader">
    <ul>
      <NavLink to='/' activeClassName="selected">DashBoard</NavLink>
      <NavLink to='/manage-library' activeClassName="selected">Library</NavLink>
      <NavLink to='/addbook' activeClassName="selected">Add Book</NavLink>
      <NavLink to='/manage-users/' activeClassName="selected">Users</NavLink>
      <NavLink to='/admin-reset' activeClassName="selected">Security</NavLink>
      <NavLink to='/adminlogout' activeClassName="selected" >Logout</NavLink>
    </ul>
  </div>
)

export default Header;
export {UserHeader, AdminHeader};