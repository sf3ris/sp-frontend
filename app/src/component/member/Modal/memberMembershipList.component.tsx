import React, { useEffect } from 'react';
import { IMembership } from '../../../features/memberships/models/membership';
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import { dateUtils } from '../../../utils/dateUtils';

interface IMemberMembershipListProps {
    memberships : IMembership[];
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
        </TableRow>

    return (

        <>

            <h3 style={{margin:'auto'}}>Lista Tesseramenti</h3>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell> Data Inizio </TableCell>
                        <TableCell> Data Fine </TableCell>
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