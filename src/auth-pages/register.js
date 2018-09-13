import React, { Component } from "react";
import send, {saveStateToLocalStorage} from "../Helper";
import "./auth-pages.css";
import swal from "sweetalert";

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
	      <div className="login-wrap">

	        <div className="login-html">
	          <div className="sign-up-form">
	              <form className="sign-up-htm" onSubmit={this.handleSignup}>
	                <div className="group">
	                  <label htmlFor="user" className="label">Username</label>
	                  <input id="reg_username" type="text" className="input" onChange={this.handleChange} required/>
	                </div>
	                <div className="group">
	                  <label htmlFor="pass" className="label">Password</label>
	                  <input id="reg_password" type="password" className="input" data-type="password" onChange={this.handleChange}/>
	                </div>
	                <div className="group">
	                  <label htmlFor="pass" className="label">Repeat Password</label>
	                  <input id="confirm_password" type="password" className="input" data-type="password" onChange={this.handleChange}/>
	                </div>
	                <div className="group">
	                  <label htmlFor="reg_email" className="label">Email Address</label>
	                  <input id="reg_email" placeholder="enter email" type="email" className="input" onChange={this.handleChange} required="true"/>
	                </div>
	                <div className="group">
	                  <input type="submit" className="button" value="Sign Up"/>
	                </div>
	                <div className="hr"></div>
	                <div className="foot-lnk">
	                  <label htmlFor="tab-1"><a>Already Member?</a></label>
	                </div>
	              </form>
	            </div>
	          </div>
	        </div>
	    );
	  }
}

export default Auth;
