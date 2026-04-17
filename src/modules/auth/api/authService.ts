import type { AxiosResponse } from 'axios'
import type { Auth } from '../types'
import type { ResponseApi } from '@/types'
import { axiosMitra } from '@/libs/axios-instances'

export function loginDefault({ email, password }: { email: string, password: string }): Promise<ResponseApi<Auth>> {
  return axiosMitra.post('/mitra/api/v1/auth/login', { email, password })
    .then((resp: AxiosResponse) => {
      return resp.data
    })
    .catch((e) => {
      throw new Error(e.message || 'Unknown error occurred')
    })
}

export function logoutDefault(): Promise<ResponseApi<Auth>> {
  return axiosMitra.post('/mitra/api/v1/auth/logout', {})
    .then((resp: AxiosResponse) => {
      return resp.data
    })
    .catch((e) => {
      throw new Error(e.message || 'Unknown error occurred')
    })
}

export function refreshToken(refreshToken: string): Promise<ResponseApi<Auth>> {
  return axiosMitra.post('/mitra/api/v1/auth/refresh', { refresh_token: refreshToken })
    .then((resp: AxiosResponse) => {
      return resp.data
    })
    .catch((e) => {
      throw new Error(e.message || 'Unknown error occurred')
    })
}
