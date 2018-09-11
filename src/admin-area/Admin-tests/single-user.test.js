import React from "react";
import { mount, configure} from "enzyme";
import User from "../single-user";
import Adapter from "enzyme-adapter-react-16";
import {expect} from "chai";
import {Router} from "react-router-dom";

configure({ adapter: new Adapter() });
jest.mock("react-router-dom");

const defaultProps = {
  "id": 2,
  "username": "New Juma",
  "email": "newjuma@gmail.com",
  "Role": "normal",
  "logged_in": true
};
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
localStorageMock.setItem("isauthenticated","true");

describe("A single row of userdetails is displayed when props recieved", ()=>{
  it("renders the user", () => {
    const wrapper = mount(<User user={defaultProps}/>)
    expect(wrapper.find(".user-th")).to.have.lengthOf(3)
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