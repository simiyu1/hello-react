import React, { Component } from 'react';
import "./book.css";
import logo from '../booklogo.png';

class book extends Component {
    state = {  }
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
                <td><div className="thisBookActions">
                        <h3>Availability</h3>
                        <h3>View Details</h3>
                        <button>Borrow</button>
                    </div>
                </td>   
            </tr></tbody>)
    }
}
 
export default book;