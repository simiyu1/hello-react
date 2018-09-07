import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../usercss.css';

class User extends Component {
    
    render() {
        const user = this.props.user;
        
        return (
            <tbody><tr>
                {console.log(">>>", user)}
                <td  className="user-th" >{user.username}</td>
                <td  className="user-th" >{user.Role}</td>
                <td className="price">{user.email}</td>
                <td  className="user-th" >{user.id}</td>
                <td  className="user-th" ><div className="thisBookActions">
                        <button><Link to={`/borrow/${user.id}`}>Activate</Link></button>
                        <button><Link to={`/borrow/${user.id}`}>Delete</Link></button>
                        <button><Link to={`/borrow/${user.id}`}>Deactivate</Link></button>
                    </div>
                </td>   
            </tr></tbody>)
    }
}
 
export default User;