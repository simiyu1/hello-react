import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import send, {saveStateToLocalStorage} from '../../Helper';
import swal from 'sweetalert';


class DeleteBook extends Component {
    constructor () {
        super();
        this.state = {
          book_to_delete: ''
        };
      }
    componentDidMount(){
        const {id} = this.props.match.params
        this.setState({book_to_delete:id})
        localStorage.setItem("delete_book_id", id);
        console.log("Mounting Delete",id)
        this.confirmDelete();
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
         send({},'DELETE', '/api/v1/books/'+localStorage.getItem("delete_book_id"), true)
            .then(response => response.json())
            .catch(err => console.log("Error",err ))
            .then(data => {
                console.log("PDeleted>>>>>>",data,"<<<<<<<:",this.state.book_to_delete)
                saveStateToLocalStorage(data)
                this.props.history.push('manage-library')
                })
              .then(saveStateToLocalStorage(this.state)
              
            );
            
           
        }
    render() {
        if (this.props.match.params){
            //const book = this.props.selected_book
            const {id} = this.props.match.params
            this.setState({book_to_delete:id})
            console.log("State delete>>>>>",this.state.book_to_delete)
            
            console.log("to delete-------", localStorage.getItem("delete_book_id"))

            return (
                <div>
                <Redirect to="/manage-library"/> 
                </div>);
        }
        return (<div className="fails">Issue with your selection</div>);
        
        
    }
    
}
 
export default DeleteBook;