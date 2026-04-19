import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ResponseApi } from '@/types'
import Axios from 'axios'
import { useAuthStore } from '@/stores'

interface CreateAxiosOptions {
  baseURL: string
}

// factory function to create axios instance
export function createAxiosInstance(option: CreateAxiosOptions): AxiosInstance {
  const retriedRequests = new WeakMap<AxiosRequestConfig, boolean>()
  const { baseURL } = option

  const axios = Axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  function responseHandler(response: AxiosResponse<ResponseApi>): AxiosResponse<ResponseApi> {
    const contentType = response.headers['content-type']

    if (contentType && contentType.includes('application/json')) {
      const data: ResponseApi = response.data

      if (data.code !== '200' && data.code !== '00') {
        console.error('API operation failed:', data.message)
        throw new Error(data.message || 'Unknown error occurred')
      }

      return {
        ...response,
        data,
      }
    }

    return response
  }

  function errorHandler(error: AxiosError): any {
    const authStore = useAuthStore()

    if (!error.response) {
      console.error('Error jaringan:', error.message)
      return Promise.reject(new Error('Error jaringan. Silakan coba lagi nanti.'))
    }

    const responseData = error.response.data
    const status: number = error.response.status

    if (
      typeof responseData === 'object'
      && responseData !== null
      && 'message' in responseData
      && typeof responseData.message === 'string'
    ) {
      if (status === 401 && responseData.message.includes('expired token') && error.config && !retriedRequests.has(error.config)) {
        const config = error.config

        return new Promise((resolve) => {
          if (!authStore._isRefreshing) {
            retriedRequests.set(config, true)

            authStore.refreshAccessToken()
              .then(() => {
                const user = authStore.getUser()
                if (user) {
                  config.headers!.authorization = `Bearer ${user.accessToken}`
                  resolve(axios(config))
                }
              })
              .catch(() => {
                authStore.resetUser()
                if (typeof window !== 'undefined') {
                  window.location.href = '/login'
                }
                resolve(Promise.reject(error))
              })
          }
          else {
            authStore.addFailedRequest(() => {
              const user = authStore.getUser()
              if (user && error.config) {
                error.config.headers!.authorization = `Bearer ${user.accessToken}`
                resolve(axios(error.config))
              }
            })
          }
        })
      }

      switch (status) {
        case 400:
          console.error('Permintaan tidak valid:', responseData.message)
          return Promise.reject(new Error(`${responseData.message}`))
        case 401:
          if (error.config && retriedRequests.has(error.config)) {
            authStore.resetUser()
            if (typeof window !== 'undefined') {
              window.location.href = '/login'
            }
          }
          console.error('Auth error:', responseData.message)
          return Promise.reject(new Error(`Kesalahan autentikasi: ${responseData.message}`))
        case 409:
          console.error('Session error:', responseData.message)
          return Promise.reject(new Error(`Kesalahan autentikasi: ${responseData.message}`))
        case 500:
          console.error('Kesalahan server:', responseData.message)
          return Promise.reject(new Error(`Kesalahan server: ${responseData.message}`))
        default:
          console.error('Kesalahan server:', responseData.message)
          return Promise.reject(new Error('Kesalahan server. Silakan coba lagi nanti.'))
      }
    }
    else {
      console.error('Respon error tidak sesuai dengan struktur yang diharapkan:', responseData)
      return Promise.reject(new Error('Kesalahan dalam memproses respons server.'))
    }
  }

  axios.interceptors.request.use((config) => {
    const authStore = useAuthStore()

    const userCred = authStore.getUser()
    const token = userCred?.accessToken

    if (token && config.headers) {
      config.headers.authorization = `Bearer ${token}`
    }

    return config
  }, errorHandler)

  axios.interceptors.response.use(responseHandler, errorHandler)

  return axios
}
