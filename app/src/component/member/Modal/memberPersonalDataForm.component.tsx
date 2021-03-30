import React, { useState, useEffect } from 'react'
import { IMember } from '../../../features/members/models/IMember'
import { dateUtils } from '../../../utils/dateUtils'
import CodiceFiscale from 'codice-fiscale-js'
import { IMembership } from '../../../features/memberships/models/membership'
import { Button, Form, Input, Select } from 'semantic-ui-react'

interface IMemberPersonalDataFormComponentProps {
    isOpen: boolean;
    toggle: (...args: any) => void;
    onSave: (member : Partial<IMember>, memberships: Omit<IMembership, '_id'>[]) => void;
    member? : IMember;
}

const MemberPersonalDataFormComponent : React.FC<IMemberPersonalDataFormComponentProps> = props => {
  const [name, setName] = useState<string>(props.member?.name || '')
  const [lastName, setLastName] = useState<string>(props.member?.last_name || '')
  const [birthDate, setBirthDate] = useState<string>(props.member?.birth_date || '')
  const [birthPlace, setBirthPlace] = useState<string>(props.member?.birth_place || '')
  const [fiscalCode, setFiscalCode] = useState<string>(props.member?.fiscal_code || '')
  const [address, setAddress] = useState<string>(props.member?.address || '')
  const [zipCode, setZipCode] = useState<string>(props.member?.zip_code || '')
  const [city, setCity] = useState<string>(props.member?.city || '')
  const [province, setProvince] = useState<string>(props.member?.province || '')
  const [gender, setGender] = useState<string>(props.member?.gender || '')
  const [phone, setPhone] = useState<string>(props.member?.phone || '')
  const [email, setEmail] = useState<string>(props.member?.email || '')

  const tryToCalculateFiscalCode = () => {
    if (name && lastName && birthDate && birthPlace) {
      try {
        const splittedDate = birthDate.split('/')
        const cf = new CodiceFiscale({
          name: name,
          surname: lastName,
          gender: gender,
          day: splittedDate[0],
          month: splittedDate[1],
          year: splittedDate[2],
          birthplace: birthPlace,
          birthplaceProvincia: province
        })

        setFiscalCode(cf.cf)
      } catch (e) {
        console.log(e)
        // setFiscalCode('');
      }
    }
  }

  const onNameChange = (value: string) => setName(value)
  const onLastNameChange = (value: string) => setLastName(value)
  const onBirthDateChange = (value: string) => setBirthDate(value)
  const onBirthPlaceChange = (value: string) => setBirthPlace(value)
  const onFiscalCodeChange = (value: string) => setFiscalCode(value.toUpperCase())
  const onAddressChange = (value: string) => setAddress(value)
  const onZipCodeChange = (value: string) => setZipCode(value)
  const onProvinceChange = (value: string) => setProvince(value)
  const onCityChange = (value: string) => setCity(value)
  const onGenderChange = (value: string) => setGender(value)
  const onPhoneChange = (value: string) => setPhone(value)
  const onEmailChange = (value: string) => setEmail(value)

  const resetForm = () => {
    setName('')
    setLastName('')
    setBirthDate('')
    setBirthPlace('')
    setFiscalCode('')
    setAddress('')
    setZipCode('')
    setProvince('')
    setCity('')
    setGender('')
    setPhone('')
    setEmail('')
  }

  const onPopulate = () => {
    setName('Mario')
    setLastName('Verdi')
    setBirthDate('10/11/1992')
    setBirthPlace('Milano')
    setFiscalCode('MRAVRD92E10E783P')
    setAddress('Via delle grazie,15')
    setZipCode('54201')
    setProvince('MI')
    setCity('Milano')
    setGender('M')
    setPhone('33348859961')
    setEmail('mra.vrd@yahoo.it')
  }

  const setForm = (member : IMember) => {
    setName(member.name)
    setLastName(member.last_name)
    // setBirthDate(new Date(member.birth_date).toDateString())
    setBirthDate(dateUtils.formatDateToLocale(member.birth_date))
    setBirthPlace(member.birth_place)
    setFiscalCode(member.fiscal_code)
    setAddress(member.address)
    setZipCode(member.zip_code)
    setProvince(member.province)
    setCity(member.city)
    setGender(member.gender)
    setPhone(member.phone)
    setEmail(member.email)
  }

  const onClose = () => {
    resetForm()
    props.toggle()
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
    }

    if (props.member && '_id' in props.member) member._id = props.member._id

    props.onSave(member, [])

    onClose()
  }

  const genderOptions = [
    { key: 'M', value: 'M', text: 'M' },
    { key: 'F', value: 'F', text: 'F' }
  ]

  useEffect(() => {
    props.member && setForm(props.member)
  }, [props.member])

  useEffect(() => {
    tryToCalculateFiscalCode()
  }, [name, lastName, birthDate, birthPlace, gender])

  return (

            <>
                <div style={{ marginTop: '10px' }}>
                        <Form>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <Input
                                        fluid
                                        label="Cognome"
                                        value={lastName}
                                        onChange={e => onLastNameChange(e.target.value)}
                                        />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        fluid
                                        label="Nome"
                                        value={name}
                                        onChange={e => onNameChange(e.target.value)}
                                        />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <Input
                                        fluid
                                        label="Luogo di nascita"
                                        value={birthPlace}
                                        onChange={e => onBirthPlaceChange(e.target.value)}
                                        />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        label="Data di nascita"
                                        fluid
                                        placeholder="Format: GG/MM/YYYY"
                                        value={birthDate}
                                        onChange={e => onBirthDateChange(e.target.value)}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <Select
                                        value={gender}
                                        options={genderOptions}
                                        onChange={(e, data) => onGenderChange(data.value as string)} />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        fluid
                                        label="Codice Fiscale"
                                        value={fiscalCode}
                                        onChange={e => onFiscalCodeChange(e.target.value)}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <Input
                                        fluid
                                        label="Indirizzo"
                                        value={address}
                                        onChange={e => onAddressChange(e.target.value)}
                                        />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        fluid
                                        label="CAP"
                                        value={zipCode}
                                        maxLength={5}
                                        onChange={e => onZipCodeChange(e.target.value)}
                                        />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <Input
                                        fluid
                                        label="Città"
                                        value={city}
                                        onChange={e => onCityChange(e.target.value)}
                                        />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        fluid
                                        label="Provincia"
                                        maxLength={2}
                                        value={province}
                                        onChange={e => onProvinceChange(e.target.value)}
                                        />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <Input
                                        fluid
                                        label="Telefono"
                                        value={phone}
                                        onChange={e => onPhoneChange(e.target.value)}
                                        />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        fluid
                                        label="Email"
                                        value={email}
                                        onChange={e => onEmailChange(e.target.value)}
                                        />
                                </Form.Field>
                            </Form.Group>
                        </Form>
                        {/* <InputLabel className={classes.selectField} id="gender-select-id">Sesso</InputLabel>
                        <Select
                            labelId="gender-select-id"
                            value={gender}
                            onChange={onGenderChange}
                            className={classes.selectField}
                            >
                                <MenuItem value="M">M</MenuItem>
                                <MenuItem value="F">F</MenuItem>
                        </Select> */}
                </div>
                <div>
                    <hr/>
                    <Button
                        primary
                        id="idDiscardButton"
                        onClick={onClose}
                    >Annulla
                    </Button>
                    {/* <Button id="idPopulatedButton" variant="contained" color="secondary" onClick={onPopulate}>Popola</Button> */}
                    <Button
                        id="idSaveButton"
                        onClick={onSave}
                        style={{ float: 'right' }}
                    >Salva</Button>
                </div>
            </>
  )
}

export default MemberPersonalDataFormComponent
