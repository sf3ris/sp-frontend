import React from 'react';
import { Modal, TextField, Grid, makeStyles, Theme, createStyles } from '@material-ui/core';

interface IMemberNewModalComponentProps {
    isOpen: boolean;
    toggle: (...args: any) => void;
}

const modalStyle = () : React.CSSProperties => {
    const top = '10vh';
    const left = '15vw';

    return {
        top : top,
        left: left,
        backgroundColor:'#fff',
        position:'absolute',
        width:'70vw',
        padding:'10px'
    }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }),
);

const MemberNewModalComponent : React.FC<IMemberNewModalComponentProps> = props => {

    const classes = useStyles();

    return (

        <Modal open={props.isOpen} onClose={props.toggle}>

            <div style={modalStyle()}>

                <h3>Creazione Socio</h3>

                <hr/>
                
                <form className={classes.root}> 

                    <Grid container spacing={3}>

                        <Grid item xs={6}>

                            <TextField label="Nome"/>

                        </Grid>  

                       <Grid item xs={6}>

                            <TextField label="Cognome"/>

                        </Grid>  

                        <Grid item xs={12}>

                            <TextField label="Luogo di Nascita"/>

                        </Grid>  

                        <Grid item xs={12}>

                            <TextField label="Data di nascita"/>

                        </Grid>  

                        <Grid item xs={12}>

                            <TextField label="Codice Fiscale"/>

                        </Grid>  

                        <Grid item xs={12}>

                            <TextField label="Email"/>

                        </Grid>  

                        <Grid item xs={12}>

                            <TextField label="Telefono"/>

                        </Grid>  

                        <Grid item xs={12}>

                            <TextField label="Indirizzo"/>

                        </Grid>  

                    </Grid>

                </form>

            </div>

        </Modal>

    )

}

export default MemberNewModalComponent;