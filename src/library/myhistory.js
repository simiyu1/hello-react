import React, { Component } from "react";
import TableHistory from "./table-history";
import send from "../Helper";
import swal from "sweetalert";

import "./library.css";

export const fetchBooks = () => {
  return send({},"GET", "/api/v1/users/mybooks/?theaction=true&history=true", true).then(response => response.json())
    
}

class MyHistory extends Component {
	state = {
	  error_message: "",
	  this_action: "borrowed",
	  message: "not set"
	}
  static defaultProps = {fetchBooks}

  componentDidMount() {
    this.props.fetchBooks()
      .then(allBooks =>{
        this.allBooks = allBooks;
        this.setState({allBooks})
        this.setState(() => ({
          allBooks
        }))
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
      <div className="myHistory">
        <TableHistory book={this.state.allBooks}/>
      </div>
    );
  }
}

export default MyHistory;
