import { useLocalStorage } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'
import { defineStore } from 'pinia'

interface User {
  name: string
  email: string
  phoneNumber: string
}

export const useAuthStore = defineStore('auth', () => {
  const cookies = useCookies()
  const token = cookies.get('token')
  const initialTokenOtp = localStorage.getItem('token-otp') || null

  const tokenOtp = useLocalStorage<string | null>('token-otp', initialTokenOtp)

  const user = useLocalStorage<User | null>('user', null, {
    serializer: {
      read: value => (value ? JSON.parse(value) : null),
      write: value => JSON.stringify(value),
    },
  })

  function setCredentials(tok: string): void {
    cookies.set('token', tok, {
      path: '/',
      maxAge: 60 * 60 * 24,
      secure: true,
      sameSite: 'strict',
    })
  }

  function resetCredentials(): void {
    cookies.remove('token')
    token.value = null
  }

  function setUser(newUser: User): void {
    user.value = newUser
  }

  function resetUser(): void {
    user.value = null
  }

  function setTokenOtp(tok: string): void {
    tokenOtp.value = tok
  }

  function resetTokenOtp(): void {
    tokenOtp.value = null
  }

  return {
    cookies,
    token,
    user,
    setCredentials,
    resetCredentials,
    setUser,
    resetUser,
    tokenOtp,
    setTokenOtp,
    resetTokenOtp,
  }
})
