import React from 'react';
import { TableRow, TableCell, Button, IconButton } from '@material-ui/core';
import { IMember } from '../../features/members/models/IMember';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

interface IMemberRowComponentProps {
    member: IMember;
    onEditClick: ( member : IMember ) => void;
    onDeleteClick: ( member : IMember ) => void;
}

const MemberRowComponent : React.FC<IMemberRowComponentProps> = props => {

    return (

        <TableRow>
            <TableCell>{ props.member.name }</TableCell>
            <TableCell>{ props.member.last_name }</TableCell>
            <TableCell>{ props.member.birth_date }</TableCell>
            <TableCell>{ props.member.city }</TableCell>
            <TableCell>{ props.member.email }</TableCell>
            <TableCell colSpan={2}>
                <IconButton id={"editButtonId_" + props.member._id} onClick={e => props.onEditClick(props.member)} size="small">
                    <FontAwesomeIcon icon={faPencilAlt} color="green" />
                </IconButton>
                <IconButton id={"deleteButtonId_" + props.member._id} onClick={e => props.onDeleteClick(props.member)} size="small">
                    <FontAwesomeIcon icon={faTrash} color="red" />
                </IconButton>
            </TableCell>
        </TableRow>

    )

}

export default MemberRowComponent;