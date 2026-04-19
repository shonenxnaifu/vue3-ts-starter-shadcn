import type { AxiosResponse } from 'axios'
import type { Auth } from '../types'
import { axiosBase } from '@/libs/axios-instances'

export function loginDefault({ username, password }: { username: string, password: string }): Promise<Auth> {
  return axiosBase.post(
    '/auth/login',
    { username, password },
    { withCredentials: true },
  )
    .then((resp: AxiosResponse) => {
      return resp.data
    })
    .catch((e) => {
      throw new Error(e.message || 'Unknown error occurred')
    })
}

export function logoutDefault(): Promise<Auth> {
  return axiosBase.post('/auth/logout', {})
    .then((resp: AxiosResponse) => {
      return resp.data
    })
    .catch((e) => {
      throw new Error(e.message || 'Unknown error occurred')
    })
}

export function refreshToken(refreshToken: string): Promise<Auth> {
  return axiosBase.post(
    '/auth/refresh',
    { refreshToken },
    { withCredentials: true },
  )
    .then((resp: AxiosResponse) => {
      return resp.data
    })
    .catch((e) => {
      throw new Error(e.message || 'Unknown error occurred')
    })
}
