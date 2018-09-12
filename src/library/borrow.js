import React, { Component } from "react";
import logo from "../booklogo.png";
import "./featured.css";
import "./library.css";
import "../w3c.css";
import {Link} from "react-router-dom";
import {saveStateToLocalStorage} from "../Helper";

export const fetchSelectedBook = () => {
    return fetch("http://127.0.0.1:5000/api/v1/books/"+localStorage.getItem("selected_book_id")).then(response => response.json())
      
  }
class BorrowBook extends Component {
    state = { selected_book_id: "",
      thisBooks:{
        title: "",
        ISBN: "",
        book_id:"",
        author:"",
        message: ""
      }
    }
    static defaultProps = {fetchSelectedBook}

    componentDidMount(){
      this.props.fetchSelectedBook()
      .then(thisBooks =>{
        this.thisBooks = thisBooks;
        this.setState(() => ({
          thisBooks
        }));
        saveStateToLocalStorage(thisBooks)
      })
    }    
    
     
  render() {
    if (this.props.match.params){
      //const book = this.props.selected_book
      const {id} = this.props.match.params
      localStorage.setItem("selected_book_id", id);
      return (
        <div className="single-book-wrap">
          <div className="book-html">
            <div className="row featuredHouse">
              <h3 className="col-md-12 text-center">
                            Featured Books
              </h3>
            </div>
            <div className="bookholder">
              <div >
                <table className="booktable w3-card-4 ">
                  <thead>
                    <tr>
                      <th>Book</th>
                      <th>Title</th>
                      <th>Copies</th>
                      <th>Author</th>
                      <th>ISBN</th>
                      <th></th>
                    </tr></thead>
                  <tbody><tr>
                    <td><img src={logo} alt="book cover"/>
                      {this.state.thisBooks.author}
                    </td>
                    <td><h2>Description:  </h2>
                      {this.state.thisBooks.title} Has been written by {this.state.thisBooks.author}. 
                      <h2>Synopsis: </h2> </td>
                    <td className="price">{this.state.thisBooks.ISBN}</td>
                    <td><div className="thisBookActions">
                      <h3>Availability</h3>
                      <h3>View Details</h3>
                      <button><Link to='/checkoutbook'>Borrow</Link></button>
                    </div>
                    </td>   
                  </tr></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
        
    }
    return (<div className="fails">Issue with your selection</div>);
  }
    
}
 
export default BorrowBook;