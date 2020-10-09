import React, { useState } from 'react';
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
    onLogin : ( username : string, password: string ) => void;
}

const LoginComponent : React.FC<ILoginComponentProps> = props => {

    const classes = useStyles();

    const [ username, setUsername ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const onLogin = ( ) => props.onLogin( username, password );

    return (

        <div style={{width:'100%',height:'100vh'}}>

            <div style={{width:'30vw',height:'30vh',marginTop:'35vh', marginLeft:'35vw'}}>

                <form className={classes.root}>

                    <TextField 
                        value={username}
                        onChange={ e => setUsername(e.target.value)}
                        label="username" 
                        variant="outlined" 
                        fullWidth />

                    <TextField 
                        value={password}
                        onChange={ e => setPassword(e.target.value)}
                        label="password" 
                        type="password" 
                        variant="outlined" 
                        fullWidth />

                    <Button onClick={onLogin} className={classes.button} size="large" variant="contained" color="primary">
                        LOGIN
                    </Button>

                </form>

            </div>

        </div>

    )

}

export default LoginComponent;