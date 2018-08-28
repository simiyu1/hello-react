import React from 'react';
import {NavLink} from "react-router-dom";
import './header.css';

const Header = (props) => (
    <header className="row">
        <nav className="menu-navigation-round">
            <NavLink to="/" exact activeClassName="selected" >Home</NavLink>
            <NavLink to="/library" activeClassName="selected" >Library</NavLink>
            <NavLink to="/reachus" activeClassName="selected">Reach us</NavLink>
            <NavLink to="/about" activeClassName="selected">About</NavLink>
            <NavLink to="/login" activeClassName="selected">Login</NavLink>
        </nav>
        <div className="col-md-7 mt-5 subtitle">
            {props.subtitle}
        </div>
    </header>
);

export default Header;