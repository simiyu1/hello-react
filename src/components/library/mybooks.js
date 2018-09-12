import React, { Component } from "react";
import TableBorrowed from "./table-borrowed";
import "./library.css";
import send from "../Helper";
import swal from "sweetalert";

export const fetchBooks = () => {
  /*Fetches all books

  :Takes no parameters
  :calls send()
  :returns: JSON
  */
  return send({},"GET", "/api/v1/users/mybooks/", true).then(response => response.json())
    
}

class MyBooks extends Component {
  /* Component to display borrowed books
  Parent component of TableBorrowed
  Makes call to get all the borrowed books
  */   
    
	state = {
	  error_message: "",
	  this_action: "borrowed",
	  message: "not set"
	}
  static defaultProps = {fetchBooks}

  componentDidMount() {
	  console.log("Mounting MyBooks");// eslint-disable-line no-console
    this.props.fetchBooks()
      .then(myBooks =>{
        this.myBooks = myBooks;
        console.log(">>>>>>",myBooks.message)// eslint-disable-line no-console
        // this.setState({myBooks})
        this.setState({message: myBooks.message})
        this.setState({myBooks})
        console.log("Message State>>>>>>:", this.state.message)// eslint-disable-line no-console
        this.forceUpdate()
        // this.setState(() => ({
        //   myBooks
        // }))
    
      })
	  console.log("After calling fetchBooks>>", this.state.message);// eslint-disable-line no-console
  }

  render() {
    console.log("the state>>>>>", this.state.myBooks)// eslint-disable-line no-console
    if (this.state.message === "Book not found"){
      swal("Go and borrow some books from library:)")
      return(<div className="empty"> No books here</div>);
    }
    return (
      <div className="table-borrowed">
        <TableBorrowed book={this.state.myBooks}/>
      </div>
    );
  }
}

export default MyBooks;
