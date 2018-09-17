import React from "react";
import { shallow, configure, mount} from "enzyme";
import App, { AuthDiv, AuthAdminDiv } from "../index";
import Header, {UserHeader, AdminPanel, AdminHeader} from "../../header";
import {expect} from "chai";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import About from "../about";
import Reach from "../reach";

configure({ adapter: new Adapter() });

// const state = { };
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
localStorageMock.setItem("isauthenticated","true")
localStorageMock.setItem("role","normal")

describe("App", ()=>{
  it("returns userheader slider", () => {
    localStorageMock.setItem("isauthenticated","true")
    localStorageMock.setItem("role","normal")
    const wrapper = shallow(<App/>);
    expect(wrapper.find(".slidebar")).to.have.lengthOf(1)
  });

  // it("loads contents in user header", () => {
  //   localStorageMock.setItem("isauthenticated","true")
  //   localStorageMock.setItem("role","normal")
  //   const wrapper = shallow(<MemoryRouter ><AuthDiv><UserHeader/></AuthDiv></MemoryRouter>);
  //   expect(wrapper.find(".userheader")).to.have.lengthOf(1)
  // });

  it("shows header", () => {
    localStorageMock.setItem("isauthenticated","false")
    localStorageMock.setItem("role","normal")
    const wrapper = mount(<MemoryRouter initialEntries={[ "/random" ]}><AuthDiv><Header/></AuthDiv></MemoryRouter>);
    expect(wrapper.find(".myheader")).to.have.lengthOf(1)
  });
  // it("shows Admin Panel", () => {
  //   localStorageMock.setItem("isauthenticated","true")
  //   localStorageMock.setItem("role","admin")
  //   const wrapper = mount(<MemoryRouter initialEntries={[ "/random" ]}><AuthDiv/></MemoryRouter>);
  //   expect(wrapper.find(".adminheader")).to.have.lengthOf(1)
  // });

  it("shows About us", () => {
    localStorageMock.setItem("isauthenticated","false")
    localStorageMock.setItem("role","normal")
    const wrapper = mount(<MemoryRouter initialEntries={[ "/random" ]}><About/></MemoryRouter>);
    expect(wrapper.find(".box-wrap")).to.have.lengthOf(1)
  });

  it("shows reach us", () => {
    localStorageMock.setItem("isauthenticated","false")
    localStorageMock.setItem("role","normal")
    const wrapper = mount(<MemoryRouter initialEntries={[ "/random" ]}><Reach/></MemoryRouter>);
    expect(wrapper.find(".box-wrap")).to.have.lengthOf(1)
  });
});
