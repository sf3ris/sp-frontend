import React from 'react';
import { makeStyles, Theme, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme : Theme) => ({
    root : {
        '& > *': {
            margin: theme.spacing(1)
            }
    },
    button : {
        width:'100%'
    }
}))

interface ILoginComponentProps {
    onLogin : ( username : string ) => void;
}

const LoginComponent : React.FC<ILoginComponentProps> = props => {

    const classes = useStyles();

    const onLogin = ( username : string ) => props.onLogin( username );

    return (

        <div style={{width:'100%',height:'100vh'}}>

            <div style={{width:'30vw',height:'30vh',marginTop:'35vh', marginLeft:'35vw'}}>

                <form className={classes.root}>

                    <TextField label="username" variant="outlined" fullWidth />

                    <TextField label="password" type="password" variant="outlined" fullWidth />

                    <Button onClick={() => onLogin('sf3ris')} className={classes.button} size="large" variant="contained" color="primary">
                        LOGIN
                    </Button>

                </form>

            </div>

        </div>

    )

}

export default LoginComponent;