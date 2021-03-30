import React, { useState } from 'react'
import { IMember } from '../../../features/members/models/IMember'
import { dateUtils } from '../../../utils/dateUtils'
import MemberRow from './memberRow.component'
import { Button, Form, Grid, Input, Modal } from 'semantic-ui-react'

interface IAttendanceModalProps {
    isOpen: boolean;
    toggle: (...args: any) => void;
    startDate: Date;
    endDate: Date;
    athletes: IMember[];
    members: IMember[];
    onSave: (athletesIds: string[], membersIds: string[], title: string) => void;
    onDelete: () => void;
    selectedAthletesIds: string[];
    selectedMembersIds: string[];
    title?: string;
}

const AttendanceModal : React.FC<IAttendanceModalProps> = props => {
  const [selectedAthletesIds, setSelectedAthletesIds] = useState<string[]>(props.selectedAthletesIds || [])
  const [selectedMembersIds, setSelectedMembersIds] = useState<string[]>(props.selectedMembersIds || [])
  const [eventDescription, setEventDescription] = useState<string>(props.title || '')
  const [athletesItemCount, setAthletesItemCount] = useState<number>(10)
  const [membersItemCount, setMembersItemCount] = useState<number>(10)
  const [athletes, setAthletes] = useState<IMember[]>(props.athletes || [])
  const [members, setMembers] = useState<IMember[]>(props.members || [])

  const handleAthleteCheck = (athlete : IMember, value: boolean) => {
    const tmpSelectedIds = [...selectedAthletesIds]

    if (!value) {
      tmpSelectedIds.splice(
        tmpSelectedIds.indexOf(athlete._id),
        1
      )
    } else {
      tmpSelectedIds.push(athlete._id)
    }

    setSelectedAthletesIds(tmpSelectedIds)
  }

  const handleMembercheck = (member : IMember, value: boolean) => {
    const tmpSelectedIds = [...selectedMembersIds]

    if (!value) {
      tmpSelectedIds.splice(
        tmpSelectedIds.indexOf(member._id),
        1
      )
    } else {
      tmpSelectedIds.push(member._id)
    }

    setSelectedMembersIds(tmpSelectedIds)
  }

  const onSave = () => {
    props.onSave(selectedAthletesIds, selectedMembersIds, eventDescription)
  }

  const onLoadMoreAthletes = (increment: number) => {
    setAthletesItemCount(athletesItemCount + increment)
  }

  const onLoadMoreMembers = (increment: number) => {
    setMembersItemCount(membersItemCount + increment)
  }

  const filterAthletes = (value: string) => {
    const filteredAthletes = props.athletes.filter(athlete => athlete.name.includes(value) || athlete.last_name.includes(value))

    setAthletes(filteredAthletes)
  }

  const filterMembers = (value: string) => {
    const filteredMembers = props.members.filter(member => member.name.includes(value) || member.last_name.includes(value))

    setMembers(filteredMembers)
  }

  const renderAthlete = (athlete : IMember) => <MemberRow
      isChecked={selectedAthletesIds.includes(athlete._id)}
      member={athlete}
      onChecked={handleAthleteCheck} />

  const renderMember = (member : IMember) => <MemberRow
      isChecked={selectedMembersIds.includes(member._id)}
      member={member}
      onChecked={handleMembercheck} />

  return (
        <Modal open={props.isOpen} toggle={props.toggle}>
            <Modal.Header>
                <h1> Elenco presenze </h1>
            </Modal.Header>
            <Modal.Content>
                <Grid columns="equal" container centered>
                    <Grid.Column>
                        <div>
                            <Input
                                label="Inizio evento"
                                disabled
                                value={dateUtils.formatDateToLocale(props.startDate.toDateString())} />
                            <Input
                                label="Descrizione"
                                value={eventDescription}
                                onChange={e => setEventDescription(e.target.value)} />
                        </div>
                    </Grid.Column>
                </Grid>
                <Grid columns="equal" container centered>
                    <Grid.Column>
                        <h3 style={{ marginTop: '10px', marginBottom: '10px' }}> Athletes </h3>
                        <Form>
                            <Form.Input
                                placeholder="Filter athletes"
                                onChange={ e => filterAthletes(e.target.value)}
                            />
                            {athletes.slice(0, athletesItemCount).map(renderAthlete)}
                        </Form>
                        <Button disabled={athletesItemCount === 10} style={{ marginTop: '10px' }} primary onClick={() => onLoadMoreAthletes(-10)}>
                            Show less athletes
                        </Button>
                        <Button disabled={athletesItemCount >= props.athletes.length} style={{ marginTop: '10px' }} primary onClick={() => onLoadMoreAthletes(10)}>
                            Show more athletes
                        </Button>
                    </Grid.Column>
                    <Grid.Column>
                        <h3 style={{ marginTop: '10px', marginBottom: '10px' }}> Members </h3>
                        <Form>
                            <Form.Input
                                placeholder="Filter athletes"
                                onChange={ e => filterMembers(e.target.value)}
                            />
                            {members.slice(0, membersItemCount).map(renderMember)}
                        </Form>
                        <Button disabled={membersItemCount === 10} style={{ marginTop: '10px' }} primary onClick={() => onLoadMoreMembers(-10)}>
                            Show less members
                        </Button>
                        <Button disabled={membersItemCount >= props.members.length} style={{ marginTop: '10px' }} primary onClick={() => onLoadMoreMembers(+10)}>
                            Show more members
                        </Button>
                    </Grid.Column>
                </Grid>
            </Modal.Content>
            <Modal.Actions>
                    <Button primary onClick={props.onDelete}> Cancella </Button>
                    <Button primary onClick={onSave} style={{ float: 'right' }}> Salva </Button>
            </Modal.Actions>
        </Modal>
  )
}

export default AttendanceModal
