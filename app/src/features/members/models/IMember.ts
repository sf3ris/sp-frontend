import { IMembership } from '../../memberships/models/membership'

export interface IMember {
    _id : string;
    name : string;
    last_name : string;
    birth_date : string;
    birth_place : string;
    fiscal_code : string;
    address : string;
    zip_code : string;
    city : string;
    province : string;
    gender: string;
    phone : string;
    email : string;
    memberships : IMembership[],
    tutors?: string[]
}

export interface MemberHeader {
    value : string;
    label : string;
}

export const memberHeaders : MemberHeader[] = [
  {
    value: 'name',
    label: 'Nome'
  },
  {
    value: 'last_name',
    label: 'Cognome'
  },
  {
    value: 'birth_date',
    label: 'Data di nascita'
  },
  {
    value: 'birth_place',
    label: 'Luogo di nascita'
  },
  {
    value: 'fiscal_code',
    label: 'Codice Fiscale'
  },
  {
    value: 'address',
    label: 'Indirizzo'
  },
  {
    value: 'zip_code',
    label: 'CAP'
  },
  {
    value: 'city',
    label: 'Città'
  },
  {
    value: 'province',
    label: 'Provincia'
  },
  {
    value: 'gender',
    label: 'Sesso'
  },
  {
    value: 'phone',
    label: 'Telefono'
  },
  {
    value: 'email',
    label: 'Email'
  },
  {
    value: 'membership',
    label: 'Tesseramento'
  },
  {
    value: 'status',
    label: 'Stato'
  }
]

export interface IHeaderMap {
    header: string;
    value: string;
}
