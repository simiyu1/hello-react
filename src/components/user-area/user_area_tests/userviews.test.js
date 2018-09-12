import React from "react";
import { shallow, configure, mount} from "enzyme";
import App, { AuthDiv, AuthAdminDiv } from "../index";
import Header, {UserHeader, AdminPanel} from "../../header";
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
  it("renders App", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".App")).to.have.lengthOf(1)
  });

  it("shows header", () => {
    const wrapper = mount(<MemoryRouter initialEntries={[ "/random" ]}><AuthDiv><UserHeader/></AuthDiv></MemoryRouter>);
    expect(wrapper.find(".row")).to.have.lengthOf(1)
  });

  it("shows User header", () => {
    localStorageMock.setItem("isauthenticated","false")
    localStorageMock.setItem("role","normal")
    const wrapper = mount(<MemoryRouter initialEntries={[ "/random" ]}><AuthDiv><Header/></AuthDiv></MemoryRouter>);
    expect(wrapper.find(".row")).to.have.lengthOf(1)
  });
  it("shows Admin Panel", () => {
    localStorageMock.setItem("isauthenticated","true")
    localStorageMock.setItem("role","admin")
    const wrapper = mount(<MemoryRouter initialEntries={[ "/random" ]}><AuthAdminDiv><Header/></AuthAdminDiv></MemoryRouter>);
    expect(wrapper.find(".row")).to.have.lengthOf(1)
  });

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
