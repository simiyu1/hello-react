import React from "react";
import { mount, shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {expect} from "chai";
import {MemoryRouter} from "react-router-dom";
import DashBoard from "../dashboard";
import AdminPanel from "../admin-panel";

configure({ adapter: new Adapter() });
jest.mock("react-router-dom");


describe("The Dashboard is displayed", ()=>{
  it("renders Dashboard", () => {
    const wrapper = shallow(<DashBoard/>)
    expect(wrapper.find(".admin-panel")).to.have.lengthOf(1)
  });

  it("renders Admin Panel", () => {
    const wrapper = shallow(<DashBoard><MemoryRouter initialEntries={[ "/random" ]}><AdminPanel/></MemoryRouter></DashBoard>)
    expect(wrapper.find(".clearfix")).to.have.lengthOf(2)
  });
});
