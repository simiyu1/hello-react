import React from "react";
import {HistoryBook} from "../book";
import "./featured.css";
import "../w3c.css";

const TableHistory = (props) => {
  localStorage.setItem("CurrentAction", "borrowed")
  if (props.book) return (
    <div className="book-wrap">
      <div className="row featuredHouse">
        <h3 className="col-md-12 text-center">
                    Full history
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
                <th>status</th>
              </tr></thead>
            {props.book.objects.map((object, i) => <HistoryBook book={object} key={i} />)}
          </table>
        </div>
      </div>
    </div>
  )
  return (<div className="fails">You have no activity yet</div>);
}
 
export default TableHistory;