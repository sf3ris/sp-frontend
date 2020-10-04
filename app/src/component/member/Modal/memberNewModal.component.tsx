import React, { useState, useEffect } from 'react';
import { Modal, makeStyles, Theme, createStyles, Button } from '@material-ui/core';
import MemberTextField from './memberTextField.component';
import { IMember } from '../../../features/members/models/IMember';
import { dateUtils } from '../../../utils/dateUtils';

interface IMemberNewModalComponentProps {
    isOpen: boolean;
    toggle: (...args: any) => void;
    onSave: ( member : Partial<IMember> ) => void;
    member? : IMember;
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

    const [ name, setName ]             = useState<string>(props.member?.name || '');
    const [ lastName, setLastName]      = useState<string>(props.member?.last_name || '');
    const [ birthDate, setBirthDate]    = useState<string>(props.member?.birth_date || '');
    const [ birthPlace, setBirthPlace]  = useState<string>(props.member?.birth_place || '');
    const [ fiscalCode, setFiscalCode]  = useState<string>(props.member?.fiscal_code || '');
    const [ address, setAddress]        = useState<string>(props.member?.address || '');
    const [ zipCode, setZipCode]        = useState<string>(props.member?.zip_code || '');
    const [ city, setCity]              = useState<string>(props.member?.city || '');
    const [ province, setProvince]      = useState<string>(props.member?.province || '');
    const [ gender, setGender]          = useState<string>(props.member?.gender || '');
    const [ phone, setPhone]            = useState<string>(props.member?.phone || '');
    const [ email, setEmail]            = useState<string>(props.member?.email || '');

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

    const onPopulate = () => {

        setName('Mario');
        setLastName('Verdi')
        setBirthDate('10/01/1992');
        setBirthPlace('Milano');
        setFiscalCode('MRAVRD92E10E783P');
        setAddress('Via delle grazie,15');
        setZipCode('54201');
        setProvince('MI');
        setCity('Milano');
        setGender('M');
        setPhone('33348859961');
        setEmail('mra.vrd@yahoo.it');

    }

    const setForm = ( member : IMember) => {

        const birth_date = dateUtils.formatDateToLocale( member.birth_date );

        setName(member.name);
        setLastName(member.last_name);
        setBirthDate(birth_date);
        setBirthPlace(member.birth_place);
        setFiscalCode(member.fiscal_code);
        setAddress(member.address);
        setZipCode(member.zip_code);
        setProvince(member.province);
        setCity(member.city);
        setGender(member.gender);
        setPhone(member.phone);
        setEmail(member.email);

    }

    const onClose = () => {

        resetForm();
        props.toggle();

    }

    const onSave = () => {

        const member : Partial<IMember> = {
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
        };

        if(props.member && '_id' in props.member) member._id = props.member._id;

        props.onSave( member );

        onClose();

    }

    useEffect(() => {

        props.member && setForm(props.member);

    }, [props.member])
    
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

                        <Button id="idDiscardButton" variant="contained" color="secondary" onClick={onClose} >Annulla</Button>

                        <Button id="idPopulatedButton" variant="contained" color="secondary" onClick={onPopulate} >Popola</Button>

                        <Button id="idSaveButton" variant="contained" color="primary" onClick={onSave} style={{float:'right'}} >Salva</Button>

                    </div>
            </div>

        </Modal>

    )

}

export default MemberNewModalComponent;