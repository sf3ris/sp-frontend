import React, { useState } from 'react';
import { TableRow, TableCell, Button, IconButton } from '@material-ui/core';
import { IMember } from '../../../features/members/models/IMember';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faCircleNotch, faCircle } from '@fortawesome/free-solid-svg-icons';
import { dateUtils } from '../../../utils/dateUtils';
import ConfirmDialog from '../../../layout/Dialog/ConfirmDialog';

interface IMemberRowComponentProps {
    member: IMember;
    onEditClick: ( member : IMember ) => void;
    onDeleteClick: ( member : IMember ) => void;
}

const MemberRowComponent : React.FC<IMemberRowComponentProps> = props => {

    const [ isOpenConfirmDialog, setIsOpenConfirmDialog ] = useState<boolean>(false);

    const birth_date = dateUtils.formatDateToLocale(
        props.member.birth_date
    );

    const onDelete = () => {
        setIsOpenConfirmDialog(true);
    }

    const confirmDelete = () => {
        props.onDeleteClick( props.member );
    }

    return (
        <>
            <TableRow>
                <TableCell>{ props.member.name }</TableCell>
                <TableCell>{ props.member.last_name }</TableCell>
                <TableCell>{ birth_date }</TableCell>
                <TableCell>{ props.member.fiscal_code }</TableCell>
                <TableCell>{ props.member.city }</TableCell>
                <TableCell>{ props.member.province }</TableCell>
                <TableCell>{ props.member.email }</TableCell>
                <TableCell><FontAwesomeIcon icon={faCircle} color="green" /></TableCell>
                <TableCell colSpan={2}>
                    <IconButton id={"editButtonId_" + props.member._id} onClick={e => props.onEditClick(props.member)} size="small">
                        <FontAwesomeIcon icon={faPencilAlt} color="green" />
                    </IconButton>
                    <IconButton id={"deleteButtonId_" + props.member._id} onClick={onDelete} size="small">
                        <FontAwesomeIcon icon={faTrash} color="red" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <ConfirmDialog
                title="Confermi cancellazione?"
                onOk={confirmDelete}
                onDiscard={() => setIsOpenConfirmDialog(false)}
                isOpen={isOpenConfirmDialog} />

        </>

    )

}

export default MemberRowComponent;