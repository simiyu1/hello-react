import React from 'react';
import {BorrowedBook} from '../book';
// import './featured.css';
import '../w3c.css';
import './usercss.css';
import User from './user';

const TableUser = (props) => {
    localStorage.setItem("CurrentAction", "fetch")
    if (props.users) return (
        <div className="book-wrap">
            <div className="row featuredHouse">
                <h3 className="col-md-12 text-center">
                    All users
                </h3>
            </div>
            <div className="userholder">
                <div >
                <table className="user-table">
                    <thead>
                    <tr>
                        <th className="user-th" >name</th>
                        <th className="user-th" >role</th>
                        <th className="user-th" >status</th>
                        <th className="user-th" >ID</th>
                        <th className="user-th" ></th>
                    </tr></thead>
                    {props.users.objects.map((object, i) => <User user={object} key={i} />)}
                </table>
                </div>
            </div>
        </div>
    )
    return (<div>Your user list seems empty</div>);
}
 
export default TableUser;