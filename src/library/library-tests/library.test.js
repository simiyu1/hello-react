import React from "react";
import { shallow, configure} from "enzyme";
import {expect} from "chai";
import Adapter from "enzyme-adapter-react-16";
import FeaturedBook from "../featured-book";

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
    const wrapper = shallow(<FeaturedBook book={defaultProps["testbooks"]}/>)
    expect(wrapper.find(".book-wrap")).to.have.lengthOf(1)
  });

  it("renders fails with no props", () => {
    const wrapper = shallow(<FeaturedBook/>)
    expect(wrapper.find(".Fails")).to.have.lengthOf(1)
  });
});