import React from "react";
import { mount, configure} from "enzyme";
import Book from "../index";
import Adapter from "enzyme-adapter-react-16";
import {expect} from "chai";
import {MemoryRouter} from "react-router-dom";

configure({ adapter: new Adapter() });
jest.mock("react-router-dom");

const defaultProps = {
  "book_id": "1",
  "author": "Che Guevara",
  "title": "Aluta Continua",
  "Copies": "13",
  "ISBN":"667575-4--55"
};
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
localStorageMock.setItem("isauthenticated","true");

describe("A single row of book details is displayed when props recieved", ()=>{
  it("renders theBook", () => {
    const wrapper = mount(<Book book={defaultProps}/>)
    expect(wrapper.find(".singlebook")).to.have.lengthOf(1)
  });
});

// describe ("Single book",() =>  {
//   it("single book", ()=>{
//     const singlebook = {
//       "title":"title",
//       "author":"author",
//       "Copies":"Copies",
//       "book_id":"book_id",
//       "ISBN":"ISBN"
//     }
//     // const component = mount(<Book/>);
//     // expect(component.state().single.toEqual(singlebook))
//     const wrapper = shallow(<Book book={singlebook}/>)
//     expect(wrapper.find(".theBook")).to.have.lengthOf(0)
//   })
// })