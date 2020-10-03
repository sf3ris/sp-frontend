import React from 'react';
import { IMember } from '../../features/members/models/IMember';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import MemberRowComponent from './memberRow.component';
import MemberToolbarComponent from './memberToolbar.component';

interface IMemberTableComponentProps {
    members: IMember[];
    onNew:(...args:any) => void;
}

const MemberTableComponent : React.FC<IMemberTableComponentProps> = props => {

    return (
            <>

                <MemberToolbarComponent onNew={props.onNew} />

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Cognome</TableCell>
                                <TableCell>Città</TableCell>
                                <TableCell>Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {props.members.map( (member, index) => <MemberRowComponent member={member} key={index} /> )}

                        </TableBody>
                    </Table>
                </TableContainer>

            </>

    )

}

export default MemberTableComponent;