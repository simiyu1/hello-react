import React, { Component } from 'react';
import send, {saveStateToLocalStorage} from '../Helper';
import './library.css';
import swal from 'sweetalert';

class CheckoutBook extends Component {

	
	  handleSubmit = (e) => {
        const book_id = localStorage.getItem("book_id")
        e.preventDefault()
        console.log("Props<<>>>",this.props)
		this.setState({showAlert:false})
		send(localStorage.getItem("book_id"),'POST', '/api/v1/users/books/'+book_id, true)
		.then(response => response.json())
		.catch(err => console.log("Error",err ))
		.then(data => {
			console.log(data)
			saveStateToLocalStorage(data)
			this.setState({
			showAlert: !this.state.showAlert,
            error_message: data.msg
          })
          this.props.history.push({pathname:'/borrowed'})
          swal(`You have successfully borrowed ${localStorage.getItem('title')}`)
              
        })
          .then(saveStateToLocalStorage(this.state))
          
		  

      }

  render() {
    return (
        <div className="single-book-wrap">

            <div className="book-html">
                
			        <form className="sign-in-htm" onSubmit={this.handleSubmit}>
                        <div>
                            <label>Book you are about to borrow;</label>
                            
				        </div>
                        <div className="group">
                        {localStorage.getItem("author")} 's book
                                <h2>Description:</h2>
                                    {localStorage.getItem("title")} Has been written by {localStorage.getItem("author")}. 
                                    <h2>Synopsis: </h2> No synopsis available at the moment<br/>
                                 {localStorage.getItem("ISBN")}
                        </div>
                        <div className="group">
                            <input type="submit" className="button" value="Confirm Borrow"/>
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
}

export default CheckoutBook;
