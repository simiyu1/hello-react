import React from 'react';
import {NavLink} from "react-router-dom";
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
        defeat: true,
      },
    })
    .then((value) => {
      switch (value) {
     
        case "defeat":
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
        console.log(data)
        saveStateToLocalStorage(data)
        localStorage.setItem("isauthenticated", false)
        this.props.history.push({pathname:"/"})
        })
      .then(saveStateToLocalStorage(this.state)
    )
   
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

export default Header;
export {UserHeader};