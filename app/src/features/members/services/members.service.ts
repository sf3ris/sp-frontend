import axios from 'axios';
import { IMember } from '../models/IMember';
 
const getMembers = async () : Promise<IMember[]> => {

    const host = process.env.REACT_APP_MEMBERS_SP_HOST || '';

    return new Promise( async (resolve,reject) => {

        try{

            const endpoint = host + `/members`;

            console.log(endpoint,1);

            const response = await axios.get( endpoint );

            console.log(response);

            resolve(response.data);

        }
        catch(e) { 
            console.log(e);
            reject(e.response) 
        }

    })

}

export const membersService = { getMembers };