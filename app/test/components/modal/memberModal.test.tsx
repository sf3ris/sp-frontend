import React from 'react';
import { shallow } from 'enzyme';
import MemberNewModalComponent from '../../../src/component/member/Modal/memberNewModal.component';

describe('Member Modal Component', () => {

    const onSaveFn = jest.fn();
    const onToggleFn = jest.fn();

    it('Should match snapshot', () => {

        const wrapper = shallow(
            <MemberNewModalComponent
                onSave={onSaveFn}
                isOpen={true}
                toggle={onToggleFn} />
        )

        expect(wrapper.debug()).toMatchSnapshot();

    });

    it('Should trigger save', () => {

        const wrapper = shallow(
            <MemberNewModalComponent
                onSave={onSaveFn}
                isOpen={true}
                toggle={onToggleFn} />
        )

        const saveButton = wrapper.find('#idSaveButton');
        
        expect(saveButton.length).toBe(1);
            
        saveButton.simulate('click');

        expect(onSaveFn).toBeCalled();

    });

    it('Should trigger toggle', () => {

        const wrapper = shallow(
            <MemberNewModalComponent
                onSave={onSaveFn}
                isOpen={true}
                toggle={onToggleFn} />
        )

        const discardButton = wrapper.find('#idDiscardButton');
        
        expect(discardButton.length).toBe(1);
            
        discardButton.simulate('click');

        expect(onToggleFn).toBeCalled();

    });
    
})
