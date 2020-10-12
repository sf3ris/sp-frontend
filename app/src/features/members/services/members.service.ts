import axios from 'axios';
import { IMember } from '../models/IMember';
import qs from 'querystring';
import { dateUtils } from '../../../utils/dateUtils';
 
const getMembers = async ( ) : Promise<IMember[]> => {

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

const getPDF = async ( ) : Promise<{data : string}> => {

    const host = process.env.REACT_APP_MEMBERS_SP_HOST || '';

    return new Promise( async (resolve,reject) => {

        try{

            const endpoint = host + `/members?${qs.stringify({format:'pdf'})}`;

            const response = await axios.get<{data : string}>( endpoint );

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

            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            const response = await axios.post( endpoint, qs.stringify({...member }), config );

            resolve(response.data);

        }
        catch(e) { 

            reject(e.response) 

        }

    })

}

const putMember = async ( member : Partial<IMember>) => {

    const host = process.env.REACT_APP_MEMBERS_SP_HOST || '';

    return new Promise( async (resolve,reject) => {

        try{

            const endpoint = host + `/members/${member._id}`;

            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            const response = await axios.put( endpoint, qs.stringify({...member }), config );

            resolve(response.data);

        }
        catch(e) { 

            reject(e.response) 

        }

    })

}

const deleteMember = async ( member : IMember) => {

    const host = process.env.REACT_APP_MEMBERS_SP_HOST || '';

    return new Promise( async (resolve,reject) => {

        try{

            const endpoint = host + `/members/${member._id}`;

            const response = await axios.delete( endpoint );

            resolve(response.data);

        }
        catch(e) { 

            reject(e.response) 

        }

    })

}



export const membersService = { getMembers, postMember, putMember, deleteMember, getPDF };