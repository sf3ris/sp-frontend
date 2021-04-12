import { AxiosResponse } from 'axios'
import { ISettings } from '../interfaces/ISettings'
import { request } from '../../../core/request/request'

const SETTINGS_ENDPOINT = '/settings'

const getSettings = async () : Promise<AxiosResponse<ISettings>> => {
  const host = process.env.REACT_APP_SETTINGS_SP_HOST || ''

  return await request<ISettings>(host, { method: 'GET', url: SETTINGS_ENDPOINT })
}

const putSettings = async (settings: ISettings) : Promise<AxiosResponse<ISettings>> => {
  const host = process.env.REACT_APP_SETTINGS_SP_HOST || ''

  return await request<ISettings>(host, { method: 'PUT', url: SETTINGS_ENDPOINT, data: settings })
}

export const settingsService = { getSettings, putSettings }
