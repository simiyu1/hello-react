import React, { Component } from "react";
import {Link} from "react-router-dom";
import "../usercss.css";
import send, {saveStateToLocalStorage} from "../../Helper";
import swal from "sweetalert";

class ManBook extends Component {
  // state ={funct: this.props.fetchbooks}
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

	  handleEditSubmit = (e) => {
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
	    send(bookdata,"PUT", "/api/v1/books/"+this.props.book.book_id, true)
	      .then(response => response.json())
	      .catch(err => console.log("Error",err ))
	      .then(data => {
	        console.log("After edit<<<<<<<<<:",data)
          saveStateToLocalStorage(data)
          swal(data.message)
          this.props.handler()
	        this.setState({
	          showAlert: !this.state.showAlert,
	          error_message: data.message
	        })
              
	      })
        .then(saveStateToLocalStorage(this.state))

	  }
  
  confirmDelete= () => (
    
    swal("You are about to Delete ", {
      buttons: {
        confirmLogout: {
          text: "Delete",
          value: "delete",
        },
        Cancel: true,
      },
    })
      .then((value) => {
        switch (value) {
       
          case "Cancel":
            swal("Delete cancelled!");
            break;
       
          case "delete":
            this.handleDelete();
            swal("Delete success");
            break;
       
          default:
            swal("cancelled");
        }
      })
  )
    
    

   handleDelete = () => {
     send({},"DELETE", "/api/v1/books/"+this.props.book.book_id, true)
       .then(response => response.json())
       .catch(err => console.log("Error",err ))// eslint-disable-line no-console
       .then(data => {
         saveStateToLocalStorage(data)
         if(data.message === "Books retrieved"){
           swal("Book deleted successfully")
           this.props.handler()
         }
         else{
           swal(data.message)
         }
         
       })
       .then(saveStateToLocalStorage(this.state)
            
       ); 
   }
  
    
   render() {
     const book = this.props.book;
     const myfunct = this.props.fetchbooks;
     const nowaction = this.props.handler;

     console.log('book id', this.props.book.book_id)
        
     return (
       <tbody><tr>
         {console.log(">>>", book)}
         <td  className="user-th" >{book.title}</td>
         <td  className="user-th" >{book.Copies}</td>
         <td className="price">{book.author}</td>
         <td  className="user-th" >{book.book_id}</td>
         <td  className="user-th" ><div className="thisBookActions">
           {/* <button type="button"data-toggle="modal" className="btn btn-info"><Link to={{pathname:`/edit-book/${book.book_id}`, now:{myfunct}}}>Edit</Link></button> */}
           <button type="button" data-toggle="modal" className="btn btn-info" data-target={`#myModal${book.book_id}`}>Edit</button>
           <button type="button" data-toggle="modal" className="btn btn-info" onClick={this.confirmDelete} >Delete</button>
         </div>
         </td>   
       </tr>
       
       <div className="modal fade" id={`myModal${this.props.book.book_id}`} role="dialog">
         <div className="modal-dialog ">
           <div className="modal-content">
             <div className="modal-header">
               <button type="button" className="close" data-dismiss="modal">&times;</button>
               <h4 className="modal-title">Editing {book.title}</h4>
             </div>
             <div className="modal-body">
             
      
               <form  onSubmit={this.handleEditSubmit}>
                 <div className="row">
                   <div className="column" >
                     <h2>Edit</h2>
                     <label >ISBN</label>
                     <input type="number" id="ISBN" name="ISBN" onChange={this.handleChange} defaultValue={book.ISBN}/>
                     <label >Author</label>
                     <input type="text" id="author" name="author" onChange={this.handleChange} defaultValue={book.author}/>
                     <label >Title</label>
                     <input type="text" id="title" name="title" onChange={this.handleChange} defaultValue={book.title}/>
                     <label >Copies</label>
                     <input type="number" id="copies" name="copies" onChange={this.handleChange} defaultValue={book.Copies}/>
                     <label><input type="submit" className="button"  onClick={this.handleEditSubmit} data-dismiss="modal" value="Save" /></label>   
                   </div>
                 </div>
                 
               </form>
 
             </div>
             <div className="modal-footer">
               <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
             </div>
           </div>
         </div>
       </div>
       
       </tbody>)
   }
}
 
export default ManBook;