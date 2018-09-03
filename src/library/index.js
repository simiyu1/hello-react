import React, { Component } from 'react';
import FeaturedBook from './featured-book';
import './library.css';


class Library extends Component {
	state = { }

  componentDidMount() {
    console.log("Mounting");
    this.fetchBooks();
  }

  fetchBooks = () => {
    fetch('http://127.0.0.1:5000/api/v1/books/')
    .then(response => response.json())
    .then(allBooks =>{
      this.allBooks = allBooks;
      this.setState(() => ({
        allBooks
      }))
      //this.setState({allBooks});
      console.log(allBooks.objects);
    })
  }

  render() {
    return (
        <div>
        <FeaturedBook book={this.state.allBooks}/>
        </div>
    );
  }
}

export default Library;
