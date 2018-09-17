import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import send, {saveStateToLocalStorage, hydrateStateWithLocalStorage} from "../../Helper";
import "../../library/library.css";
import "./editbook.css";
import {fetchBooks} from "../../library/index";

import swal from "sweetalert";

class EditBook extends Component {
    
  constructor () {
    super();
    this.state = {
      ISBN: "",
      author: "",
      title: "",
      copies: "",
      mytitle: "unset"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    console.log("The value<<>>>",this.state.author)
  }

	  handleSubmit = (e) => {
	    const book_id = localStorage.getItem("selected_book_id")
	    e.preventDefault()
	    let bookdata = {
	      "ISBN":this.state.ISBN,
	      "author":this.state.author,
	      "title":this.state.title,
	      "copies":this.state.copies
	    }
	    console.log("Submiting update<<>>>",book_id)
	    console.log("Submiting update<<>>>",book_id)
	    this.setState({showAlert:false})
	    send(bookdata,"PUT", "/api/v1/books/"+book_id, true)
	      .then(response => response.json())
	      .catch(err => console.log("Error",err ))
	      .then(data => {
	        console.log("After edit<<<<<<<<<:",data)
	        saveStateToLocalStorage(data)
	        this.setState({
	          showAlert: !this.state.showAlert,
	          error_message: data.message
          })
          this.now.fetchBooks()
              
	      })
	      .then(saveStateToLocalStorage(this.state))
	      .then(this.props.history.push({pathname:"/"}))

	  }

	  componentDidMount(){
	    this.state ? hydrateStateWithLocalStorage() : this.state = {
	      book_details: {ISBN: "",  title: "", author: "kk", copies: ""},
	      showAlert: false,
	      error_message: "",
	      headerRequired: true
	    };
	    console.log("Mounting");
	    console.log(this.book_request)
	    //Fetch the single book to be editied
	    this.fetchSelectedBook();
	  }
    
      fetchSelectedBook = () => {
        console.log("fetch book to edit-------", localStorage.getItem("selected_book_id"))
        fetch("http://127.0.0.1:5000/api/v1/books/"+localStorage.getItem("selected_book_id"))
          .then(response => response.json())
          .then(thisBooks =>{
            console.log("====>", thisBooks)
            //   this.thisBooks = thisBooks;
            this.setState(() => ({
              ISBN: thisBooks.ISBN,
              title: thisBooks.title,
              author: thisBooks.author,
              copies: thisBooks.Copies
            }));
            saveStateToLocalStorage(thisBooks)
          })
      }
      confirmDeleteBook= () => (
        swal("You are about to logout", {
          buttons: {
            confirmLogout: {
              text: "Logout",
              value: "logout",
            },
            Cancel: true,
          },
        })
          .then((value) => {
            switch (value) {
         
              case "Cancel":
                swal("Logout cancelled!");
                break;
         
              case "logout":
                this.deleteBook();
                swal("Logged Out!", "see you soon", "success");
                break;
         
              default:
                swal("cancelled");
            }
          })
      )
      
      
      
      deleteBook = () => {
        //e.preventDefault()
        send({},"POST", "/api/v1/auth/logout", true)
          .then(response => response.json())
          .catch(err => console.log("Error",err ))
          .then(data => {
            console.log("Props History>>>>>>",this.props)
            saveStateToLocalStorage(data)
            localStorage.setItem("isauthenticated", false)
          })
          .then(saveStateToLocalStorage(this.state)
          ).then(<Redirect to="/" />)
       
      }
    

      render() {
        //   console.log(this.state.thisBooks)
        if (this.props.match.params){
        //const book = this.props.selected_book
          const {id} = this.props.match.params
          localStorage.setItem("selected_book_id", id);
          console.log("in Edditttttttttttttt")
          return (
            <div className="single-book-wrap">

              <div className="edit-book-html">
                    
                <form className="edit-book" onSubmit={this.handleSubmit}>
                  <div className="row">
                    {/* <div className="column" >
                      <h2>Current</h2>
                      <label >ISBN</label>
                      <input type="text" id="fname" name="fname" value={this.state.ISBN} disabled/>
                      <label >Author</label>
                      <input type="text" id="lname" name="lname" value={this.state.author} disabled/>
                      <label >Title</label>
                      <input type="text" id="fname" name="fname" value={this.state.title} disabled/>
                      <label >Copies</label>
                      <input type="text" id="lname" name="lname" value={this.state.copies} disabled/>
                    </div> */}
                    <div className="column" >
                      <h2>Edit</h2>
                      <label >ISBN</label>
                      <input type="text" id="ISBN" name="ISBN" onChange={this.handleChange} value={this.state.ISBN}/>
                      <label >Author</label>
                      <input type="text" id="author" name="author" onChange={this.handleChange} value={this.state.author}/>
                      <label >Title</label>
                      <input type="text" id="title" name="title" onChange={this.handleChange} value={this.state.title}/>
                      <label >Copies</label>
                      <input type="text" id="copies" name="copies" onChange={this.handleChange} value={this.state.copies}/>
                      <label><input type="submit" className="btn btn-default" value="Save"/></label>    
                    </div>
            
                  </div>
                  
                </form>
              </div>
            </div>  
          );}
        return (<div className="fails">Issue with your selection</div>);

      }
}

export default EditBook;
