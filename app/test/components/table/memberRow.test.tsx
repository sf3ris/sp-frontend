import React from 'react';
import { shallow } from 'enzyme';
import MemberRowComponent from '../../../src/component/member/Table/memberRow.component';
import { IMember } from '../../../src/features/members/models/IMember';

describe('Member Row Component', () => {

    const onEditFn = jest.fn();
    const onDeleteFn = jest.fn();

    const memberMock : IMember = {
        _id: '123',
        name: 'Mario',
        last_name: 'Rossi',
        birth_date: '1980-10-01',
        birth_place: 'Tolentino',
        fiscal_code: 'MRARSS80E01E783P',
        address: 'Via del lavoro, 1',
        city: 'Tolentino',
        zip_code: '62010',
        province: 'MC',
        gender: 'M',
        phone: '3334885961',
        email: 'mario.rossi@libero.it'
    }

    it('Should match snapshot', () => {

        const wrapper = shallow(
            <MemberRowComponent
                member={memberMock}
                onDeleteClick={onDeleteFn}
                onEditClick={onEditFn} />
        )

        expect(wrapper.debug()).toMatchSnapshot();

    })

    it('Should trigger edit', () => {

        const wrapper = shallow(
            <MemberRowComponent
                member={memberMock}
                onDeleteClick={onDeleteFn}
                onEditClick={onEditFn} />
        )

        const editButton = wrapper.find('#editButtonId_123');
        expect(editButton.length).toBe(1);

        editButton.simulate('click');

        expect(onEditFn).toBeCalled();

    });
    
})
