import React, { Component } from 'react';
import TableBorrowed from './table-borrowed';
import './library.css';
import send from '../Helper';


class MyBooks extends Component {
	state = {
		error_message: "",
		this_action: "borrowed"
	  }

  componentDidMount() {
    console.log("Mounting");
    this.fetchBooks();
  }
    // var url = new URL('https://sl.se')
    // var params = {lat:35.696233, long:139.570431} // or:
    // var params = [['lat', '35.696233'], ['long', '139.570431']]
    // url.search = new URLSearchParams(params)
    //fetch(url)

  fetchBooks = () => {
    send({},'GET', '/api/v1/users/mybooks/', true)
    .then(response => response.json())
    .then(myBooks =>{
      this.myBooks = myBooks;
      this.setState(() => ({
        myBooks
      }))
      //this.setState({allBooks});
      console.log("My borrrrrowed",myBooks,"end of My borrrrowed");
    })
  }

  render() {
    return (
        <div>
        <TableBorrowed book={this.state.myBooks}/>
        </div>
    );
  }
}

export default MyBooks;
