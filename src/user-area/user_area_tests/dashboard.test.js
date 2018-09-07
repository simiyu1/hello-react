import React from 'react';
import { shallow, configure, mount} from 'enzyme';
import {expect} from 'chai';
import {NavLink, MemoryRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import DashBoard from '../../admin-area/dashboard';
import App, { AuthAdminDiv, AuthDiv, UserHeader, Header } from '../../user-area';

configure({ adapter: new Adapter() });

const state = { };
const defaultProps = {
  'returnedbooks':  {objects: [
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
  localStorageMock.setItem("isauthenticated","true")
  localStorageMock.setItem("role","normal")
  global.localStorage = localStorageMock;

describe('User Dashboard', ()=>{
    it('renders authdiv', () => {
        const wrapper = mount(<App><MemoryRouter><DashBoard/></MemoryRouter></App>)
        expect(wrapper.find(AuthDiv)).to.have.lengthOf(1)
      });
    it("renders without crashing", () => {
    shallow(<AuthAdminDiv/>)
    })

    //   it('renders fails with no props', () => {
    //     const wrapper = shallow(<TableReturned/>)
    //     expect(wrapper.find('.Fails')).to.have.lengthOf(1)
    //   });
});