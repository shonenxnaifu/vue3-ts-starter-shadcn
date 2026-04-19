import type { UseMutationReturnType } from '@tanstack/vue-query'
import type { Auth } from '@/modules/auth/types'
import { useMutation } from '@tanstack/vue-query'
import { loginDefault, logoutDefault } from '@/modules/auth/api/authService'

export function useLogin(): UseMutationReturnType<Auth | undefined, Error, { username: string, password: string }, unknown> {
  return useMutation({
    mutationFn: async (params: { username: string, password: string }) => {
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

export function useLogout(): UseMutationReturnType<Auth | undefined, Error, unknown, unknown> {
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
