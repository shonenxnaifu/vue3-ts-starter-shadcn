import type { AxiosError, AxiosResponse } from 'axios'
import Axios from 'axios'
import { useAuthStore } from '@/stores'

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

function responseHandler<T = unknown>(response: AxiosResponse<T>): AxiosResponse<T> {
  const contentType = response.headers['content-type']

  if (contentType && contentType.includes('application/json')) {
    const data = response.data

    // Type guard to check if data has the expected structure
    if (typeof data === 'object' && data !== null && 'success' in data) {
      const typedData = data as { success?: boolean; message?: string }

      if (typedData.success === false) {
        console.error('API operation failed:', typedData.message)
        throw new Error(typedData.message || 'Unknown error occurred')
      }

      // If we want to transform the response data while preserving the AxiosResponse structure,
      // we need to return a new AxiosResponse with the transformed data
      return {
        ...response,
        data: { ...data, message: typedData.message } as T
      }
    }
  }

  // return native axios response
  return response
}

function errorHandler(error: AxiosError): any {
  const authStore = useAuthStore()
  if (!error.response) {
    console.error('Error jaringan:', error.message)
    return Promise.reject(new Error('Error jaringan. Silakan coba lagi nanti.'))
  }

  const responseData = error.response.data

  if (
    typeof responseData === 'object'
    && responseData !== null
    && 'message' in responseData
    && typeof responseData.message === 'string'
  ) {
    const status: number = error.response.status

    switch (status) {
      case 400:
        console.error('Permintaan tidak valid:', responseData.message)
        return Promise.reject(new Error(`${responseData.message}`))
      case 401:
        console.error('Tidak diizinkan:', responseData.message)

        authStore.resetCredentials()

        window.location.href = '/login'

        return Promise.reject(new Error('Tidak diizinkan. Silakan login kembali.'))
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

  const token = authStore.cookies.get('token')
  const tokenOtp = authStore.tokenOtp

  if (token)
    config.headers.authorization = `Bearer ${token}`
  if (tokenOtp)
    config.headers.Authorization = `Bearer ${tokenOtp}`

  return config
}, errorHandler)

axios.interceptors.response.use(responseHandler, errorHandler)
