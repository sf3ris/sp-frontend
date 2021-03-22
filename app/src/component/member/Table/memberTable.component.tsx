import React, { useEffect, useState } from 'react'
import { IHeaderMap, IMember } from '../../../features/members/models/IMember'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import MemberRowComponent from './memberRow.component'
import MemberToolbarComponent from './memberToolbar.component'
import MemberTextField from '../Modal/memberTextField.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

interface IMemberTableComponentProps {
    members: IMember[];
    onNew: (...args:any) => void;
    onEdit: (member : IMember) => void;
    onDelete: (member : IMember) => void;
    onPDF: (columns : string[], nameFilter: string, lastNameFilter: string, fiscalCodeFilter: string, statusFilter: boolean|undefined) => void;
    getMembers: (nameFilter: string, lastNameFilter: string, fiscalCodeFilter: string, statusFilter: boolean|undefined) => void
    onImportModal: (file: File, headers: IHeaderMap[], headerRow: string) => void;
}

const MemberTableComponent : React.FC<IMemberTableComponentProps> = props => {
  const onPDF = (columns: string[]) => {
    props.onPDF(columns, nameFilter, lastNameFilter, fiscalCodeFilter, statusFilter)
  }

  const renderToolbar = () => <MemberToolbarComponent
                                    onImportModal={props.onImportModal}
                                    onPDF={onPDF}
                                    onNew={props.onNew} />

  const [nameFilter, setNameFilter] = useState<string>('')
  const [lastNameFilter, setLastNameFilter] = useState<string>('')
  const [fiscalCodeFilter, setFiscalCodeFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<boolean|undefined>(undefined)

  const switchStatusFilter = () => {
    if (statusFilter === undefined) {
      setStatusFilter(true)
    } else {
      setStatusFilter(statusFilter ? false : undefined)
    }
  }

  useEffect(() => {
    props.getMembers(nameFilter, lastNameFilter, fiscalCodeFilter, statusFilter)
  }, [nameFilter, lastNameFilter, fiscalCodeFilter, statusFilter])

  return (
            <>

                {renderToolbar()}

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Cognome</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Data di nascita</TableCell>
                                <TableCell>Codice Fiscale</TableCell>
                                <TableCell>Città</TableCell>
                                <TableCell>Provincia</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Stato</TableCell>
                                <TableCell colSpan={2}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <MemberTextField
                                        label=""
                                        onChange={(value: string) => setLastNameFilter(value)}
                                        value={lastNameFilter}
                                        width="100"/>
                                </TableCell>
                                <TableCell>
                                    <MemberTextField
                                        label=""
                                        onChange={(value: string) => setNameFilter(value)}
                                        value={nameFilter}
                                        width="100" />
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <MemberTextField
                                        label=""
                                        onChange={(value: string) => setFiscalCodeFilter(value)}
                                        value={fiscalCodeFilter}
                                        width="100" />
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        color={statusFilter === undefined ? 'grey' : statusFilter ? 'green' : 'red'}
                                        onClick={switchStatusFilter} />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {props.members.map(member => <MemberRowComponent onDeleteClick={props.onDelete} onEditClick={props.onEdit} member={member} key={member._id} />)}

                        </TableBody>
                    </Table>

                </TableContainer>

                {props.members.length >= 10 ? renderToolbar() : null }

            </>

  )
}

export default MemberTableComponent
