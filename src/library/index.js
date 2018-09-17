import React, { Component } from "react";
import FeaturedBook from "./featured-book";
import "./library.css";
import ManageBook from "../admin-area/manage-book";
import Send from "../Helper";

export const fetchBooks = () => {
  return Send({},"GET","/api/v1/books/",false).then(response => response.json())
    
}
class Library extends Component {
  constructor(props) {
    super(props)

    // Bind the this context to the handler function
    this.handler = this.handler.bind(this);

    // Set some state
    this.state = {
      messageShown: "false"
    };
    
  }
 
  handler() {
    console.log("handler called")
    this.setState({
      messageShown: "true"
    });
    this.props.fetchBooks()
      .then(allBooks =>{
        this.allBooks = allBooks;
        this.setState(() => ({
          allBooks
        }))
        //this.setState({allBooks});
        console.log(allBooks.objects);// eslint-disable-line no-console
        console.log("handling--------");
      })
  }
  
	// state = { }
  static defaultProps = {fetchBooks}
  componentDidMount() {
	  console.log("Mounting");// eslint-disable-line no-console
    this.props.fetchBooks()
      .then(allBooks =>{
        this.allBooks = allBooks;
        this.setState(() => ({
          allBooks
        }))
        //this.setState({allBooks});
        console.log(allBooks.objects);// eslint-disable-line no-console
      })
  }
 
  

  render() {
    if((localStorage.getItem("role")==="admin") && (localStorage.getItem("isauthenticated") === "true")){
      return (
        <div>
          <p>{this.state.messageShown}</p>
          <ManageBook book={this.state.allBooks} fetchbooks={this.props.fetchBooks} handler={this.handler}/>
          <div className="pagination">
            <a href="#">❮</a>
            <a href="#">❯</a>
          </div>
        </div>
      );
    }
    else{
      return (
        <div>
          <FeaturedBook book={this.state.allBooks}/>
          <div className="pagination">
            <a href="#">❮</a>
            <a href="#">❯</a>
          </div>
        </div>
      );
    }
    
  }
}

export default Library;
