import { IHeaderMap, IMember } from '../models/IMember'
import qs from 'querystring'
import { store } from '../../../core/store'
import { request } from '../../../core/request/request'
import { IMembership } from '../../memberships/models/membership'
import { dateUtils } from '../../../utils/dateUtils'
import { AxiosResponse } from 'axios'

const getMembers = async (
  name: string = '',
  lastName: string = '',
  fiscalCode: string = '',
  status: boolean|undefined = undefined
) : Promise<AxiosResponse<IMember[]>> => {
  const host = process.env.REACT_APP_MEMBERS_SP_HOST || ''

  const qsObject = {
    name,
    lastName,
    fiscalCode,
    status
  }
  const endpoint = '/members?' + qs.stringify(qsObject)

  return request<IMember[]>(host, { url: endpoint })
}

const getPDF = async (columns : string[], nameFilter: string, lastNameFilter: string, fiscalCodeFilter: string, statusFilter: boolean|undefined) : Promise<{data : string}> => {
  const host = process.env.REACT_APP_MEMBERS_SP_HOST || ''

  const user = store.getState().userState

  return new Promise(async (resolve, reject) => {
    try {
      const qsObject = {
        format: 'pdf',
        name: nameFilter,
        lastName: lastNameFilter,
        fiscalCode: fiscalCodeFilter,
        status: statusFilter
      }
      const endpoint = `/members?${qs.stringify(qsObject)}&columns=${columns.join(',')}`

      const response = await request<{data: string}>(host, { url: endpoint })

      resolve(response.data)
    } catch (e) {
      reject(e.response)
    }
  })
}

const postMember = async (
  member : Partial<Omit<IMember, 'memberships'|'id'>>,
  memberships: Omit<IMembership, '_id'>[] = []
) => {
  const temporaryMemberships: {start_date: string, end_date: string}[] = memberships.map(membership => (
    {
      start_date: dateUtils.formatDateToServerFormat(membership.start_date),
      end_date: dateUtils.formatDateToServerFormat(membership.end_date)
    }
  ))

  const host = process.env.REACT_APP_MEMBERS_SP_HOST || ''

  return new Promise(async (resolve, reject) => {
    try {
      const endpoint = '/members'

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      const response = await request<IMember>(
        host,
        {
          url: endpoint,
          method: 'POST',
          headers: config.headers,
          data: qs.stringify({
            ...member,
            birth_date: dateUtils.formatLocaleDatetoServerdate(member.birth_date!!),
            temporaryMemberships: JSON.stringify(temporaryMemberships)
          })
        })

      resolve(response.data)
    } catch (e) {
      reject(e.response)
    }
  })
}

const putMember = async (member : Partial<Omit<IMember, 'memberships'>>) => {
  const host = process.env.REACT_APP_MEMBERS_SP_HOST || ''

  return new Promise(async (resolve, reject) => {
    try {
      const endpoint = `/members/${member._id}`

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      const response = await request<IMember>(
        host, {
          url: endpoint,
          method: 'PUT',
          headers: config.headers,
          data: qs.stringify({ ...member, birth_date: dateUtils.formatLocaleDatetoServerdate(member.birth_date!!) })
        })

      resolve(response.data)
    } catch (e) {
      reject(e.response)
    }
  })
}

const deleteMember = async (member : IMember) => {
  const host = process.env.REACT_APP_MEMBERS_SP_HOST || ''

  return new Promise(async (resolve, reject) => {
    try {
      const endpoint = `/members/${member._id}`
      const response = request<string>(host, { url: endpoint, method: 'DELETE' })
      resolve(response)
    } catch (e) {
      reject(e.response)
    }
  })
}

const importMembers = (file: File, headers: IHeaderMap[]) => {
  const host = process.env.REACT_APP_MEMBERS_SP_HOST || ''
  const endpoint = '/bulk/members'

  const body = new FormData()
  body.append('members', file)
  headers.forEach(header => body.append(header.header, header.value))

  return request(host, {
    url: endpoint,
    method: 'POST',
    data: body
  })
}

export const membersService = { getMembers, postMember, putMember, deleteMember, getPDF, importMembers }
