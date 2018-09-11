import React, { Component } from 'react';
import logo from '../booklogo.png';
import {Link} from 'react-router-dom';
import send, {saveStateToLocalStorage} from '../Helper';
import './usercss.css';


class AdminPanel extends Component {
    state = { 
        total_users: "",
        total_books: '',
        total_returned: '',
        total_borrowed:''
    }


componentDidMount(){
    console.log("Mounting");
    console.log(this.book_request);
    this.fetchBooks();
    this.fetchAllUsers();
  }

  fetchBooks = () => {
    send({},'GET','/api/v1/books/', true)
    .then(response => response.json())
    .then(thisBooks =>{
      this.thisBooks = thisBooks;
      this.setState({"total_books": thisBooks.total_results})
      console.log("From---AP--state:", this.state.thisBooks)
      saveStateToLocalStorage(thisBooks)
      console.log(thisBooks.title);
      console.log("----After adminpAnel launch-----");
    })
  }

  fetchAllUsers = () => {
    console.log("fetching users-------")
    send({},'GET', '/api/v1/users/', true)
    .then(response => response.json())
    .then(allUsers =>{
      this.allUsers = allUsers;
      this.setState({"total_users": allUsers.total_results})
      saveStateToLocalStorage(allUsers)
      
    })
  }
    
    
     
    render() {
        return (
                <div className="mainContent clearfix">
                <div id="dashboard" className="dashboard">
                    <div className="monitor">
                    <h3 className="col-md-12 text-center">
                            Total Books
                            <br/>
                            <h1>{this.state.total_books}</h1>
                        </h3>
                    </div>
                    <div className="book-box">
                        <h3 className="col-md-12 text-center">
                            All Users
                            <br/>
                            <h1>{this.state.total_users}</h1>
                        </h3>
                    </div>
                    {/* <div className="book-box">
                        <h3 className="col-md-12 text-center">
                            Borrowed books
                            <br/>
                            <h1>{this.state.total_borrowed}</h1>
                        </h3>
                    </div>
                    <div className="book-box">
                        <h3 className="col-md-12 text-center">
                            All transactions
                            <br/>
                            <h1>{this.state.total_returned}</h1>
                        </h3>
                    </div> */}
                    
                </div>
            </div>
            );
    }
    
}
 
export default AdminPanel;