import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../usercss.css';

class ManBook extends Component {
    
    render() {
        const book = this.props.book;
        
        return (
            <tbody><tr>
                {console.log(">>>", book)}
                <td  className="user-th" >{book.title}</td>
                <td  className="user-th" >{book.Copies}</td>
                <td className="price">{book.author}</td>
                <td  className="user-th" >{book.book_id}</td>
                <td  className="user-th" ><div className="thisBookActions">
                        <button><Link to={`/edit-book/${book.book_id}`}>Edit</Link></button>
                        <button><Link to={`/borrow/${book.book_id}`}>Delete</Link></button>
                    </div>
                </td>   
            </tr></tbody>)
    }
}
 
export default ManBook;