import type { Auth } from '@/modules/auth/types'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { refreshToken } from '@/modules/auth/api/authService'

export const useAuthStore = defineStore('auth', () => {
  const userLocalStorage = useLocalStorage<Auth | null>('user_cred', null, {
    serializer: {
      read: value => (value ? JSON.parse(value) : null),
      write: value => JSON.stringify(value),
    },
  })

  const _isRefreshing = ref(false)
  const _failedRequests: Array<() => void> = []

  function getUser(): Auth | null {
    return userLocalStorage.value
  }

  function setUser(newUser: Auth): void {
    userLocalStorage.value = newUser
  }

  function resetUser(): void {
    userLocalStorage.value = null
  }

  function addFailedRequest(callback: () => void): void {
    _failedRequests.push(callback)
  }

  async function refreshAccessToken(): Promise<void> {
    const user = getUser()
    if (!user?.refresh_token) {
      resetUser()
      throw new Error('No refresh token available')
    }

    _isRefreshing.value = true
    try {
      const response = await refreshToken(user.refresh_token)
      setUser({
        ...user,
        token: response.data.token,
        refresh_token: response.data.refresh_token,
      })
      _failedRequests.forEach(cb => cb())
      _failedRequests.length = 0
    }
    finally {
      _isRefreshing.value = false
    }
  }

  return {
    userLocalStorage,
    setUser,
    resetUser,
    getUser,
    _isRefreshing,
    _failedRequests,
    addFailedRequest,
    refreshAccessToken,
  }
})
