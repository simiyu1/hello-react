import React from "react";
import { mount, shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {expect} from "chai";
import {MemoryRouter} from "react-router-dom";
import Auth from "../index";
import Logout from "../logout";
import Reset from "../reset";

configure({ adapter: new Adapter() });
jest.mock("react-router-dom");


describe("The Authentification page is displayed", ()=>{
  it("renders Auth", () => {
    const wrapper = mount(<Auth/>)
    expect(wrapper.find(".login-wrap")).to.have.lengthOf(1)
  });

  it("renders logout", () => {
    const wrapper = shallow(<Logout/>)
    expect(wrapper.find(".logout")).to.have.lengthOf(1)
  });

  it("renders reset", () => {
    const wrapper = shallow(<Reset/>)
    expect(wrapper.find(".reset-wrap")).to.have.lengthOf(1)
  });
});
