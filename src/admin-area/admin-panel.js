import React, { Component } from 'react';
import logo from '../booklogo.png';
import {Link} from 'react-router-dom';
import {saveStateToLocalStorage} from '../Helper';


class AdminPanel extends Component {
    state = { selected_book_id: "",
    thisBooks:{
        title: '',
        ISBN: '',
        book_id:'',
        author:'',
        message: ''
    }
}

componentDidMount(){
    console.log("Mounting");
    console.log(this.book_request)
    this.fetchUsers();
  }

  fetchUsers = () => {
    console.log("Selected book-------", localStorage.getItem("selected_book_id"))
    fetch('http://127.0.0.1:5000/api/v1/books/'+localStorage.getItem("selected_book_id"))
    .then(response => response.json())
    .then(thisBooks =>{
      this.thisBooks = thisBooks;
      this.setState(() => ({
        thisBooks
      }));
      console.log("From-----state:", this.state.thisBooks)
      saveStateToLocalStorage(thisBooks)
      console.log(thisBooks.title);
      console.log("----After Fetching single-----");
    })
  }
    
    
     
    render() {
        if (this.props.match.params){
            //const book = this.props.selected_book
            const {id} = this.props.match.params
            localStorage.setItem("selected_book_id", id);
            console.log("to borrow-------", localStorage.getItem("selected_book_id"))
            return (
                <div className="mainContent clearfix">
                <div id="dashboard">
                    <div className="monitor">
                    <h3 className="col-md-12 text-center">
                            Total Books
                        </h3>
                    </div>
                    <div className="book-box">
                        <h3 className="col-md-12 text-center">
                            All Users
                            <br/>
                            <h1>{localStorage.getItem("total_results")}</h1>
                        </h3>
                    </div>
                    <div className="book-box">
                        <h3 className="col-md-12 text-center">
                            Borrowed books
                        </h3>
                    </div>
                    <div className="book-box">
                        <h3 className="col-md-12 text-center">
                            Returned Books
                        </h3>
                    </div>
                    <div className="book-box">
                        <h3 className="col-md-12 text-center">
                            All transactions
                        </h3>
                    </div>
                    
                </div>
            </div>
            );
        
        }
        return (<div>Issue with your selection</div>);
    }
    
}
 
export default AdminPanel;