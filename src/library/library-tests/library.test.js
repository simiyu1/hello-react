import React from "react";
// import { MemoryRouter } from "react-router";
import { mount, shallow, configure} from "enzyme";
import {expect} from "chai";
import Adapter from "enzyme-adapter-react-16";
import FeaturedBook from "../featured-book";
import HistoryTable from "../table-history";
import TableBorrowed from "../table-borrowed";
import TableReturned from "../table-returned";
import Book from "../../book/index";

configure({ adapter: new Adapter() });

const defaultProps = {
  "testbooks":  {objects: [
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
    }]}
};
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

describe("Library featured book displays book wrap when props recieved", ()=>{
  it("renders book-wrap", () => {
    const wrapper = shallow(<FeaturedBook book={defaultProps["testbooks"]}><Book></Book></FeaturedBook>)
    expect(wrapper.find(".book-wrap")).to.have.lengthOf(1)
  });

  it("renders fails with no props", () => {
    const wrapper = shallow(<FeaturedBook/>)
    expect(wrapper.find(".Fails")).to.have.lengthOf(1)
  });

  it("history renders book-wrap", () => {
    const wrapper = mount(<HistoryTable book={defaultProps["testbooks"]}/>)
    expect(wrapper.find(".book-wrap")).to.have.lengthOf(1)
  });

  it("history render fails with no props", () => {
    const wrapper = shallow(<HistoryTable/>)
    expect(wrapper.find(".fails")).to.have.lengthOf(1)
  });

  it("borrow renders book-wrap", () => {
    const wrapper = shallow(<TableBorrowed book={defaultProps["testbooks"]}/>)
    expect(wrapper.find(".book-wrap")).to.have.lengthOf(1)
  });

  it("borrow render fails with no props", () => {
    const wrapper = shallow(<TableBorrowed/>)
    expect(wrapper.find(".fails")).to.have.lengthOf(1)
  });

  it("return renders book-wrap", () => {
    const wrapper = shallow(<TableReturned book={defaultProps["testbooks"]}/>)
    expect(wrapper.find(".book-wrap")).to.have.lengthOf(1)
  });

  it("return render fails with no props", () => {
    const wrapper = shallow(<TableReturned/>)
    expect(wrapper.find(".fails")).to.have.lengthOf(1)
  });
});