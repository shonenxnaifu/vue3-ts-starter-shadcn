import type { UseMutationReturnType } from '@tanstack/vue-query'
import type { Auth } from '@/modules/auth/types'
import type { ResponseApi } from '@/types'
import { useMutation } from '@tanstack/vue-query'
import { loginDefault, logoutDefault } from '@/modules/auth/api/authService'

export function useLogin(): UseMutationReturnType<ResponseApi<Auth> | undefined, Error, { email: string, password: string }, unknown> {
  return useMutation({
    mutationFn: async (params: { email: string, password: string }) => {
      try {
        const respData = await loginDefault(params)
        return respData
      }
      catch (e: any) {
        throw new Error(e.message || 'Unknown error occurred')
      }
    },
  })
}

export function useLogout(): UseMutationReturnType<ResponseApi<Auth> | undefined, Error, unknown, unknown> {
  return useMutation({
    mutationFn: async () => {
      try {
        const respData = await logoutDefault()
        return respData
      }
      catch (e: any) {
        throw new Error(e.message || 'Unknown error occurred')
      }
    },
  })
}
