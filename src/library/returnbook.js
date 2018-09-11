import React, { Component } from 'react';
import send, {saveStateToLocalStorage} from '../Helper';
import './library.css';
import swal from 'sweetalert';

class ReturnBook extends Component {

	
	  handleSubmit = (e) => {
        const book_id = localStorage.getItem("return_book_id")
        e.preventDefault()
		this.setState({showAlert:false})
		send(localStorage.getItem("book_id"),'PUT', '/api/v1/users/books/'+book_id, true)
		.then(response => response.json())
		.catch(err => console.log("Error",err ))
		.then(data => {
			console.log(data)
			saveStateToLocalStorage(data)
			},
          this.props.history.push({pathname:'/history'})
        )
          .then(saveStateToLocalStorage(this.state))
          swal(`You have successfully returned ${localStorage.getItem("title")}`);
      }

  render() {
    if (this.props.match.params){
        //const book = this.props.selected_book
        const {id} = this.props.match.params
        console.log(">>>>>>>>>>",id,"To return<<<<<<<<<<")
        localStorage.setItem("return_book_id", id);
        return (
            <div className="single-book-wrap">

                <div className="book-html">
                    
                        <form className="sign-in-htm" onSubmit={this.handleSubmit}>
                            <div>
                                <label>Return Book</label>
                                <img src='../booklogo.png' alt="book" />
                            </div>
                            <div className="group">
                            {localStorage.getItem("author")}
                                    <h2>Description:</h2>
                                        {localStorage.getItem("title")} Has been written by {localStorage.getItem("author")}. 
                                        <h2>Synopsis: </h2> 
                                    {localStorage.getItem("ISBN")}
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Return Book"/>
                            </div>
                            <div className="hr"></div>
                            <div className="foot-lnk">
                                <a href="#borrow-regulations">Read borrowing regulations</a>
                            </div>
                        </form>
                </div>
            </div>
        );
        }
        return (<div>Issue with your selection</div>);
    }

}

export default ReturnBook;
