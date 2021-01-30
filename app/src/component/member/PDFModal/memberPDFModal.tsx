import React, { useState } from 'react';
import { Modal, Checkbox, FormControlLabel, makeStyles, Theme, createStyles, FormControl, Button } from '@material-ui/core';

import { IMember, memberHeaders, MemberHeader } from '../../../features/members/models/IMember';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

interface IMemberPDFModal {
    isOpen: boolean;
    onOk : ( columns : string[]) => void;
    toggle : (...args : any) => void;
}

const modalStyle = () : React.CSSProperties => {
    const top = '10vh';
    const left = '35vw';

    return {
        top : top,
        left: left,
        backgroundColor:'#fff',
        position:'absolute',
        padding:'10px',
        width: '30vw',
        height: '80vh',
        overflow:'scroll'
    }
}

interface HeaderCheck extends MemberHeader {
    checked : boolean
}

const useStyles = makeStyles((theme : Theme) => createStyles({
    root : {
        display: 'flex'
    },
    formControl: {
        margin: theme.spacing(3)
    }
}))

const MemberPDFModal : React.FC<IMemberPDFModal> = props => {

    const classes = useStyles();

    const [ checkedHeaders, setCheckedHeaders ] = useState<HeaderCheck[]>(memberHeaders.map( header => ({...header, checked: false})));

    const handleHeaderChange = ( e : React.ChangeEvent<HTMLInputElement>, header : HeaderCheck ) => {

        const i = checkedHeaders.findIndex( h => h.value === header.value );

        const tmpCheckedHeader = [...checkedHeaders];
        tmpCheckedHeader[i].checked = e.target.checked;

        setCheckedHeaders(
            tmpCheckedHeader
        )

    }

    const renderCheckboxHeader = ( header : HeaderCheck, index : number ) => <FormControlLabel key={index} control={ <Checkbox value={header.checked} onChange={e => handleHeaderChange(e, header)} /> } label={header.label} />

    const onPdf = () => {

        props.onOk(
            checkedHeaders.filter( header => header.checked === true ).map( header => header.value)
        );

    }

    return (

        <Modal open={props.isOpen} onClose={props.toggle}>

            <div style={modalStyle()}>

                <h3> Seleziona Colonne da esportare </h3>
                
                <div className={classes.root}>
                    <FormControl className={classes.formControl}>

                        {checkedHeaders.map( renderCheckboxHeader )}

                    </FormControl>
                </div>

                <Button 
                    color="primary" 
                    disabled={!checkedHeaders.some(header => header.checked)} 
                    onClick={onPdf} 
                    variant="contained" 
                    startIcon={<FontAwesomeIcon icon={faFilePdf} />} > 
                        Esporta 
                </Button>

            </div>

        </Modal>

    )

}

export default MemberPDFModal;
