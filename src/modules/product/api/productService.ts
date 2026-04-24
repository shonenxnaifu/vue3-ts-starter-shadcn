import type { AxiosResponse } from 'axios'
import type { ListProduct, Payload, Product } from '../types'
import { axiosBase } from '@/libs'

export function getListProduct(
  params?: {
    skip?: number
    limit?: number
    q?: string
  },
): Promise<ListProduct> {
  return axiosBase.get(
    `/products/search`,
    {
      params,
    },
  ).then((resp: AxiosResponse) => {
    return resp.data
  }).catch((e) => {
    throw new Error(e.message || 'Unknown error occurred')
  })
}

export function detailProduct(id: number | undefined): Promise<Product> {
  return axiosBase.get(`/products/${id}`)
    .then((resp: AxiosResponse) => {
      return resp.data
    })
    .catch((e) => {
      throw new Error(e.message || 'Unknown error occurred')
    })
}

export function addProduct(payload: Payload): Promise<Product> {
  return axiosBase.post(`/products/add`, payload)
    .then((resp: AxiosResponse) => {
      return resp.data
    })
    .catch((e) => {
      throw new Error(e.message || 'Unknown error occurred')
    })
}

export function updateProduct(payload: Payload, id: number): Promise<Product> {
  return axiosBase.put(`/products/${id}`, payload)
    .then((resp: AxiosResponse) => {
      return resp.data
    })
    .catch((e) => {
      throw new Error(e.message || 'Unknown error occurred')
    })
}

export function deleteProduct(id: number): Promise<Product> {
  return axiosBase.delete(`/products/${id}`)
    .then((resp: AxiosResponse) => {
      return resp.data
    })
    .catch((e) => {
      throw new Error(e.message || 'Unknown error occurred')
    })
}

export function getAllCategories(): Promise<Array<string>> {
  return axiosBase.get(`/products/category-list`)
    .then((resp: AxiosResponse) => {
      return resp.data
    })
    .catch((e) => {
      throw new Error(e.message || 'Unknown error occurred')
    })
}

export function getListProductByCategory(
  cat: string | undefined,
  params?: {
    skip?: number
    limit?: number
    sortBy?: string
    order?: string
    cat?: string
  },
): Promise<ListProduct> {
  return axiosBase.get(
    `/products/category/${cat}`,
    {
      params,
    },
  ).then((resp: AxiosResponse) => {
    return resp.data
  }).catch((e) => {
    throw new Error(e.message || 'Unknown error occurred')
  })
}
