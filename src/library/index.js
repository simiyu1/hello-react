import React, { Component } from "react";
import FeaturedBook from "./featured-book";
import "./library.css";
import ManageBook from "../admin-area/manage-book";


class Library extends Component {
	state = { }

	componentDidMount() {
	  console.log("Mounting");// eslint-disable-line no-console
	  this.fetchBooks();
	}

  fetchBooks = () => {
    fetch("http://127.0.0.1:5000/api/v1/books/")
      .then(response => response.json())
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
          <ManageBook book={this.state.allBooks}/>
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
