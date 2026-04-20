import type { UseQueryReturnType } from '@tanstack/vue-query'
import type { AccountProfile } from '@/modules/account/types'
import { useQuery } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import { getAccountProfile } from '@/modules/account/api/accountService'

export function useAccountProfile(): UseQueryReturnType<AccountProfile, Error> {
  return useQuery({
    queryKey: ['account-profile'],
    queryFn: async () => {
      try {
        const respData = await getAccountProfile()
        return respData
      }
      catch (e: any) {
        toast.error(e.message)
      }
    },
    placeholderData: previousData => previousData,
  })
}
