import { IToken } from "../model/IToken";
import Axios from "axios";

import qs from 'querystring';

const login = ( username : string, password : string ) : Promise<IToken> => {

    return new Promise( async (resolve,reject) => {

        const host      = process.env.REACT_APP_AUTH_HOST;
        const endpoint  = host + `/token`;

        const body = {
            username : username,
            password : password,
            client_id : process.env.REACT_APP_CLIENT_ID || '', 
            client_secret : process.env.REACT_APP_CLIENT_SECRET || '',
            grant_type : 'password'
        };
        
        try{

            const response = await Axios.post<IToken>( endpoint, qs.stringify(body));

            resolve(response.data);

        }
        catch( e ) {
    
            reject(e.response);
    
        }


    })

}

export const authService = { login };