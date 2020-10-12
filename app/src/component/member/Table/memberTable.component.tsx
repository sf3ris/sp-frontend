import React from 'react';
import { IMember } from '../../../features/members/models/IMember';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import MemberRowComponent from './memberRow.component';
import MemberToolbarComponent from './memberToolbar.component';

interface IMemberTableComponentProps {
    members: IMember[];
    onNew: (...args:any) => void;
    onEdit: ( member : IMember ) => void;
    onDelete: (member : IMember) => void;
    onPDF: (...args:any) => void;
}

const MemberTableComponent : React.FC<IMemberTableComponentProps> = props => {

    return (
            <>

                <MemberToolbarComponent 
                    onPDF={props.onPDF}
                    onNew={props.onNew} />

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Cognome</TableCell>
                                <TableCell>Data di nascita</TableCell>
                                <TableCell>Codice Fiscale</TableCell>
                                <TableCell>Città</TableCell>
                                <TableCell>Provincia</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Stato</TableCell>
                                <TableCell colSpan={2}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {props.members.map( member => <MemberRowComponent onDeleteClick={props.onDelete} onEditClick={props.onEdit} member={member} key={member._id} /> )}

                        </TableBody>
                    </Table>
                </TableContainer>

            </>

    )

}

export default MemberTableComponent;