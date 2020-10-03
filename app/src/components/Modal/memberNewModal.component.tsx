import React, { useState } from 'react';
import { Modal, TextField, Grid, makeStyles, Theme, createStyles, Button } from '@material-ui/core';
import MemberTextField from './memberTextField.component';
import { IMember } from '../../features/members/models/IMember';

interface IMemberNewModalComponentProps {
    isOpen: boolean;
    toggle: (...args: any) => void;
    onSave: ( member : Partial<IMember> ) => void;
}

const modalStyle = () : React.CSSProperties => {
    const top = '10vh';
    const left = '25vw';

    return {
        top : top,
        left: left,
        backgroundColor:'#fff',
        position:'absolute',
        padding:'10px',
        width: '50vw'
    }
}

const useStyles = makeStyles((theme : Theme) => createStyles({
    root: {
        display : 'flex',
        flexWrap : 'wrap'
    },
    textContainer : {
        width: '80%',
        marginRight:'auto',
        marginLeft:'auto',
        marginTop:'10px'
    }
}))

const MemberNewModalComponent : React.FC<IMemberNewModalComponentProps> = props => {

    const classes = useStyles();

    const [ name, setName ]             = useState<string>('');
    const [ lastName, setLastName]      = useState<string>('');
    const [ birthDate, setBirthDate]    = useState<string>('');
    const [ birthPlace, setBirthPlace]  = useState<string>('');
    const [ fiscalCode, setFiscalCode]  = useState<string>('');
    const [ address, setAddress]        = useState<string>('');
    const [ zipCode, setZipCode]        = useState<string>('');
    const [ city, setCity]              = useState<string>('');
    const [ province, setProvince]      = useState<string>('');
    const [ gender, setGender]          = useState<string>('');
    const [ phone, setPhone]            = useState<string>('');
    const [ email, setEmail]            = useState<string>('');

    const onNameChange          = ( value : string ) => setName(value);
    const onLastNameChange      = ( value : string ) => setLastName(value);
    const onBirthDateChange     = ( value : string ) => setBirthDate(value);
    const onBirthPlaceChange    = ( value : string ) => setBirthPlace(value);
    const onFiscalCodeChange    = ( value : string ) => setFiscalCode(value);
    const onAddressChange       = ( value : string ) => setAddress(value);
    const onZipCodeChange       = ( value : string ) => setZipCode(value);
    const onProvinceChange      = ( value : string ) => setProvince(value);
    const onCityChange          = ( value : string ) => setCity(value);
    const onGenderChange        = ( value : string ) => setGender(value);
    const onPhoneChange         = ( value : string ) => setPhone(value);
    const onEmailChange         = ( value : string ) => setEmail(value);

    const resetForm = () => {

        setName('');
        setLastName('');
        setBirthDate('');
        setBirthPlace('');
        setFiscalCode('');
        setAddress('');
        setZipCode('');
        setProvince('');
        setCity('');
        setGender('');
        setPhone('');
        setEmail('');

    }

    const onClose = () => {

        resetForm();
        props.toggle();

    }

    const onSave = () => {

        props.onSave({
            name,
            last_name: lastName,
            birth_date: birthDate,
            birth_place: birthPlace,
            fiscal_code: fiscalCode,
            address,
            zip_code: zipCode,
            city,
            province,
            gender,
            phone,
            email
        });

        onClose();

    }
    
    return (

        <Modal open={props.isOpen} onClose={onClose}>

            <div style={modalStyle()}>
                
                <div className={classes.root}>
                    <div className={classes.textContainer}>

                        <MemberTextField
                            label="Nome"
                            value={name}
                            onChange={onNameChange} />

                        <MemberTextField
                            label="Cognome"
                            value={lastName}
                            onChange={onLastNameChange} />

                        <MemberTextField
                            label="Data di nascita"
                            value={birthDate}
                            onChange={onBirthDateChange} />

                        <MemberTextField
                            label="Luogo di nascita"
                            value={birthPlace}
                            onChange={onBirthPlaceChange} />

                        <MemberTextField
                            label="Codice Fiscale"
                            value={fiscalCode}
                            maxLength={16}
                            onChange={onFiscalCodeChange} />

                        <MemberTextField
                            label="Indirizzo"
                            value={address}
                            onChange={onAddressChange} />

                        <MemberTextField
                            label="CAP"
                            maxLength={5}
                            value={zipCode}
                            onChange={onZipCodeChange} />

                        <MemberTextField
                            label="Città"
                            value={city}
                            onChange={onCityChange} />

                        <MemberTextField
                            label="Provincia"
                            value={province}
                            onChange={onProvinceChange} />

                        <MemberTextField
                            label="Sesso"
                            value={gender}
                            maxLength={1}
                            onChange={onGenderChange} />

                        <MemberTextField
                            label="Telefono"
                            value={phone}
                            onChange={onPhoneChange} />

                        <MemberTextField
                            label="Email"
                            value={email}
                            onChange={onEmailChange} />
                            
                    </div>

                </div>
                <div className={classes.textContainer}>

                        <Button variant="contained" color="secondary" onClick={onClose} >Annulla</Button>

                        <Button variant="contained" color="primary" onClick={onSave} style={{float:'right'}} >Salva</Button>

                    </div>
            </div>

        </Modal>

    )

}

export default MemberNewModalComponent;