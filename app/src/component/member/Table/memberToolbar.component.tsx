import React, { useState } from 'react';
import { Grid, Button, makeStyles, Theme, createStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import MemberPDFModal from '../PDFModal/memberPDFModal';

interface IMemberToolbarComponentProps {
    onNew: (...args : any) => void;
    onPDF: (columns : string[]) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    button : {
        margin : theme.spacing(2)
    }
}))

const MemberToolbarComponent : React.FC<IMemberToolbarComponentProps> = props => {

    const classes = useStyles();

    const [ isOpenPDFModal, setIsOpenPDFModal ] = useState<boolean>(false);

    const togglePDFModal = () => setIsOpenPDFModal(!isOpenPDFModal);

    return (

        <Grid container >

            <Grid item xs={12}>

                <Button className={classes.button} variant="contained" id="idNewButtonMemberTable" onClick={props.onNew} color="primary">
                    <FontAwesomeIcon icon={faPlusSquare} /> <span style={{marginLeft:'5px'}}>Nuovo</span>
                </Button>

                <Button className={classes.button} variant="contained" id="idPDFButtonMemberTable" onClick={togglePDFModal} color="primary">
                    <FontAwesomeIcon icon={faFilePdf} /> <span style={{marginLeft:'5px'}}>PDF</span>
                </Button>

            </Grid>

            <MemberPDFModal
                onOk={props.onPDF} 
                isOpen={isOpenPDFModal} 
                toggle={togglePDFModal} />

        </Grid>


    )

}

export default MemberToolbarComponent;
