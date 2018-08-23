import React from 'react';
import Book from '../book';

const FeaturedBook = (props) => {
    if (props.book) return (
        <div>
            <div className="row featuredHouse">
                <h3 className="col-md-12 text-center">
                    Featured Books
                </h3>
            </div>
            {props.book.objects.map((object, i) => <Book book={object} key={i} />)}
        </div>
    )
    return (<div>No featured book at this time</div>);
}
 
export default FeaturedBook;