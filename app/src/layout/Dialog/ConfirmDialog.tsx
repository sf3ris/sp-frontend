import React from 'react';
import { Dialog, DialogTitle, DialogContentText, Button, DialogActions } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faBan } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

interface IConfirmDialogProps {
    onOk: (...args : any) => void;
    onDiscard: (...args : any) => void;
    isOpen: boolean;
    title: string; 
}

const ConfirmDialog : React.FC<IConfirmDialogProps> = props => {

    return(

        <Dialog 
            open={props.isOpen}
            onClose={props.onDiscard}
            >
                <DialogTitle style={{padding:"20px"}}> {props.title}  </DialogTitle>
                <DialogActions style={{padding:"20px"}}>
                    <Button color="secondary" onClick={props.onDiscard} startIcon={<FontAwesomeIcon icon={faBan} />}>
                        Annulla
                    </Button>
                    <Button color="primary" onClick={props.onOk} startIcon={<FontAwesomeIcon icon={faCheckCircle} />}>
                        Conferma
                    </Button>
                </DialogActions>
            </Dialog>

    )

}

export default ConfirmDialog;