import React, { Component } from 'react';
import "./book.css";
import logo from '../booklogo.png';
import {Link} from 'react-router-dom';

class book extends Component {
    
    render() {
        const book = this.props.book;
        let borrowButton;
        if (localStorage.getItem("isauthenticated") === "true") {
            borrowButton = <Link to={`/borrow/${book.book_id}`}><button>Borrow</button></Link>;
          } else {
            borrowButton = <Link to={`/borrow/${book.book_id}`}><button>Login to Borrow</button></Link>
          }
        
        return (
            <tbody><tr>
                {console.log(">>>", book)}
                <td>{book.title}</td>
                <td>{book.Copies}</td>
                <td>{book.author}</td>
                {/* <img src={`https://images.pexels.com/photos/${book.photo}/pexels-photo-${book.photo}.jpeg?w=600&h=400&auto=compress&cs=tinysrgb`} alt="book" /> */}
                <td className="price">{book.ISBN}</td>
                <td>{book.book_id}</td>
                <td><div className="thisBookActions">
                        {borrowButton}
                    </div>
                </td>   
            </tr></tbody>)
    }
}

class BorrowedBook extends Component {
    
    render() {
        const book = this.props.book;
        
        return (
            <tbody><tr>
                <td>{book.title}</td>
                <td>{book.author}</td>
                {/* <img src={`https://images.pexels.com/photos/${book.photo}/pexels-photo-${book.photo}.jpeg?w=600&h=400&auto=compress&cs=tinysrgb`} alt="book" /> */}
                <td className="price">{book.isbn}</td>
                <td>{book.book_id}</td>
                <td><div className="thisBookActions">
                        <button><Link to={`/return/${book.book_id}`}>Return</Link></button>
                    </div>
                </td>   
            </tr></tbody>)
    }
}

class ReturnedBook extends Component {
    
    render() {
        const book = this.props.book;
        
        return (
            <tbody><tr>
                <td>{book.title}</td>
                <td>{book.author}</td>
                {/* <img src={`https://images.pexels.com/photos/${book.photo}/pexels-photo-${book.photo}.jpeg?w=600&h=400&auto=compress&cs=tinysrgb`} alt="book" /> */}
                <td className="price">${book.isbn}</td>
                <td>{book.book_id}</td>
                <td><div className="thisBookActions">
                        {/* <button><Link to={`/borrow/${book.book_id}`}>Return</Link></button> */}
                    </div>
                </td>   
            </tr></tbody>)
    }
}

class HistoryBook extends Component {
    
    render() {
        const book = this.props.book;
        
        return (
            <tbody><tr>
                <td>{book.title}</td>
                <td>{book.author}</td>
                {/* <img src={`https://images.pexels.com/photos/${book.photo}/pexels-photo-${book.photo}.jpeg?w=600&h=400&auto=compress&cs=tinysrgb`} alt="book" /> */}
                <td className="price">${book.isbn}</td>
                <td>{book.book_id}</td>
                <td><div className="thisBookActions">
                        {/* <button><Link to={`/borrow/${book.book_id}`}>Return</Link></button> */}
                        {book.status ?
                        <p>returned</p> :
                        <p>pending</p>}
                    </div>
                </td>   
            </tr></tbody>)
    }
}
 
export {HistoryBook};
 
export {ReturnedBook};
 
export {BorrowedBook};
 
export default book;