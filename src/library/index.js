import React, { Component } from "react";
import FeaturedBook from "./featured-book";
import "./library.css";
import ManageBook from "../admin-area/manage-book";
import Send from "../Helper";

export const fetchBooks = () => {
  return Send({},"GET","/api/v1/books/",false).then(response => response.json())
    
}
class Library extends Component {
	state = { }
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
          <ManageBook book={this.state.allBooks} fetchbooks={this.props.fetchBooks}/>
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
