import React, { Component } from "react";
import send, {saveStateToLocalStorage} from "../Helper";
import {Link} from "react-router-dom";
import "./auth-pages.css";
import swal from "sweetalert";

class Register extends Component {
	state = {
	  user_details: {name: "", username: "", email: "", password: "", confirm_password: "",
	    reg_username:"", reg_email:"", reg_password:"" },
	  showAlert: false,
	  error_message: "",
	  headerRequired: false,
	  redirectToReferrer:false,
	  isauthenticated: false
	  }
	 
	  handleChange = (e) => {
	    const id = e.target.id
	    const user_details = Object.assign({}, this.state.user_details)
	    user_details[id] = e.target.value
	    this.setState({user_details})
	  }
	
	  

	  handleSignup = (e) => {
	    e.preventDefault()
	    this.setState({showAlert:false})
	    send(this.state.user_details, "POST", "/api/v1/auth/register", false)
	      .then(response => response.json())
	      .catch(err => console.log("Error",err ))// eslint-disable-line no-console
	      .then(regdata => {
	        swal(regdata.message)
	        saveStateToLocalStorage(regdata)
	        this.setState({
	          showAlert: !this.state.showAlert,
	          error_message: regdata.msg
		  }),
		  localStorage.setItem("lcprops", this.props.history),
		  this.props.history.push({pathname:"/login"})
	      })
		  .then(saveStateToLocalStorage(this.state))
	  }
	  

	  render() {
	    return (
	      <div className="outer-div">
	        <div className="inner-div">

	      <div className="text-center mypad">
	        <div className="logo">register</div>

	        <div className="login-form-1">
	          <form id="register-form" className="text-left" onSubmit={this.handleSignup}>
	            <div className="login-form-main-message"></div>
	            <div className="main-login-form">
	              <div className="login-group">
				
	                <div className="form-group">
	                  <label htmlFor="reg_email" className="sr-only">Email</label>
	                  <input type="text" className="form-control" id="reg_email" name="reg_email" placeholder="email" onChange={this.handleChange}/>
	                </div>
	                <div className="form-group">
	                  <label htmlFor="reg_password" className="sr-only">Password</label>
	                  <input type="password" className="form-control" id="reg_password" name="reg_password" placeholder="password" onChange={this.handleChange}/>
	                </div>
	                <div className="form-group">
	                  <label htmlFor="reg_password_confirm" className="sr-only">Password Confirm</label>
	                  <input type="password" className="form-control" id="confirm_password" name="reg_password_confirm" placeholder="confirm password" onChange={this.handleChange}/>
	                </div>
				
	                <div className="form-group login-group-checkbox">
	                  <input type="checkbox" className="" id="reg_agree" name="reg_agree"/>
	                  <label htmlFor="reg_agree">i agree with <a href="#">terms</a></label>
	                </div>
	              </div>
	              <button type="submit" className="login-button"><i className="fa fa-chevron-right"></i></button>
	            </div>
	            <div className="etc-login-form">
	              <p>already have an account? <Link to="/login">login here</Link></p>
	            </div>
	          </form>
	        </div>

	      </div>
	        </div>
	      </div>
	    );
	  }
}

export default Register;
