import { IMember } from '../../members/models/IMember'
import { IMembership } from '../models/membership'
import qs from 'querystring'
import { dateUtils } from '../../../utils/dateUtils'
import { request } from '../../../core/request/request'
import { AxiosResponse } from 'axios'

export const addMembership = (
  member : IMember,
  membership: Omit<IMembership, '_id'>,
  type: 'athlete' | 'member'
) : Promise<AxiosResponse<IMember>> => {
  const host = process.env.REACT_APP_MEMBERS_SP_HOST || ''
  const endpoint = host + `/${type === 'athlete' ? 'athletes' : 'members'}/${member._id}/memberships`

  return request<IMember>(host, {
    url: endpoint,
    method: 'POST',
    data: qs.stringify(
      {
        start_date: dateUtils.formatDateToServerFormat(membership.start_date),
        end_date: dateUtils.formatDateToServerFormat(membership.end_date)
      })
  })
}

export const deleteMembership = (
  member : IMember,
  membership: IMembership,
  type: 'athlete' | 'member'
) : Promise<AxiosResponse<IMember>> => {
  const host = process.env.REACT_APP_MEMBERS_SP_HOST || ''
  const endpoint = host + `/${type === 'athlete' ? 'athletes' : 'members'}/${member._id}/memberships/${membership._id}`

  return request<IMember>(host, { url: endpoint, method: 'DELETE' })
}

export const membershipService = { addMembership, deleteMembership }
