import React from 'react';
import { shallow,configure } from 'enzyme';
import Header from '../../../src/layout/Header/Header';
import Adapter from 'enzyme-adapter-react-16';
import * as ReactRedux from 'react-redux';

const useDispatchMock : jest.SpyInstance = jest.spyOn(ReactRedux,'useDispatch');

configure({adapter: new Adapter()});

describe('Header layout component test', () => {

    it("Should match snapshot", () => {

        useDispatchMock.mockImplementation(()=>null);

        const wrapper = shallow( <Header /> );

        expect(wrapper.debug()).toMatchSnapshot();

    })
    
})

