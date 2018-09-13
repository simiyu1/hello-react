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
	      <div className="login-wrap">

	        <div className="login-html">
	          <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked/><label htmlFor="tab-1" className="tab">Sign In</label>
	          <input id="tab-2" type="radio" name="tab" className="sign-up"/><label htmlFor="tab-2" className="tab">Sign Up</label>
		        <div className="login-form" >
			        <form className="sign-in-htm" onSubmit={this.handleSubmit}>
	              <div className="group">
	                <label htmlFor="pass" className="label">Email</label>
	                <input id="email" type="email" className="input" data-type="text" onChange={this.handleChange}/>
	              </div>
	              <div className="group">
	                <label htmlFor="pass" className="label">Password</label>
	                <input id="password" type="password" className="input" data-type="password" onChange={this.handleChange}/>
	              </div>
						
                        
	              <div className="group">
	                <input type="submit" className="button" value="Sign In"/>
	              </div>
	              <div className="hr"></div>
	              <div className="foot-lnk">
	                <a href="#forgot">Forgot Password?</a>
	              </div>
			        </form>
	          </div>
	        </div>
	      </div>
	    );
	  }
}

export default Auth;
