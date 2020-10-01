import React from 'react';
import Logo from '../../../src/layout/Sidebar/Logo/Logo';
import { shallow } from 'enzyme';

describe('Logo Component Test', () => {

    it('Should match snapshot', () => {

        const wrapper = shallow( <Logo collapsed={false} /> );

        expect(wrapper.debug()).toMatchSnapshot();

    });

    it('Should render img tag', () => {

        const wrapper = shallow( <Logo collapsed={false} /> );

        expect(wrapper.find('img').length).toBe(1);

    });

    it('Should not render img tag', () => {

        const wrapper = shallow( <Logo collapsed /> );

        expect(wrapper.find('img').length).toBe(0);

    })
    
})
