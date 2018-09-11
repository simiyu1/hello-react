import React, { Component } from "react";
import "../usercss.css";

class User extends Component {
    
  render() {
    const user = this.props.user;
        
    return (
      <tbody><tr>
        {/* {console.log(">>>", user)} */}
        <td  className="user-th" >{user.username}</td>
        <td  className="user-th" >{user.Role}</td>
        {user.logged_in ? <td className="price">Logged in</td>:
          <td className="">Logged out</td>}
        <td  className="user-th" >{user.id}</td>
      </tr></tbody>)
  }
}
 
export default User;