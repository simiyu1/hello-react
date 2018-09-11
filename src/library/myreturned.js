import React, { Component } from 'react';
import TableReturned from './table-returned';
import send from '../Helper';
import './library.css';
import swal from 'sweetalert';


class MyReturned extends Component {
	state = {
		error_message: "",
    this_action: "borrowed",
    message: 'not set'
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
    send({},'GET', '/api/v1/users/mybooks/?theaction=True', true)
    .then(response => response.json())
    .then(returnedBooks =>{
      this.returnedBooks = returnedBooks;
      console.log(">>>>>>",returnedBooks.message)
      this.setState({returnedBooks})
      this.setState(() => ({
        returnedBooks
      }))
      //this.setState({allBooks});
      console.log(returnedBooks.objects);
    })
  }

  render() {
    if (this.state.message == "Book not found"){
      swal("You have not returned any book:)")
      return(<div className="empty"> No activity here</div>);
    }
    return (
        <div>
        <TableReturned book={this.state.returnedBooks}/>
        </div>
    );
  }
}

export default MyReturned;
