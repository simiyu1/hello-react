import React, { Component } from 'react';
import TableHistory from './table-history';
import send from '../Helper';

import './library.css';


class MyHistory extends Component {
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
    send({},'GET', '/api/v1/users/mybooks/?history=True', true)
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
        <TableHistory book={this.state.allBooks}/>
        </div>
    );
  }
}

export default MyHistory;
