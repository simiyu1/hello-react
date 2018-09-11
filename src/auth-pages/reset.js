import React, { Component } from 'react';
import send, {saveStateToLocalStorage} from '../Helper';
import './auth-pages.css';
import swal from 'sweetalert';

class Reset extends Component {
	state = {
		user_details: {name: "", username: "", email: "", password: "", confirm_new_password: "", new_password:""},
		showAlert: false,
		error_message: "",
		headerRequired: true,
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
		console.log("Logging details>>>",this.state.user_details)
		this.setState({showAlert:false})
		send(this.state.user_details, 'POST', '/api/v1/auth/reset', true)
		.then(response => response.json())
		.catch(err => console.log("Error",err ))
		.then(data => {
			console.log(data)
			saveStateToLocalStorage(data)
			swal(data.message," please login")
			this.setState({
			showAlert: !this.state.showAlert,
			error_message: data.msg,
			user_details: {name: "", username: data.username, email: "", password: "", confirm_password: ""}
		  })})
		  .then(saveStateToLocalStorage(this.state))
		  

	  }

  render() {
    return (
        <div className="reset-wrap">

            <div className="reset-html">
            <form className="reset-htm" onSubmit={this.handleSubmit}>
                        <div className="group">
                            <label htmlFor="pass" className="label">Old Password</label>
                            <input id="password" type="password" className="input" data-type="password" onChange={this.handleChange}/>
                        </div>
						<div className="group">
                            <label htmlFor="pass" className="label">New Password</label>
                            <input id="new_password" type="password" className="input" data-type="password" onChange={this.handleChange}/>
                        </div>
                        <div className="group">
                            <label htmlFor="pass" className="label">Confirm Password</label>
                            <input id="confirm_new_password" type="password" className="input" data-type="password" onChange={this.handleChange}/>
                        </div>
                        <div className="group">
                            <input type="submit" className="button" value="Reset"/>
                        </div>
                        <div className="hr"></div>
                        
			        </form>
			
			
		
	</div>
</div>
    );
  }
}

export default Reset;
