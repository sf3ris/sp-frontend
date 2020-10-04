import React from 'react';
import { shallow } from 'enzyme';
import MemberTextField from '../../../src/component/member/Modal/memberTextField.component';

describe('Member Text Field component', () => {

    const onChangeFn = jest.fn();

    it('Should match snapshot', () => {

        const wrapper = shallow(
            <MemberTextField
                value="value"
                onChange={onChangeFn}
                label="label" />
        );

        expect(wrapper.debug()).toMatchSnapshot();

    })
  
})
