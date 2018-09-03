import React from 'react';
import {ReturnedBook} from '../book';
import './featured.css';
import '../w3c.css';

const TableReturned = (props) => {
    localStorage.setItem("CurrentAction", "returned")
    console.log(props.book)
    console.log("Return>>>", props.book, "<<<<<<<<")
    if (props.book) return (
        
        <div className="book-wrap">
            <div className="row featuredHouse">
                <h3 className="col-md-12 text-center">
                    Returned Books
                </h3>
            </div>
            <div className="bookholder">
                <div >
                <table className="booktable w3-card-4 w3-table-all">
                    <thead>
                    <tr>
                        <th>Book</th>
                        <th>Title</th>
                        <th>Copies</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>ID</th>
                        <th></th>
                    </tr></thead>
                    {props.book.objects.map((object, i) => <ReturnedBook book={object} key={i} />)}
                </table>
                </div>
            </div>
        </div>
    )
    return (<div>You have no activity yet</div>);
}
 
export default TableReturned;