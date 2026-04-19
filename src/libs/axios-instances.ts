import { createAxiosInstance } from './axios-factory'
import { createAxiosInstance as createInstanceCookies } from './axios-factory-cookies'

export const axiosMock = createAxiosInstance({
  baseURL: import.meta.env.VITE_APP_API_MOCK_BASE_URL,
})

export const axiosInternal = createAxiosInstance({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL_INTERNAL,
})

export const axiosMitra = createAxiosInstance({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL_MITRA,
})

export const axiosBase = createInstanceCookies({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
})
