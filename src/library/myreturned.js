import React, { Component } from "react";
import TableReturned from "./table-returned";
import send from "../Helper";
import "./library.css";
import swal from "sweetalert";

export const fetchBooks = () => {
  return send({},"GET", "/api/v1/users/mybooks/?theaction=True", true).then(response => response.json())
    
}
class MyReturned extends Component {
	state = {
	  error_message: "",
	  this_action: "borrowed",
	  message: "not set"
	}
  static defaultProps = {fetchBooks}

  componentDidMount() {
    this.props.fetchBooks()
      .then(returnedBooks =>{
        this.returnedBooks = returnedBooks;
        this.setState({returnedBooks})
        this.setState(() => ({
          returnedBooks
        }))
      //this.setState({allBooks});
      })
  }
  // var url = new URL('https://sl.se')
  // var params = {lat:35.696233, long:139.570431} // or:
  // var params = [['lat', '35.696233'], ['long', '139.570431']]
  // url.search = new URLSearchParams(params)
  //fetch(url)

  render() {
    if (this.state.message == "Book not found"){
      swal("You have not returned any book:)")
      return(<div className="empty"> No activity here</div>);
    }
    return (
      <div className="table-returned">
        <TableReturned book={this.state.returnedBooks}/>
      </div>
    );
  }
}

export default MyReturned;
