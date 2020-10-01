import React from 'react';
import Card from '../../../src/layout/Card/Card';
import { shallow } from 'enzyme';

describe('Card Layout Component', () => {

    it('Should match snapshot', () => {

        const wrapper = shallow( <Card title="card-title"/> );

        expect(wrapper.debug()).toMatchSnapshot();

    });

    it('Should containt an h3 tag with title inside', () => {

        const wrapper = shallow( <Card title="card-title"/> );

        const h3 = wrapper.find('h3');

        expect(h3.length).toBe(1);

        expect(h3.text()).toBe('card-title');

    });
    
})
