import React from "react";
import {BorrowedBook} from "../book";
import "./featured.css";
import "../w3c.css";

const TableBorrowed = (props) => {
  localStorage.setItem("CurrentAction", "borrowed")
  if (props.book) return (
    <div className="book-wrap">
      <div className="row featuredHouse">
        <h3 className="col-md-12 text-center">
                    Borrowed Books
        </h3>
      </div>
      <div className="bookholder">
        <div >
          <table className="booktable w3-card-4 w3-table-all">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>ID</th>
                <th></th>
              </tr></thead>
            {props.book.objects.map((object, i) => <BorrowedBook book={object} key={i} />)}
          </table>
        </div>
      </div>
    </div>
  )
  return (<div className="fails">You have no activity yet</div>);
}
 
export default TableBorrowed;