import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, Button} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { IMembership } from '../../../features/memberships/models/membership';
import { IMember } from '../../../features/members/models/IMember';
import MemberMembershipList from './memberMembershipList.component';

interface IMemberMembershipFormProps {
    onAddMembership: ( member : IMember, membership: Omit<IMembership,"_id">) => void;
    onDeleteMembership: ( member : IMember, membership : IMembership ) => void;
    member: IMember | undefined;
    onTemporaryAddMembership: (membership: Omit<IMembership,"_id">) => void;
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
        paddingLeft: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    list : {
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

        if(props.member) {
            startMembershipDate && stopMembershipDate &&
                props.onAddMembership(
                    props.member,
                    {
                        start_date: startMembershipDate,
                        end_date : stopMembershipDate
                    }
                );
        } else {
            startMembershipDate && stopMembershipDate && props.onTemporaryAddMembership(
                {
                    start_date: startMembershipDate,
                    end_date : stopMembershipDate
                }
            );
            alert("Tesseramento eseguito correttamente, verrà salvato al completamento della registrazione");
        }

    }

    const onDelete = ( membership : IMembership ) => {

        props.member && props.onDeleteMembership(
            props.member,
            membership
        );

    }

    return (

        <div className={classes.root}>
            <div className={classes.list}>
                {props.member && <MemberMembershipList
                    onDeleteMembership={onDelete}
                    memberships={props.member.memberships} /> }
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
                        color="primary"
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
