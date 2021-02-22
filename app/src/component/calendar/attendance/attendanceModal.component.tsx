import React, { useEffect, useState } from 'react';
import SimpleModal, { ISimpleModalProps } from '../../../layout/Modal/SimpleModal';
import { IMember } from '../../../features/members/models/IMember';
import { dateUtils } from '../../../utils/dateUtils';
import { createStyles, makeStyles, Theme, Button, TextField } from '@material-ui/core';

import MemberRow from './memberRow.component';

interface IAttendanceModalProps extends ISimpleModalProps  {
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

const useStyles = makeStyles((theme : Theme) => createStyles({
    root: {
        display : 'flex',
        flexWrap : 'wrap',
        width:'75%',
        margin:'auto',
        flexDirection: 'row',
        marginTop:'20px'
    },
    form: {
        width: '100%',
        margin:'auto',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: '20px'
    },
    row: {
        width: '100%'
    },
    buttonContainer: {
        width: '100%',
        marginRight:'auto',
        marginLeft:'auto',
        marginTop:'10px'
    }
}))

const AttendanceModal : React.FC<IAttendanceModalProps> = props => {

    const classes = useStyles();

    const [selectedAthletesIds, setSelectedAthletesIds] = useState<string[]>(props.selectedAthletesIds || []);
    const [selectedMembersIds, setSelectedMembersIds] = useState<string[]>(props.selectedMembersIds || []);
    const [eventDescription, setEventDescription] = useState<string>(props.title || '');

    const handleAthleteCheck = (athlete : IMember, value: boolean) => {

        const tmpSelectedIds = [...selectedAthletesIds];

        if(!value) {
            tmpSelectedIds.splice(
                tmpSelectedIds.indexOf(athlete._id),
                1
            );
        } else {
            tmpSelectedIds.push(athlete._id);
        }

        setSelectedAthletesIds(tmpSelectedIds);

    }

    const handleMembercheck = (member : IMember, value: boolean) => {

        const tmpSelectedIds = [...selectedMembersIds];

        if(!value) {
            tmpSelectedIds.splice(
                tmpSelectedIds.indexOf(member._id),
                1
            );
        } else {
            tmpSelectedIds.push(member._id);
        }

        setSelectedMembersIds(tmpSelectedIds);

    }

    const onSave = () => {
        props.onSave(selectedAthletesIds, selectedMembersIds, eventDescription);
    }

    const renderAthlete = ( athlete : IMember ) => <MemberRow isChecked={selectedAthletesIds.includes(athlete._id)} member={athlete} onChecked={handleAthleteCheck} />
    const renderMember = ( member : IMember ) => <MemberRow isChecked={selectedMembersIds.includes(member._id)} member={member} onChecked={handleMembercheck} />

    return (

        <SimpleModal isOpen={props.isOpen} toggle={props.toggle}>

            <div className={classes.root}>

                <h1> Elenco presenze </h1>

                <hr/>

                <div className={classes.form}>

                    <TextField 
                        fullWidth 
                        label="Inizio evento" 
                        disabled 
                        value={dateUtils.formatDateToLocale(props.startDate.toDateString())} />

                    <TextField 
                        fullWidth 
                        label="Descrizione" 
                        value={eventDescription} 
                        onChange={e => setEventDescription(e.target.value)} />

                </div>

                <div style={{width: '50%'}}>

                    <h3 style={{marginTop:'10px', marginBottom:'10px'}}> Athletes </h3>
            
                    {props.athletes.map(renderAthlete)}
                
                </div>

                <div style={{width: '50%'}}>
                    
                    <h3 style={{marginTop:'10px', marginBottom:'10px'}}> Members </h3>
        
                    {props.members.map(renderMember)}
                
                </div>

                <div className={classes.buttonContainer}>

                    <Button variant="contained" color="secondary" onClick={props.onDelete}> Cancella </Button>
                    <Button variant="contained" color="primary" onClick={onSave} style={{float:'right'}}> Salva </Button>

                </div>

            </div>

        </SimpleModal>

    )

}

export default AttendanceModal;
