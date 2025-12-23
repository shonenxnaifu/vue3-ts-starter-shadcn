import type { Ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { logout } from '@/api'
import { useAuthStore } from '@/stores'

export interface OnLogoutOptions {
  onSuccess?: () => void
}

interface OnLogout {
  isLoading: Ref<boolean>
  handleLogout: (options?: OnLogoutOptions) => Promise<void>
}

export function useLogout(): OnLogout {
  const isLoading = ref(false)
  const authStore = useAuthStore()
  const router = useRouter()

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.replace({ name: 'login' })
      toast.success('Anda telah berhasil keluar dari aplikasi.')
      authStore.resetCredentials()
      authStore.resetUser()
    },
    onSettled: () => {
      isLoading.value = false
    },
  })

  async function handleLogout(options?: OnLogoutOptions): Promise<void> {
    isLoading.value = true
    mutate(undefined, options)
  }

  return { handleLogout, isLoading }
}
