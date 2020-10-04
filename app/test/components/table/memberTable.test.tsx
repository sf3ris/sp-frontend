import React from 'react';
import { shallow } from 'enzyme';
import MemberTableComponent from '../../../src/component/member/Table/memberTable.component';
import { IMember } from '../../../src/features/members/models/IMember';

describe('Member table compponent', () => {

    const members : IMember[] = [
        {
            _id : '122',
            name: 'nOME',
            last_name: 'Cognome',
            birth_date: '01/01/1992',
            city: 'Pollenza'
        } as IMember,
        {
            _id : '123',
            name: 'nOME',
            last_name: 'Cognome',
            birth_date: '01/01/1992',
            city: 'Pollenza'
        } as IMember,
        {
            _id : '124',
            name: 'nOME',
            last_name: 'Cognome',
            birth_date: '01/01/1992',
            city: 'Pollenza'
        } as IMember,

    ]

    it('Should match snapshot', () => {

        const wrapper = shallow( <MemberTableComponent 
                members={members} 
                onNew={jest.fn()}
                onDelete={jest.fn()} 
                onEdit={jest.fn()} /> )

        expect(wrapper.debug()).toMatchSnapshot();

    });

    it('Should render 3 rows', () => {

        const wrapper = shallow( <MemberTableComponent 
                members={members} 
                onNew={jest.fn()}
                onDelete={jest.fn()} 
                onEdit={jest.fn()} /> )

        const rows = wrapper.find('MemberRowComponent');

        expect(rows.length).toBe(3);

    });
    
})
