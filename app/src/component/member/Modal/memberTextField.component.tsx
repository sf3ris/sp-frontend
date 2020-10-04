import React from 'react';
import { TextField, makeStyles, Theme, createStyles } from '@material-ui/core';

interface IMemberTextFieldProps {
    label : string;
    onChange : ( value : string ) => void,
    value : string;
    width?: string;
    maxLength?:number;
    disabled?: boolean;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    textField : {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '45%'
    }
}))



const MemberTextField : React.FC<IMemberTextFieldProps> = props => {

    const classes = useStyles();

    return (

        <TextField
            disabled={props.disabled}
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                maxLength: props.maxLength
            }}
            margin="normal"
            label={props.label}
            value={props.value}
            onChange={ e => props.onChange(e.target.value)} />

    )

}

export default MemberTextField;