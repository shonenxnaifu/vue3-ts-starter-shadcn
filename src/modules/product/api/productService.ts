import type { AxiosResponse } from 'axios'
import type { ListProduct } from '../types'
import { axiosBase } from '@/libs'

export function getListProduct(
  params?: {
    skip?: number
    limit?: number
    q?: string
  },
): Promise<ListProduct> {
  return axiosBase.get(
    `/products`,
    {
      params,
    },
  ).then((resp: AxiosResponse) => {
    return resp.data
  }).catch((e) => {
    throw new Error(e.message || 'Unknown error occurred')
  })
}
