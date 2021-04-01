import React, { useState } from 'react'
import { IMember } from '../../../features/members/models/IMember'
import MemberPersonalDataFormComponent from './memberPersonalDataForm.component'
import MemberMembershipForm from './memberMemershipForm.component'
import { IMembership } from '../../../features/memberships/models/membership'
import { Modal, Tab } from 'semantic-ui-react'

interface IMemberModalProps {
    isOpen: boolean;
    toggle: (...args: any) => void;
    onSave: (member : Partial<IMember>, memberships: Omit<IMembership, '_id'>[]) => void;
    member? : IMember;
    onAddMembership: (member : IMember, membership: Omit<IMembership, '_id'>) => void;
    onDeleteMembership: (member : IMember, membership : IMembership) => void;
    parents?: IMember[];
}

const MemberModal : React.FC<IMemberModalProps> = props => {
  const [temporaryMemberships, setTemporaryMemberships] = useState<Omit<IMembership, '_id'>[]>([])

  const onAddMembership = (membership: Omit<IMembership, '_id'>) => {
    setTemporaryMemberships([...temporaryMemberships, membership])
  }

  const onSave = (member : Partial<IMember>) => {
    props.onSave(
      member,
      temporaryMemberships
    )
  }

  const panes = [
    {
      pane: <Tab.Pane key={0}>
            <MemberPersonalDataFormComponent
                parents={props.parents}
                onSave={onSave}
                isOpen={props.isOpen}
                toggle={props.toggle}
                member={props.member}
            />
        </Tab.Pane>,
      menuItem: 'Dati Anagrafici'
    },
    {
      menuItem: 'Tesseramenti',
      pane: <Tab.Pane key={1}>
          <MemberMembershipForm
              onTemporaryAddMembership={onAddMembership}
              member={props.member}
              onDeleteMembership={props.onDeleteMembership}
              onAddMembership={props.onAddMembership}/>
      </Tab.Pane>
    },
    {
      menuItem: 'Documenti',
      pane: <Tab.Pane key={2}> </Tab.Pane>
    }
  ]

  return (
        <Modal open={props.isOpen} onClose={props.toggle}>
            <Modal.Content>
                <Tab
                    menu={{ pointing: true }}
                    panes={panes}
                    renderActiveOnly={false} />
            </Modal.Content>
        </Modal>

  )
}

export default MemberModal
