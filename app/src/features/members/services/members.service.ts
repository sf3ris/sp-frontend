import axios from 'axios';
import { IMember } from '../models/IMember';
 
const getMembers = async () : Promise<IMember[]> => {

    const host = process.env.REACT_APP_MEMBERS_SP_HOST || '';

    return new Promise( async (resolve,reject) => {

        try{

            const endpoint = host + `/members`;

            const response = await axios.get( endpoint );

            resolve(response.data);

        }
        catch(e) { 

            reject(e.response) 

        }

    })

}

const postMember = async ( member : Partial<IMember>) => {

    const host = process.env.REACT_APP_MEMBERS_SP_HOST || '';

    return new Promise( async (resolve,reject) => {

        try{

            const endpoint = host + `/members`;

            const response = await axios.post( endpoint, { ...member } );

            resolve(response.data);

        }
        catch(e) { 

            reject(e.response) 

        }

    })

}

export const membersService = { getMembers, postMember };