import React, { Component } from 'react';
import "./book.css";

class book extends Component {
    state = {  }
    render() {
        const book = this.props.book;
        
        return (
            <div>
            <div className="row mt-2">
            <h5 className="col-md-12">{book.title}</h5>
            </div>
            <div className="row">
            <h3 className="col-md-12">{book.copies}</h3>
            </div>
            <div className="row">
            <div className="col-md-7">
                <h3>Author is {book.author}</h3>
                {/* <img src={`https://images.pexels.com/photos/${book.photo}/pexels-photo-${book.photo}.jpeg?w=600&h=400&auto=compress&cs=tinysrgb`} alt="book" /> */}
            </div>
            <div className="col-md-5">
                <p className="price">${book.ISBN}</p>
                <p>{book.title}</p>
                
            </div>
            </div>
            <div>
            
            </div>      
        </div>
        
          )
    }
}
 
export default book;