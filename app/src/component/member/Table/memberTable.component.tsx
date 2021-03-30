import React, { useEffect, useState } from 'react'
import { IHeaderMap, IMember } from '../../../features/members/models/IMember'
import MemberRowComponent from './memberRow.component'
import MemberToolbarComponent from './memberToolbar.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { Input, Table } from 'semantic-ui-react'

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
                    <Table fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Cognome</Table.HeaderCell>
                                <Table.HeaderCell>Nome</Table.HeaderCell>
                                <Table.HeaderCell>Data di nascita</Table.HeaderCell>
                                <Table.HeaderCell>Codice Fiscale</Table.HeaderCell>
                                <Table.HeaderCell>Città</Table.HeaderCell>
                                <Table.HeaderCell>Provincia</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Stato</Table.HeaderCell>
                                <Table.HeaderCell colSpan={2}></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    <Input
                                        fluid
                                        onChange={ e => setLastNameFilter(e.target.value)}
                                        value={lastNameFilter}
                                        />
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    <Input
                                        fluid
                                        onChange={e => setNameFilter(e.target.value)}
                                        value={nameFilter}
                                        />
                                </Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell>
                                    <Input
                                        fluid
                                        onChange={e => setFiscalCodeFilter(e.target.value)}
                                        value={fiscalCodeFilter}
                                        />
                                </Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell>
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        color={statusFilter === undefined ? 'grey' : statusFilter ? 'green' : 'red'}
                                        onClick={switchStatusFilter} />
                                </Table.HeaderCell>
                                <Table.HeaderCell colSpan={2}></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {props.members.map(member => <MemberRowComponent
                                onDeleteClick={props.onDelete}
                                onEditClick={props.onEdit}
                                member={member}
                                key={member._id} />)}
                        </Table.Body>
                    </Table>

                {props.members.length >= 10 ? renderToolbar() : null }

            </>

  )
}

export default MemberTableComponent
