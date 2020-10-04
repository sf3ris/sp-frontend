import React from 'react';
import { shallow } from 'enzyme';
import MemberToolbarComponent from '../../../src/components/Table/memberToolbar.component';

describe('Member toolbar component', () => {

    const onNewFn = jest.fn();

    it('Should match snapshot', () => {

        const wrapper = shallow(
            <MemberToolbarComponent 
                onNew={onNewFn} />
        );

        expect(wrapper.debug()).toMatchSnapshot();

    })

    it('Should trigger new', () => {

        const wrapper = shallow(
            <MemberToolbarComponent 
                onNew={onNewFn} />
        );

        const button = wrapper.find('#idNewButtonMemberTable');
        button.simulate('click');

        expect(onNewFn).toBeCalled();

    })
  
})
