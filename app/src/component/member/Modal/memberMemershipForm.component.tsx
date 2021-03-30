import React, { useState } from 'react'
import { IMembership } from '../../../features/memberships/models/membership'
import { IMember } from '../../../features/members/models/IMember'
import MemberMembershipList from './memberMembershipList.component'
import { Button, Form, Input } from 'semantic-ui-react'

interface IMemberMembershipFormProps {
    onAddMembership: (member : IMember, membership: Omit<IMembership, '_id'>) => void;
    onDeleteMembership: (member : IMember, membership : IMembership) => void;
    member: IMember | undefined;
    onTemporaryAddMembership: (membership: Omit<IMembership, '_id'>) => void;
}

const MemberMembershipForm : React.FC<IMemberMembershipFormProps> = props => {
  const [startMembershipDate, setStartMembershipDate] = useState<string>('')
  const [stopMembershipDate, setStopMembershipDate] = useState<string>('')

  const onAddClick = () => {
    const startDate = new Date(startMembershipDate)
    const stopDate = new Date(stopMembershipDate)
    if (props.member) {
      startMembershipDate && stopMembershipDate &&
                props.onAddMembership(
                  props.member,
                  {
                    start_date: startDate,
                    end_date: stopDate
                  }
                )
    } else {
      startMembershipDate && stopMembershipDate && props.onTemporaryAddMembership(
        {
          start_date: startDate,
          end_date: stopDate
        }
      )
      alert('Tesseramento eseguito correttamente, verrà salvato al completamento della registrazione')
    }
  }

  const onDelete = (membership : IMembership) => {
    props.member && props.onDeleteMembership(
      props.member,
      membership
    )
  }

  return (

        <div>
            <div style={{ marginTop: '30px' }}>
                <Form>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <Input
                                value={startMembershipDate}
                                onChange={e => setStartMembershipDate(e.target.value)}
                                placeholder="Data inizio (DD/MM/YYYY)"
                                />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                value={stopMembershipDate}
                                onChange={e => setStopMembershipDate(e.target.value)}
                                placeholder="Data Fine (DD/MM/YYYY)"
                            />
                        </Form.Field>
                    </Form.Group>
                    <Button
                        disabled={!startMembershipDate && !stopMembershipDate}
                        onClick={onAddClick}
                        primary>Tessera</Button>
                </Form>
                <div style={{ marginTop: '20px' }}>
                    {props.member && <MemberMembershipList
                        onDeleteMembership={onDelete}
                        memberships={props.member.memberships} /> }
                </div>
            </div>
        </div>

  )
}

export default MemberMembershipForm
