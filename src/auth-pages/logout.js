import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import send, {saveStateToLocalStorage} from '../Helper';
import swal from 'sweetalert';


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
            send({},'POST', '/api/v1/auth/logout', true)
            .then(response => response.json())
            .catch(err => console.log("Error",err ))
            .then(data => {
                console.log("Props History>>>>>>",this.props)
                saveStateToLocalStorage(data)
                // localStorage.setItem("isauthenticated", false);
                // localStorage.setItem("role", normal);
                localStorage.clear();
                this.props.history.push('/')
                swal("Logged out Successfully", {buttons: false, timer:1000})
                })
              .then(saveStateToLocalStorage(this.state)
              
            );
            return(<Redirect to="/library"/>)
           
        }
    render() {
        return (
            <div>
            <Redirect to="/"/> 
            </div>)
        
        
    }
    
}
 
export default Logout;