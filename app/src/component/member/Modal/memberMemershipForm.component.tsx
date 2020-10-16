import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, Button} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { IMembership } from '../../../features/memberships/models/membership';
import { IMember } from '../../../features/members/models/IMember';
import MemberMembershipList from './memberMembershipList.component';

interface IMemberMembershipFormProps {
    onAddMembership: ( member : IMember, membership: IMembership) => void;
    member : IMember;
}

const useStyles = makeStyles((theme : Theme) => createStyles({
    root: {
        display : 'flex',
        flexWrap : 'wrap',
        width:'100%',
        margin:'auto',
        flexDirection: 'row'
    },
    form: {
        width: '50%',
        margin:'auto',
        marginLeft: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderLeft: '1px solid black'
    },
    dateField: {
        margin: theme.spacing(2)
    },
    button : {
        margin: 'auto'
    }
}))

const MemberMembershipForm : React.FC<IMemberMembershipFormProps> = props => {

    const classes = useStyles();

    const [ startMembershipDate, setStartMembershipDate ] = useState<Date | null>(null);
    const [ stopMembershipDate, setStopMembershipDate ] = useState<Date | null>(null);

    const onAddClick = () => {

        startMembershipDate && stopMembershipDate && 
         props.onAddMembership(
            props.member,
            {
                start_date: startMembershipDate,
                end_date : stopMembershipDate
            }
        )

    }

    return (

        <div className={classes.root}>
            <div>
                <MemberMembershipList memberships={props.member.memberships} />
            </div>
            <div className={classes.form}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        label="Data inizio tesseramento"
                        className={classes.dateField}
                        fullWidth
                        value={startMembershipDate}
                        onChange={ date => setStartMembershipDate(date)}
                        format="dd/MM/yyyy"
                        />
                    <br/>
                    <KeyboardDatePicker
                        label="Data scadenza tesseramento"
                        className={classes.dateField}
                        fullWidth
                        value={stopMembershipDate}
                        onChange={ date => setStopMembershipDate(date)}
                        format="dd/MM/yyyy"
                        />

                    <hr />
                    <Button 
                        disabled={!startMembershipDate && !stopMembershipDate}
                        onClick={onAddClick}
                        className={classes.button} 
                        variant="contained">Tessera</Button>

                </MuiPickersUtilsProvider>
            </div>
        </div>

    )

}

export default MemberMembershipForm;