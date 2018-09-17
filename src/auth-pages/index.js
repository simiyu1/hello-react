import React, { Component } from "react";
import send, {saveStateToLocalStorage} from "../Helper";
import "./auth.css";
import swal from "sweetalert";
import {Link} from "react-router-dom";

class Auth extends Component {
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
	
	  handleSubmit = (e) => {
	    e.preventDefault()
	    this.setState({showAlert:false})
	    send(this.state.user_details, "POST", "/api/v1/auth/login", this.state.headerRequired)
	      .then(response => response.json())
	      .catch(err => console.log("Error",err ))// eslint-disable-line no-console
	      .then(data => {
	        console.log("The role>>>>",data.role,"<<<<<<<")// eslint-disable-line no-console
	        saveStateToLocalStorage(data)
	        this.setState({
	          showAlert: !this.state.showAlert,
	          error_message: data.msg,
	          isauthenticated: true,
	          user_details: {name: "", username: data.username, email: "", password: "", confirm_password: ""}
		  }),
		  localStorage.setItem("role", data.role),
		  localStorage.setItem("isauthenticated", true),
	        localStorage.setItem("lcprops", this.props.history)})
			
	    if (localStorage.getItem("role")==="admin"){
	      this.props.history.push({pathname:"/admin"})
	      swal(localStorage.getItem("message"))
	        .then(saveStateToLocalStorage(this.state))
		  .then(localStorage.setItem("isauthenticated","true"))
	    }
	    else if (localStorage.getItem("role")=="normal"){
	      this.props.history.push({pathname:"/"})
	      swal(localStorage.getItem("message"))
	        .then(saveStateToLocalStorage(this.state))
		     .then(localStorage.setItem("isauthenticated","true"))
	    }
	    else {
	      this.props.history.push({pathname:"/login"})
	      swal(localStorage.getItem("message"))
	      localStorage.setItem("role", ""),
		  localStorage.setItem("isauthenticated", false)
	    }
	
	  }
	  render() {
	    return (
	      <div className="outer-div">

	        <div className="inner-div">
	      <div className="text-center mypadd">
	        <div className="logo">login</div>
	
	        <div className="login-form-1">
	          <form id="login-form" className="text-left" onSubmit={this.handleSubmit}>
	            <div className="login-form-main-message"></div>
	            <div className="main-login-form">
	              <div className="login-group">
	                <div className="form-group">
	                  <label htmlFor="lg_username" className="sr-only">Username</label>
	                  {/* <input id="email" type="email" className="input" data-type="text" onChange={this.handleChange}/> */}
	                  <input type="email" className="form-control" id="email" name="email" placeholder="email" onChange={this.handleChange}/>
	                </div>
	                <div className="form-group">
	                  <label htmlFor="lg_password" className="sr-only">Password</label>
	                  {/* <input id="password" type="password" className="input" data-type="password" onChange={this.handleChange}/> */}
	                  <input type="password" className="form-control" id="password" name="password" placeholder="password" onChange={this.handleChange}/>
	                </div>
	                
	              </div>
	              <button type="submit" className="login-button"><i className="fa fa-chevron-right"></i></button>
	            </div>
	            <div className="etc-login-form">
	              <p>new user? <Link to="/register">register here</Link></p>
	            </div>
	          </form>
	        </div>
	
	      </div>
	        </div>
	      </div>
	      
	    );
	  }
}

export default Auth;
