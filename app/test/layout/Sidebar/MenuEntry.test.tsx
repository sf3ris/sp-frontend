import React from 'react';
import MenuEntry from '../../../src/layout/Sidebar/Menu/MenuEntry';
import { IRoute } from '../../../src/routes/routes';
import { shallow } from 'enzyme';

describe('Menu Entry component test', () => {

    it('Should match snapshot', () => {

        const routeMock = { name: 'route_1', path: '/route_1' } as IRoute;

        const wrapper = shallow( <MenuEntry collapsed={false} route={routeMock} /> )

        expect(wrapper.debug()).toMatchSnapshot();

    });

    it('Should render text', () => {

        const routeMock = { name: 'route_1', path: '/route_1' } as IRoute;

        const wrapper = shallow( <MenuEntry collapsed={false} route={routeMock} /> )

        expect(wrapper.find('span').length).toBe(1);

    });

    it('Should not render text', () => {

        const routeMock = { name: 'route_1', path: '/route_1' } as IRoute;

        const wrapper = shallow( <MenuEntry collapsed={true} route={routeMock} /> )

        expect(wrapper.find('span').length).toBe(0);

    });
    
})
