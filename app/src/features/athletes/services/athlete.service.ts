import { request } from '../../../core/request/request'
import { IHeaderMap, IMember } from '../../members/models/IMember'
import qs from 'querystring'

const getAthletes = async () : Promise<IMember[]> => {
  const host = process.env.REACT_APP_MEMBERS_SP_HOST || ''

  return new Promise(async (resolve, reject) => {
    try {
      const endpoint = '/athletes'

      const response = await request<IMember[]>(host, { url: endpoint })

      resolve(response.data)
    } catch (e) {
      reject(e.response)
    }
  })
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

      const response = await request<IMember>(host, { url: endpoint, method: 'POST', headers: config.headers, data: qs.stringify({ ...athlete }) })

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

      const response = await request<IMember>(host, { url: endpoint, method: 'PUT', headers: config.headers, data: qs.stringify({ ...athlete }) })

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

export const athleteService = { getAthletes, postAthlete, putAthlete, deleteAthlete, importAthletes }
