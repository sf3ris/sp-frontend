import { request } from '../../../core/request/request'
import { IHeaderMap, IMember } from '../../members/models/IMember'
import qs from 'querystring'
import { AxiosResponse } from 'axios'
import { dateUtils } from '../../../utils/dateUtils'

const getAthletes = async (
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
  const endpoint = '/athletes?' + qs.stringify(qsObject)

  return await request<IMember[]>(host, { url: endpoint })
}

const postAthlete = async (athlete : Partial<Omit<IMember, 'memberships'|'id'>>) => {
  const host = process.env.REACT_APP_MEMBERS_SP_HOST || ''
  return new Promise(async (resolve, reject) => {
    try {
      const endpoint = '/athletes'

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
            ...athlete,
            birth_date: dateUtils.formatLocaleDatetoServerdate(athlete.birth_date!!)
          })
        }
      )

      resolve(response.data)
    } catch (e) {
      reject(e.response)
    }
  })
}

const putAthlete = async (athlete : Partial<Omit<IMember, 'memberships'>>) => {
  const host = process.env.REACT_APP_MEMBERS_SP_HOST || ''

  return new Promise(async (resolve, reject) => {
    try {
      const endpoint = `/athletes/${athlete._id}`

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      const response = await request<IMember>(host,
        {
          url: endpoint,
          method: 'PUT',
          headers: config.headers,
          data: qs.stringify({
            ...athlete,
            birth_date: dateUtils.formatLocaleDatetoServerdate(athlete.birth_date!!)
          })
        }
      )

      resolve(response.data)
    } catch (e) {
      reject(e.response)
    }
  })
}

const deleteAthlete = async (athlete : IMember) => {
  const host = process.env.REACT_APP_MEMBERS_SP_HOST || ''

  return new Promise(async (resolve, reject) => {
    try {
      const endpoint = `/athletes/${athlete._id}`

      const response = request<string>(host, { url: endpoint, method: 'DELETE' })

      resolve(response)
    } catch (e) {
      reject(e.response)
    }
  })
}

const getPDF = async (columns : string[], nameFilter: string, lastNameFilter: string, fiscalCodeFilter: string, statusFilter: boolean|undefined) : Promise<{data : string}> => {
  const host = process.env.REACT_APP_MEMBERS_SP_HOST || ''

  return new Promise(async (resolve, reject) => {
    try {
      const qsObject = {
        format: 'pdf',
        name: nameFilter,
        lastName: lastNameFilter,
        fiscalCode: fiscalCodeFilter,
        status: statusFilter
      }
      const endpoint = `/athletes?${qs.stringify(qsObject)}&columns=${columns.join(',')}`

      const response = await request<{data: string}>(host, { url: endpoint })

      resolve(response.data)
    } catch (e) {
      reject(e.response)
    }
  })
}

const importAthletes = (file: File, headers: IHeaderMap[], headerRow: string) => {
  const host = process.env.REACT_APP_MEMBERS_SP_HOST || ''
  const endpoint = '/bulk/athletes'

  const body = new FormData()
  body.append('athletes', file)
  body.append('header_row', headerRow)
  headers.forEach(header => body.append(header.header, header.value))

  return request(host, {
    url: endpoint,
    method: 'POST',
    data: body
  })
}

export const athleteService = { getAthletes, postAthlete, putAthlete, deleteAthlete, importAthletes, getPDF }
