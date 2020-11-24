import React, { useState } from 'react';
import SimpleModal, { ISimpleModalProps } from '../../../layout/Modal/SimpleModal';
import { IMember } from '../../../features/members/models/IMember';
import { dateUtils } from '../../../utils/dateUtils';
import { createStyles, makeStyles, Theme, Button, TextField } from '@material-ui/core';

import MemberRow from './memberRow.component';

interface IAttendanceModalProps extends ISimpleModalProps  {
    startDate: Date;
    endDate: Date;
    athletes: IMember[] ;
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
    }
}))

const AttendanceModal : React.FC<IAttendanceModalProps> = props => {

    const classes = useStyles();

    const [ selectedIds, setSelectedIds ] = useState<string[]>([]);
    const [ eventDescription, setEventDescription ] = useState<string>('');

    const handleAthleteCheck = (athlete : IMember, value: boolean ) => {

        const tmpSelectedIds = [...selectedIds ];

        if(!value) {

            tmpSelectedIds.splice(
                tmpSelectedIds.indexOf( athlete._id ),
                1
            );

        } else {

            tmpSelectedIds.push( athlete._id );

        }

        setSelectedIds( tmpSelectedIds );

    }

    const renderAthlete = ( athlete : IMember ) => <MemberRow member={athlete} onChecked={handleAthleteCheck} />

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

                    <h3 style={{marginTop:'10px', marginBottom:'10px'}}> Atleti </h3>
                
                    {props.athletes.map( renderAthlete )}
                
                </div>

                <Button variant="contained" onClick={() => console.log(selectedIds)} > Salva </Button>

            </div>

        </SimpleModal>

    )

}

export default AttendanceModal;