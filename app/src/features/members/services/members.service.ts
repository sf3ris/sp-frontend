import axios from 'axios';
import { IMember } from '../models/IMember';
import qs, { stringify } from 'querystring';
import {store} from '../../../core/store';
import { request } from '../../../core/request/request';
import { IMembership } from '../../memberships/models/membership';
import { dateUtils } from '../../../utils/dateUtils';
 
const getMembers = async ( ) : Promise<IMember[]> => {

    const host = process.env.REACT_APP_MEMBERS_SP_HOST || '';

    return new Promise( async (resolve,reject) => {

        try{

            const endpoint = `/members`;

            const response = await request<IMember[]>( host, { url: endpoint })

            resolve(response.data);

        }
        catch(e) { 

            reject(e.response) 

        }

    })

}

const getPDF = async ( columns : string[] ) : Promise<{data : string}> => {

    const host = process.env.REACT_APP_MEMBERS_SP_HOST || '';

    const user = store.getState().userState;

    return new Promise( async (resolve,reject) => {

        try{

            const endpoint = `/members?${qs.stringify({format:'pdf'})}&columns=${columns.join(',')}`;

            const response = await request<{data: string}>( host, { url: endpoint})

            resolve(response.data);

        }
        catch(e) { 

            reject(e.response) 

        }

    })

}

const postMember = async(
    member : Partial<Omit<IMember, "memberships"|"id">>,
    memberships: Omit<IMembership,"_id">[] = []
) => {

    const temporaryMemberships: {start_date: string, end_date: string}[] = memberships.map( membership => (
        {
            start_date: dateUtils.formatDateToServerFormat(membership.start_date), 
            end_date: dateUtils.formatDateToServerFormat(membership.end_date)
        }
    ));

    const host = process.env.REACT_APP_MEMBERS_SP_HOST || '';

    return new Promise( async (resolve,reject) => {

        try{

            const endpoint = `/members`;

            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            
            const response = await request<IMember>( host, { url: endpoint, method: 'POST', headers: config.headers, data: qs.stringify({...member, temporaryMemberships: JSON.stringify(temporaryMemberships)})});

            resolve(response.data);

        }
        catch(e) { 

            reject(e.response) 

        }

    })

}

const putMember = async ( member : Partial<Omit<IMember,"memberships">>) => {

    const host = process.env.REACT_APP_MEMBERS_SP_HOST || '';

    return new Promise( async (resolve,reject) => {

        try{

            const endpoint = `/members/${member._id}`;

            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            const response = await request<IMember>( host, { url: endpoint, method:'PUT', headers: config.headers, data: qs.stringify({...member})});

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

            const endpoint = `/members/${member._id}`;

            const response = request<string>(host, { url: endpoint, method: 'DELETE' });

            resolve(response);

        }
        catch(e) { 

            reject(e.response) 

        }

    })

}



export const membersService = { getMembers, postMember, putMember, deleteMember, getPDF };
