import { IMember } from "../../members/models/IMember";
import { IMembership } from "../models/membership";
import Axios from "axios";
import qs from 'querystring'
import { dateUtils } from "../../../utils/dateUtils";
import { request } from "../../../core/request/request";

export const addMembership =  async ( member : IMember, membership: IMembership ) : Promise<IMember> => {

    return new Promise( async (resolve,reject) => {

        try{

            const host      = process.env.REACT_APP_MEMBERS_SP_HOST || '';
            const endpoint  = host + `/members/${member._id}/memberships`;

            const response = await request<IMember>( host, {url: endpoint, method:'POST', data: qs.stringify(
                {
                    start_date : dateUtils.formatDateToServerFormat(membership.start_date),
                    end_date : dateUtils.formatDateToServerFormat( membership.end_date)
                })
            })

            resolve(response.data)

        }
        catch(e) { reject(e.responsne) }

    })

}

export const membershipService = { addMembership };