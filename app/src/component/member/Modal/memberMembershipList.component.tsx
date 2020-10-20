import React, { useEffect } from 'react';
import { IMembership } from '../../../features/memberships/models/membership';
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import { dateUtils } from '../../../utils/dateUtils';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IMemberMembershipListProps {
    memberships : IMembership[];
    onDeleteMembership : ( membership : IMembership ) => void;
}

const MemberMembershipList : React.FC<IMemberMembershipListProps> = props => {

    const renderMembership = ( membership : IMembership, index : number ) => 
        <TableRow key={index}>
            <TableCell>
                {dateUtils.formatDateToLocale(membership.start_date.toString())}
            </TableCell>
            <TableCell>
                {dateUtils.formatDateToLocale(membership.end_date.toString())}
            </TableCell>
            <TableCell>
                <FontAwesomeIcon icon={faTrash} color="red" onClick={() => props.onDeleteMembership(membership)} />
            </TableCell>
        </TableRow>

    return (

        <>

            <h3 style={{margin:'auto'}}>Lista Tesseramenti</h3>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell> Data Inizio </TableCell>
                        <TableCell> Data Fine </TableCell>
                        <TableCell> </TableCell>
                    </TableHead>
                    <TableBody>
                        {props.memberships.map(renderMembership)}
                    </TableBody>
                </Table>
            </TableContainer>

        </>

    )

}

export default MemberMembershipList;