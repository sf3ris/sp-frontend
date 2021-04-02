import React, { useState, useEffect } from 'react'
import { IHeaderMap, IMember } from '../../features/members/models/IMember'
import MemberTableComponent from './Table/memberTable.component'
import MemberModal from './Modal/memberModal.component'
import { IMembership } from '../../features/memberships/models/membership'
import { Grid } from 'semantic-ui-react'

interface IMemberComponentProps {
    members: IMember[];
    onSave: (member : Partial<IMember>, memberships: Omit<IMembership, '_id'>[]) => void;
    onDelete : (member : IMember) => void;
    onPDF: (columns : string[], nameFilter: string, lastNameFilter: string, fiscalCodeFilter: string, statusFilter: boolean|undefined) => void;
    onAddMembership: (member : IMember, membership: Omit<IMembership, '_id'>) => void;
    onDeleteMembership : (member : IMember, membership : IMembership) => void;
    getMembers: (nameFilter: string, lastNameFilter: string, fiscalCodeFilter: string, statusFilter: boolean|undefined) => void;
    onImportModal: (file: File, headers: IHeaderMap[], headerRow: string) => void;
    parents?: IMember[];
}

const MemberComponent : React.FC<IMemberComponentProps> = props => {
  const [isOpenNewModal, setIsOpenNewModal] = useState<boolean>(false)

  const [member, setMember] = useState<IMember | undefined>(undefined)

  const toggleModal = () => {
    isOpenNewModal && setMember(undefined)
    setIsOpenNewModal(!isOpenNewModal)
  }

  const onEdit = (member : IMember) => {
    setMember(member)
    toggleModal()
  }

  useEffect(() => {
    setMember(
      props.members.find(m => m._id === member?._id)
    )
  }, [props.members])

  return (
            <div>
                <Grid centered columns={1}>
                    <Grid.Column>
                        <MemberTableComponent
                            onImportModal={props.onImportModal}
                            onPDF={props.onPDF}
                            members={props.members}
                            onNew={toggleModal}
                            onDelete={props.onDelete}
                            getMembers={props.getMembers}
                            onEdit={onEdit}/>
                    </Grid.Column>
                </Grid>

                <MemberModal
                    parents={props.parents}
                    onDeleteMembership={props.onDeleteMembership}
                    member={member}
                    onSave={props.onSave}
                    isOpen={isOpenNewModal}
                    onAddMembership={props.onAddMembership}
                    toggle={toggleModal} />
            </div>
  )
}

export default MemberComponent
