import React, { useEffect } from 'react'
import { IMembership } from '../../../features/memberships/models/membership'
import { dateUtils } from '../../../utils/dateUtils'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table } from 'semantic-ui-react'

interface IMemberMembershipListProps {
    memberships : IMembership[];
    onDeleteMembership : (membership : IMembership) => void;
}

const MemberMembershipList : React.FC<IMemberMembershipListProps> = props => {
  const renderMembership = (membership : IMembership, index : number) =>
        <Table.Row key={index}>
            <Table.Cell>
                {dateUtils.formatDateToLocale(membership.start_date.toString())}
            </Table.Cell>
            <Table.Cell>
                {dateUtils.formatDateToLocale(membership.end_date.toString())}
            </Table.Cell>
            <Table.Cell>
                <FontAwesomeIcon icon={faTrash} color="red" onClick={() => props.onDeleteMembership(membership)} />
            </Table.Cell>
        </Table.Row>

  return (
        <>
            <h3 style={{ margin: 'auto' }}>Lista Tesseramenti</h3>
            <Table>
                    <Table.Header>
                        <Table.HeaderCell>Data Inizio</Table.HeaderCell>
                        <Table.HeaderCell>Data Fine</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {props.memberships.map(renderMembership)}
                    </Table.Body>
            </Table>
        </>
  )
}

export default MemberMembershipList
