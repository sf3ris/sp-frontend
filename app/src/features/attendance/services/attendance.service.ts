import { request } from "../../../core/request/request";
import qs from 'querystring';
import { dateUtils } from "../../../utils/dateUtils";
import { IAttendance } from "../models/IAttendance";

const host = process.env.REACT_APP_ATTENDANCE_SP_HOST || '';

const postAttendance = async (athletesIds: string[], membersIds: string[], date: Date, title: string): Promise<any> => {

    return new Promise( async (resolve,reject) => {

        try{
            const endpoint = `/attendances`;
            const response = await request<any>( 
                host, 
                {
                    url: endpoint,
                    method: 'POST',
                    data: qs.stringify({
                        athletes_ids: athletesIds.join(","),
                        members_ids: membersIds.join(","),
                        date: dateUtils.formatDateToServerFormat(date),
                        title
                    })
                }
            );

            resolve(response.data);
        }
        catch(e) { 
            reject(e.response) 
        }

    })

}

const putAttendance = async (
    attendanceId: number,
    athletesIds: string[],
    membersIds: string[],
    title: string
): Promise<any> => {

    return new Promise( async (resolve,reject) => {

        try{
            const endpoint = `/attendances/${attendanceId}`;
            const response = await request<any>( 
                host, 
                {
                    url: endpoint,
                    method: 'PUT',
                    data: qs.stringify({
                        athletes_ids: athletesIds.join(","),
                        members_ids: membersIds.join(","),
                        title: title
                    })
                }
            );

            resolve(response.data);
        }
        catch(e) { 
            reject(e.response) 
        }

    })

}

const getAttendances = async () : Promise<IAttendance[]> => {

    return new Promise( async (resolve,reject) => {

        try{
            const endpoint = `/attendances`;
            const response = await request<IAttendance[]>( 
                host, 
                {
                    url: endpoint,
                    method: 'GET',
                }
            );

            resolve(response.data);
        }
        catch(e) { 
            reject(e.response) 
        }

    })

}

const deleteAttendance = async (attendanceId: number): Promise<any> => {

    return new Promise( async (resolve,reject) => {

        try{
            const endpoint = `/attendances/${attendanceId}`;
            const response = await request<any>( 
                host, 
                {
                    url: endpoint,
                    method: 'DELETE'
                }
            );

            resolve(response.data);
        }
        catch(e) { 
            reject(e.response) 
        }

    })

}

export const attendanceService = {postAttendance, getAttendances, putAttendance, deleteAttendance};
