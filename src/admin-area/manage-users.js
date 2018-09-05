import React, { Component } from 'react';
import TableUser from './table-users';
// import './library.css';
import send from '../Helper';


class ManageUsers extends Component {
	state = {
		error_message: "",
        this_action: "borrowed",
        holdUsers:""
	  }

  componentDidMount() {
    console.log("Mounting");
    this.fetchAllUsers();
  }
    fetchAllUsers = () => {
        console.log("fetching users-------")
        send({},'GET', '/api/v1/users/', true)
        .then(response => response.json())
        .then(allUsers =>{
          this.allUsers = allUsers;
          this.setState(() => ({
            allUsers
          }))
        //   saveStateToLocalStorage(allUsers.objects)
          console.log(allUsers.objects);
        })
      }

  render() {
    return (
        <div>
        <TableUser users={this.state.allUsers}/>
        </div>
    );
  }
}

export default ManageUsers;
