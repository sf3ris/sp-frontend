import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { store } from '../store'
import { logout } from '../../shared/user/slices/userSlices'

export const request = <T>(host : string, options : AxiosRequestConfig) : Promise<AxiosResponse<T>> => {
  const user = store.getState().userState

  const dispatch = store.dispatch

  const client = Axios.create({
    baseURL: host
  })

  client.interceptors.response.use(
    success => onSuccess(success),
    async err => {
      if (err.response.status === 401) {
        dispatch(logout(null))
      }
    }
  )

  const onSuccess = (response : AxiosResponse) => {
    return Promise.resolve(response)
  }

  const onError = (error : AxiosError) => Promise.reject(error)

  const url = options.url || ''
  const headers = options.headers || {}
  const data = options.data || {}

  headers.Authorization = `Bearer ${user.user?.token.access_token}`

  switch (options.method) {
    case ('POST'):
      return client.post(url, data, { headers })
        .then(onSuccess)
        .catch(onError)

    case ('DELETE'):
      return client.delete(url, { headers })
        .then(onSuccess)
        .catch(onError)

    case ('PUT'):
      return client.put(url, data, { headers })
        .then(onSuccess)
        .catch(onError)

    case ('PATCH'):
      return client.patch(url, data, { headers })
        .then(onSuccess)
        .catch(onError)

    default:
      return client.get(url, { headers })
        .then(onSuccess)
        .catch(onError)
  }
}
