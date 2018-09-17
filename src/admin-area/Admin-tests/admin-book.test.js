import React from "react";
import { shallow, mount, configure} from "enzyme";
import ManageBook from "../manage-book";
import Adapter from "enzyme-adapter-react-16";
import {expect} from "chai";
import {Router} from "react-router-dom";
import { MemoryRouter } from "react-router";
import AddBook from "../single-book/add-book";
import DeleteBook from "../single-book/delete-book";
import EditBook from "../single-book/edit-book";

configure({ adapter: new Adapter() });
jest.mock("react-router-dom");

const handlerf = {
  handler() {
    console.log("handler called")
    this.setState({
      messageShown: "true"
    });
    this.props.fetchBooks()
      .then(allBooks =>{
        this.allBooks = allBooks;
        this.setState(() => ({
          allBooks
        }))
        //this.setState({allBooks});
        console.log(allBooks.objects);// eslint-disable-line no-console
        console.log("handling--------");
      })
  }
}
const defaultProps = {
  objects: [
    {
      "book_id": 1,
      "author": "Che Guevara",
      "title": "Aluta Continua",
      "Copies": "13"
    },
    {
      "book_id": 2,
      "author": "Geoffrey Chaucer",
      "title": "The Cantebury Tales",
      "Copies": "11"
    }]
};
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
localStorageMock.setItem("isauthenticated","true");

describe("A single row of book details is displayed when props recieved", ()=>{
  it("renders the Book", () => {
    const wrapper = mount(<MemoryRouter><ManageBook book={defaultProps} handler={handlerf}/></MemoryRouter>)
    expect(wrapper.find(".book-wrap")).to.have.lengthOf(1)
  });

  it("renders fail class when no props are passed", () => {
    const wrapper = mount(<ManageBook/>)
    expect(wrapper.find(".fails")).to.have.lengthOf(1)
  });

  it("renders add book", () => {
    const wrapper = mount(<AddBook/>)
    expect(wrapper.find(".single-book-wrap")).to.have.lengthOf(1)
  });

  it("renders delete book", () => {
    const thismatch = { params: { id: 1 } }
    const wrapper = shallow(
      <DeleteBook 
        match={thismatch} />
    );
    expect(wrapper.find(".manage-library")).to.have.lengthOf(1)
  });

  

});
