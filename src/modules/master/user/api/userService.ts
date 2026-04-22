import type { AxiosResponse } from 'axios'
import type { ListUser, Payload, User } from '../types'
import { axiosBase } from '@/libs'

export function getListUser(
  params?: {
    skip?: number
    limit?: number
    q?: string
  },
): Promise<ListUser> {
  return axiosBase.get(
    `/users/search`,
    {
      params,
    },
  ).then((resp: AxiosResponse) => {
    return resp.data
  }).catch((e) => {
    throw new Error(e.message || 'Unknown error occurred')
  })
}

export function detailUser(id: number | undefined): Promise<User> {
  return axiosBase.get(`/users/${id}`)
    .then((resp: AxiosResponse) => {
      return resp.data
    })
    .catch((e) => {
      throw new Error(e.message || 'Unknown error occurred')
    })
}

export function addUser(payload: Payload): Promise<User> {
  return axiosBase.post(`/users/add`, payload)
    .then((resp: AxiosResponse) => {
      return resp.data
    })
    .catch((e) => {
      throw new Error(e.message || 'Unknown error occurred')
    })
}

export function updateUser(payload: Payload, id: number): Promise<User> {
  return axiosBase.put(`/users/${id}`, payload)
    .then((resp: AxiosResponse) => {
      return resp.data
    })
    .catch((e) => {
      throw new Error(e.message || 'Unknown error occurred')
    })
}

export function deleteUser(id: number): Promise<User> {
  return axiosBase.delete(`/users/${id}`)
    .then((resp: AxiosResponse) => {
      return resp.data
    })
    .catch((e) => {
      throw new Error(e.message || 'Unknown error occurred')
    })
}
