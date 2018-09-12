import React, { Component } from "react";
import send, {saveStateToLocalStorage} from "../Helper";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";


class Logout extends Component {
  componentDidMount(){
    this.confirmLogout();
  }
    confirmLogout= () => (
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
              this.handleLogout();
              swal("Logged Out!", "see you soon", "success");
              break;
         
            default:
              swal("cancelled");
          }
        })
    )
      
      

     handleLogout = () => {
       send({},"POST", "/api/v1/auth/logout", true)
         .then(response => response.json())
         .catch(err => console.log("Error",err ))// eslint-disable-line no-console
         .then(data => {
           saveStateToLocalStorage(data)
           // localStorage.setItem("isauthenticated", false);
           // localStorage.setItem("role", normal);
           localStorage.clear();
           this.props.history.push("/")
           swal("Logged out Successfully", {buttons: false, timer:1000})
         })
         .then(saveStateToLocalStorage(this.state)
              
         );
       return(<Redirect to="/library"/>)
           
     }
     render() {
       return (
         <div className="logout">
           <Redirect to="/"/> 
         </div>)
        
        
     }
    
}
 
export default Logout;