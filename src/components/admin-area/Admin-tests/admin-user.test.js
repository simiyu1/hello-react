import React from "react";
// import { MemoryRouter } from "react-router";
import { mount, shallow, configure} from "enzyme";
import {expect} from "chai";
import Adapter from "enzyme-adapter-react-16";
import TableUser from "../table-users";

configure({ adapter: new Adapter() });

const defaultProps = {
  "testbooks":  {
    "page": 1,
    "total_results": 10,
    "total_pages": 1,
    "per_page": 10,
    "objects": [
      {
        "id": 2,
        "username": "New Juma",
        "email": "newjuma@gmail.com",
        "Role": "normal",
        "logged_in": true
      },
      {
        "id": 3,
        "username": "Boss Baby",
        "email": "boss@gmail.com",
        "Role": "admin",
        "logged_in": true
      },
      {
        "id": 4,
        "username": "mgeni",
        "email": "mgeni@yao.com",
        "Role": "normal",
        "logged_in": true
      }]}
};
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

describe("User list is displayed", ()=>{

  it("User table displayed", () => {
    const wrapper = shallow(<TableUser users={defaultProps["testbooks"]}/>)
    expect(wrapper.find(".book-wrap")).to.have.lengthOf(1)
  });
});