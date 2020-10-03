import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import { IMember } from '../../features/members/models/IMember';

interface IMemberRowComponentProps {
    member: IMember;
}

const MemberRowComponent : React.FC<IMemberRowComponentProps> = props => {

    return (

        <TableRow>
            <TableCell>{ props.member.name }</TableCell>
            <TableCell>{ props.member.last_name }</TableCell>
            <TableCell>{ props.member.city }</TableCell>
            <TableCell>{ props.member.email }</TableCell>
        </TableRow>

    )

}

export default MemberRowComponent;