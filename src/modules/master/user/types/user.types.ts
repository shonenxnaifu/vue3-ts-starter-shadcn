import type { BaseResponseList } from '@/types'

export interface checkboxType {
  status: string
  checked: boolean
  value?: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  age: number
  birthDate: string
  gender: string
  email: string
  phone: string
}

export interface Payload {
  firstName: string
  lastName: string
  age: number
  birthDate: string
  gender: string
  email: string
  phone: string
  password: string
}

export interface ListUser extends BaseResponseList {
  users: Array<User>
}
