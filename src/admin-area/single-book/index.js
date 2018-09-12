import React, { Component } from "react";
import {Link} from "react-router-dom";
import "../usercss.css";

class ManBook extends Component {
  state ={funct: this.props.fetchbooks}
    
  render() {
    const book = this.props.book;
    const myfunct = this.props.fetchbooks
        
    return (
      <tbody><tr>
        {console.log(">>>", book)}
        <td  className="user-th" >{book.title}</td>
        <td  className="user-th" >{book.Copies}</td>
        <td className="price">{book.author}</td>
        <td  className="user-th" >{book.book_id}</td>
        <td  className="user-th" ><div className="thisBookActions">
          <button><Link to={{pathname:`/edit-book/${book.book_id}`, state: {funct: myfunct}}}>Edit</Link></button>
          <button><Link to={`/delete/${book.book_id}`}>Delete</Link></button>
        </div>
        </td>   
      </tr></tbody>)
  }
}
 
export default ManBook;