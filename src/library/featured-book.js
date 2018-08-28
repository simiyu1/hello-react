import React from 'react';
import Book from '../book';
import './featured.css';
import '../w3c.css';

const FeaturedBook = (props) => {
    if (props.book) return (
        <div>
            <div className="row featuredHouse">
                <h3 className="col-md-12 text-center">
                    Featured Books
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
                        <th></th>
                    </tr></thead>
                    {props.book.objects.map((object, i) => <Book book={object} key={i} />)}
                </table>
                </div>
            </div>
        </div>
    )
    return (<div>No featured book at this time</div>);
}
 
export default FeaturedBook;