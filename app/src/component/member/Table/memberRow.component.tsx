import React, { useState, useEffect } from 'react'
import { IMember } from '../../../features/members/models/IMember'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash, faCircle } from '@fortawesome/free-solid-svg-icons'
import { dateUtils } from '../../../utils/dateUtils'
import ConfirmDialog from '../../../layout/Dialog/ConfirmDialog'
import { Button, Table } from 'semantic-ui-react'

interface IMemberRowComponentProps {
    member: IMember;
    onEditClick: (member : IMember) => void;
    onDeleteClick: (member : IMember) => void;
}

const MemberRowComponent : React.FC<IMemberRowComponentProps> = props => {
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState<boolean>(false)

  const birthDate = dateUtils.formatDateToLocale(
    props.member.birth_date
  )

  const onDelete = () => {
    setIsOpenConfirmDialog(true)
  }

  const confirmDelete = () => {
    props.onDeleteClick(props.member)
  }

  const isActive = props.member.memberships.some(membership => new Date(membership.end_date).getTime() >= new Date().getTime())

  return (
        <>
            <Table.Row>
                <Table.Cell>{ props.member.last_name }</Table.Cell>
                <Table.Cell>{ props.member.name }</Table.Cell>
                <Table.Cell>{ birthDate }</Table.Cell>
                <Table.Cell>{ props.member.fiscal_code }</Table.Cell>
                <Table.Cell>{ props.member.city }</Table.Cell>
                <Table.Cell>{ props.member.province }</Table.Cell>
                <Table.Cell>{ props.member.email }</Table.Cell>
                <Table.Cell><FontAwesomeIcon icon={faCircle} color={isActive ? 'green' : 'red'} /></Table.Cell>
                <Table.Cell colSpan={2}>
                    <Button
                        id={'editButtonId_' + props.member._id}
                        onClick={e => props.onEditClick(props.member)} size="small"
                    >
                        <FontAwesomeIcon icon={faPencilAlt} color="green" />
                    </Button>
                    <Button
                        id={'deleteButtonId_' + props.member._id}
                        onClick={onDelete} size="small">
                        <FontAwesomeIcon icon={faTrash} color="red" />
                    </Button>
                </Table.Cell>
            </Table.Row>

            <ConfirmDialog
                title="Confermi cancellazione?"
                onOk={confirmDelete}
                onDiscard={() => setIsOpenConfirmDialog(false)}
                isOpen={isOpenConfirmDialog} />

        </>

  )
}

export default MemberRowComponent
