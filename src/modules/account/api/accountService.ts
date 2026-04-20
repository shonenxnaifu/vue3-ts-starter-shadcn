import type { AxiosResponse } from 'axios'
import type { AccountProfile } from '../types'
import { axiosBase } from '@/libs'

export function getAccountProfile(): Promise<AccountProfile> {
  return axiosBase.get(
    `/auth/me`,
    { withCredentials: true },
  ).then((resp: AxiosResponse) => {
    return resp.data
  }).catch((e) => {
    throw new Error(e.message || 'Unknown error occurred')
  })
}
