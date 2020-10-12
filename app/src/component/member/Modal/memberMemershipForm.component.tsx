import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, Button} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

interface IMemberMembershipFormProps {

}

const useStyles = makeStyles((theme : Theme) => createStyles({
    root: {
        display : 'flex',
        flexWrap : 'wrap',
        width:'50%',
        margin:'auto'
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

    return (

        <div className={classes.root}>
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
                <Button className={classes.button} variant="contained">Tessera</Button>

            </MuiPickersUtilsProvider>
        </div>

    )

}

export default MemberMembershipForm;