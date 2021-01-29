import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles, Button, Select, MenuItem, InputLabel } from '@material-ui/core';
import MemberTextField from './memberTextField.component';
import { IMember } from '../../../features/members/models/IMember';
import { dateUtils } from '../../../utils/dateUtils';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CodiceFiscale from 'codice-fiscale-js';
import { IMembership } from '../../../features/memberships/models/membership';

interface IMemberPersonalDataFormComponentProps {
    isOpen: boolean;
    toggle: (...args: any) => void;
    onSave: ( member : Partial<IMember>, memberships: Omit<IMembership,"_id">[] ) => void;
    member? : IMember;
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
    },
    selectField : {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '45%'
    }
}))

const MemberPersonalDataFormComponent : React.FC<IMemberPersonalDataFormComponentProps> = props => {

    const classes = useStyles();

    const [ name, setName ]             = useState<string>(props.member?.name || '');
    const [ lastName, setLastName]      = useState<string>(props.member?.last_name || '');
    const [ birthDate, setBirthDate]    = useState<Date | null>(props.member ? new Date(props.member?.birth_date) : null);
    const [ birthPlace, setBirthPlace]  = useState<string>(props.member?.birth_place || '');
    const [ fiscalCode, setFiscalCode]  = useState<string>(props.member?.fiscal_code || '');
    const [ address, setAddress]        = useState<string>(props.member?.address || '');
    const [ zipCode, setZipCode]        = useState<string>(props.member?.zip_code || '');
    const [ city, setCity]              = useState<string>(props.member?.city || '');
    const [ province, setProvince]      = useState<string>(props.member?.province || '');
    const [ gender, setGender]          = useState<string>(props.member?.gender || '');
    const [ phone, setPhone]            = useState<string>(props.member?.phone || '');
    const [ email, setEmail]            = useState<string>(props.member?.email || '');

    const tryToCalculateFiscalCode = () => {

        if(name && lastName && birthDate && birthPlace) {

            try{

                const cf = new CodiceFiscale({
                    name: name,
                    surname: lastName,
                    gender: gender,
                    day: birthDate.getDate(), 
                    month: birthDate.getMonth() + 1,
                    year: birthDate.getFullYear(),
                    birthplace: birthPlace,
                    birthplaceProvincia: province
                });

                setFiscalCode(cf.cf);

            } catch(e) {
                setFiscalCode('');
            }

        }

    }

    const onNameChange          = ( value : string ) => setName(value)
    const onLastNameChange      = ( value : string ) => setLastName(value)
    const onBirthDateChange     = ( date : Date | null ) => setBirthDate(date)
    const onBirthPlaceChange    = ( value : string ) => setBirthPlace(value)
    const onFiscalCodeChange    = ( value : string ) => setFiscalCode(value.toUpperCase());
    const onAddressChange       = ( value : string ) => setAddress(value);
    const onZipCodeChange       = ( value : string ) => setZipCode(value);
    const onProvinceChange      = ( value : string ) => setProvince(value);
    const onCityChange          = ( value : string ) => setCity(value);
    const onGenderChange        = ( e : React.ChangeEvent<{value: unknown}> ) => setGender(e.target.value as string);
    const onPhoneChange         = ( value : string ) => setPhone(value);
    const onEmailChange         = ( value : string ) => setEmail(value);

    const resetForm = () => {

        setName('');
        setLastName('');
        setBirthDate(null);
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
        setBirthDate(new Date('10/01/1992'));
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
        setBirthDate(new Date(member.birth_date));
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

        const bDate = dateUtils.formatDateToServerFormat(birthDate || new Date());

        const member : Partial<IMember> = {
            name,
            last_name: lastName,
            birth_date: bDate,
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

        props.onSave(member, []);

        onClose();

    }

    useEffect(() => {

        props.member && setForm(props.member);

    }, [props.member])

    useEffect(() => {

        tryToCalculateFiscalCode();

    }, [name, lastName, birthDate, birthPlace, gender]);
    
    return (
                
            <>
                <div className={classes.root}>
                    <div className={classes.textContainer}>

                        <MemberTextField
                            label="Cognome"
                            value={lastName}
                            onChange={onLastNameChange} />

                        <MemberTextField
                            label="Nome"
                            value={name}
                            onChange={onNameChange} />

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className={classes.selectField}
                                margin="normal"
                                label="Data di nascita"
                                format="dd/MM/yyyy"
                                value={birthDate}
                                onChange={ date => onBirthDateChange(date)}
                                ></KeyboardDatePicker>

                        </MuiPickersUtilsProvider>

                        <MemberTextField
                            label="Luogo di nascita"
                            value={birthPlace}
                            onChange={onBirthPlaceChange} />

                        <InputLabel className={classes.selectField} id="gender-select-id">Sesso</InputLabel>
                        <Select 
                            labelId="gender-select-id"
                            value={gender}
                            onChange={onGenderChange}
                            className={classes.selectField}
                            >
                                <MenuItem value="M">M</MenuItem>
                                <MenuItem value="F">F</MenuItem>
                        </Select>
                        <br />

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
                            maxLength={2}
                            value={province}
                            onChange={onProvinceChange} />

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

                        <Button id="idDiscardButton" variant="contained" color="secondary" onClick={onClose}>Annulla</Button>
                        <Button id="idPopulatedButton" variant="contained" color="secondary" onClick={onPopulate}>Popola</Button>
                        <Button id="idSaveButton" variant="contained" color="primary" onClick={onSave} style={{float:'right'}}>Salva</Button>

                </div>

            </>
    )

}

export default MemberPersonalDataFormComponent;
