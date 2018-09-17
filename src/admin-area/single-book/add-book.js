import React, { Component } from "react";
import send, {saveStateToLocalStorage} from "../../Helper";
import "../../library/library.css";
import "./editbook.css";

import swal from "sweetalert";

class AddBook extends Component {
    
  constructor () {
    super();
    this.state = {
      ISBN: "",
      author: "",
      title: "",
      copies: "",
      mytitle: "unset"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

	  handleSubmit = (e) => {
	    e.preventDefault()
	    let bookdata = {
	      "ISBN":this.state.ISBN,
	      "author":this.state.author,
	      "title":this.state.title,
	      "copies":this.state.copies
	    }
	    this.setState({showAlert:false})
	    send(bookdata,"POST", "/api/v1/books/", true)
	      .then(response => response.json())
	      .catch(err => console.log("Error",err ))// eslint-disable-line no-console
	      .then(data => {
	        saveStateToLocalStorage(data)
	        swal(data.message)
	        this.setState({
	          showAlert: !this.state.showAlert,
	          error_message: data.message
	        })
              
	      })
	      .then(saveStateToLocalStorage(this.state))
	      .then(this.props.history.push({pathname:"/manage-library"}))
          

	  }
    

	  render() {
	    //   console.log(this.state.thisBooks)
	    return (
	      <div className="single-book-wrap">

	        <div className="edit-book-html">
                    
	          <form className="edit-book" onSubmit={this.handleSubmit}>
	            <div className="row">
	              <div className="column" >
	                <h2>Edit</h2>
	                <label >ISBN</label>
	                <input type="text" id="ISBN" name="ISBN" onChange={this.handleChange} value={this.state.ISBN}/>
	                <label >Author</label>
	                <input type="text" id="author" name="author" onChange={this.handleChange} value={this.state.author}/>
	                <label >Title</label>
	                <input type="text" id="title" name="title" onChange={this.handleChange} value={this.state.title}/>
	                <label >Copies</label>
	                <input type="text" id="copies" name="copies" onChange={this.handleChange} value={this.state.copies}/>
									<label><input type="submit" className="btn btn-default" value="Save"/></label>                    
	              </div>
            
	            </div>
	            <div className="row">
	              
	            </div>
	          </form>
	        </div>
	      </div>  
	    );

	  }
}

export default AddBook;
