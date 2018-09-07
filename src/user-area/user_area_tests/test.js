import React from 'react';
import { shallow, configure, mount} from 'enzyme';
import App from '../index';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const state = { };
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  };
  global.localStorage = localStorageMock;

describe('App', ()=>{
    it('renders App', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find('.App')).to.have.lengthOf(1)
      });

      it('shows user header', () => {
        const wrapper = mount(<App/>);
        expect(wrapper.find('.row')).to.have.lengthOf(1)
    });
});
