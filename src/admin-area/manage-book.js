import React from "react";
import ManBook from "./single-book";
import "../library/featured.css";
import "../w3c.css";

const ManageBook = (props) => {

  if (props.book && props.handler) return (
    <div className="book-wrap">
      <div className="row featuredHouse">
                
      </div>
      <div className="bookholder">
        <div >
          <table className="booktable w3-table-all">
            <thead>
              <tr>
                <th>Title</th>
                <th>Copies</th>
                <th>Author</th>
                <th>ID</th>
                <th></th>
              </tr></thead>
            {props.book.objects.map((object, i) => <ManBook handler={props.handler} fetchbooks={props.fetchbooks} book={object} key={i} />)}
          </table>
        </div>
      </div>
            
    </div>
  )
  return (<div className="fails">No featured book at this time</div>);
}
 
export default ManageBook;