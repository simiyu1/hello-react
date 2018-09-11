import React, { Component } from "react";
import "./book.css";
import logo from "../booklogo.png";

class ReturnedBook extends Component {
    
  render() {
    const book = this.props.book;
        
    return (
      <tbody><tr>
        <td><img src={logo} alt="book cover"/></td>
        <td>{book.title}</td>
        <td>{book.Copies}</td>
        <td>{book.author}</td>
        {/* <img src={`https://images.pexels.com/photos/${book.photo}/pexels-photo-${book.photo}.jpeg?w=600&h=400&auto=compress&cs=tinysrgb`} alt="book" /> */}
        <td className="price">${book.ISBN}</td>
        <td>{book.book_id}</td>
        <td><div className="thisBookActions">
          {/* <button><Link to={`/borrow/${book.book_id}`}>Return</Link></button> */}
        </div>
        </td>   
      </tr></tbody>)
  }
}
 
export default ReturnedBook;