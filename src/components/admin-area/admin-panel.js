import React, { Component } from "react";
import send, {saveStateToLocalStorage} from "../Helper";
import "./usercss.css";


class AdminPanel extends Component {
    state = { 
      total_users: "",
      total_books: "",
      total_returned: "",
      total_borrowed:""
    }


    componentDidMount(){
      this.fetchBooks();
      this.fetchAllUsers();
    }

  fetchBooks = () => {
    send({},"GET","/api/v1/books/", true)
      .then(response => response.json())
      .then(thisBooks =>{
        this.thisBooks = thisBooks;
        this.setState({"total_books": thisBooks.total_results})
        saveStateToLocalStorage(thisBooks)
      })
  }

  fetchAllUsers = () => {
    send({},"GET", "/api/v1/users/", true)
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
        </div>
      </div>
    );
  }
    
}
 
export default AdminPanel;