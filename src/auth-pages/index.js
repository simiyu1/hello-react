import React, { Component } from 'react';
import send, {saveStateToLocalStorage} from '../Helper';
import './auth-pages.css';

class Auth extends Component {
	state = {
		user_details: {name: "", username: "", email: "", password: "", confirm_password: ""},
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
	    console.log(this.state.user_details)
	  }
	
	  handleSubmit = (e) => {
		e.preventDefault()
		this.setState({showAlert:false})
		send(this.state.user_details, 'POST', '/api/v1/auth/login', this.state.headerRequired)
		.then(response => response.json())
		.catch(err => console.log("Error",err ))
		.then(data => {
			console.log("The role>>>>",data.role,"<<<<<<<")
			saveStateToLocalStorage(data)
			this.setState({
			showAlert: !this.state.showAlert,
			error_message: data.msg,
			isauthenticated: true,
			user_details: {name: "", username: data.username, email: "", password: "", confirm_password: ""}
		  }),
		  localStorage.setItem("role", data.role),
		  localStorage.setItem("isauthenticated", true),
		  localStorage.setItem("lcprops", this.props.history),
		  this.props.history.push({pathname:'/'})
		})
		  .then(saveStateToLocalStorage(this.state))
		  .then(localStorage.setItem("isauthenticated","true"))
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
                            <label htmlFor="user" className="label">Username</label>
                            <input id="username" type="text" className="input" onChange={this.handleChange} />
				        </div>
                        <div className="group">
                            <label htmlFor="pass" className="label">Password</label>
                            <input id="password" type="password" className="input" data-type="password" onChange={this.handleChange}/>
                        </div>
						<div className="group">
                            <label htmlFor="pass" className="label">Email</label>
                            <input id="email" type="email" className="input" data-type="text" onChange={this.handleChange}/>
                        </div>
                        <div className="group">
                            <input id="check" type="checkbox" className="check" checked onChange={this.handleChange}/>
                            <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
                        </div>
                        <div className="group">
                            <input type="submit" className="button" value="Sign In"/>
                        </div>
                        <div className="hr"></div>
                        <div className="foot-lnk">
                            <a href="#forgot">Forgot Password?</a>
                        </div>
			        </form>
			<div className="sign-up-htm">
				<div className="group">
					<label htmlFor="user" className="label">Username</label>
					<input id="reg_username" type="text" className="input" onChange={this.handleChange}/>
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
					<label htmlFor="pass" className="label">Email Address</label>
					<input id="reg_email" type="text" className="input" onChange={this.handleChange}/>
				</div>
				<div className="group">
					<input type="submit" className="button" value="Sign Up"/>
				</div>
				<div className="hr"></div>
				<div className="foot-lnk">
					<label htmlFor="tab-1"><a>Already Member?</a></label>
				</div>
			</div>
		</div>
	</div>
</div>
    );
  }
}

export default Auth;
