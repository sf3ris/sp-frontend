import React from 'react';
import { shallow } from 'enzyme';
import MemberToolbarComponent from '../../../src/component/member/Table/memberToolbar.component';

describe('Member toolbar component', () => {

    const onNewFn = jest.fn();
    const onPdf = jest.fn();

    it('Should match snapshot', () => {

        const wrapper = shallow(
            <MemberToolbarComponent 
                onPDF={onPdf}
                onNew={onNewFn} />
        );

        expect(wrapper.debug()).toMatchSnapshot();

    })

    it('Should trigger new', () => {

        const wrapper = shallow(
            <MemberToolbarComponent 
                onPDF={onPdf}
                onNew={onNewFn} />
        );

        const button = wrapper.find('#idNewButtonMemberTable');
        button.simulate('click');

        expect(onNewFn).toBeCalled();

    })

    it('Should trigger pdf', () => {

        const wrapper = shallow(
            <MemberToolbarComponent 
                onPDF={onPdf}
                onNew={onNewFn} />
        );

        const button = wrapper.find('#idPDFButtonMemberTable');
        button.simulate('click');

        expect(onPdf).toBeCalled();

    })
  
})
