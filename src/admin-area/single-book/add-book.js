import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import send, {saveStateToLocalStorage, hydrateStateWithLocalStorage} from '../../Helper';
import '../../library/library.css';
import './editbook.css';

import swal from 'sweetalert';

class AddBook extends Component {
    
    constructor () {
        super();
        this.state = {
          ISBN: '',
          author: '',
          title: '',
          copies: '',
          mytitle: 'unset'
        };
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log("The value<<>>>",this.state.author)
      }

	  handleSubmit = (e) => {
        e.preventDefault()
        let bookdata = {
            "ISBN":this.state.ISBN,
            "author":this.state.author,
            "title":this.state.title,
            "copies":this.state.copies
        }
        console.log("Submiting NEW BOOK<<>>>")
		this.setState({showAlert:false})
		send(bookdata,'POST', '/api/v1/books/', true)
		.then(response => response.json())
		.catch(err => console.log("Error",err ))
		.then(data => {
			console.log("After add<<<<<<<<<:",data)
            saveStateToLocalStorage(data)
            swal(data.message)
            this.setState({
			showAlert: !this.state.showAlert,
            error_message: data.message
          })
              
        })
          .then(saveStateToLocalStorage(this.state))
          .then(this.props.history.push({pathname:'/manage-library'}))
          

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
                                        
                                </div>
            
                            </div>
                            <div className="row">
                                <label><input type="submit" className="button" value="Save"/></label>
                            </div>
                        </form>
                </div>
            </div>  
        );

  }
}

export default AddBook;
