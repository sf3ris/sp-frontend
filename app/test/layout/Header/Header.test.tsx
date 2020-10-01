import React from 'react';
import { shallow,configure } from 'enzyme';
import Header from '../../../src/layout/Header/Header';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Header layout component test', () => {

    it("Should match snapshot", () => {

        const wrapper = shallow( <Header /> );

        expect(wrapper.debug()).toMatchSnapshot();

    })
    
})

