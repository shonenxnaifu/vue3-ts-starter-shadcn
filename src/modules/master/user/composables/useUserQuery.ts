import type { UseMutationReturnType, UseQueryReturnType } from '@tanstack/vue-query'
import type { PaginationState } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import type { ListUser, Payload, User } from '../types'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import { addUser, deleteUser, detailUser, getListUser, updateUser } from '@/modules/master/user/api/userService'

export function useListUser(
  pagination: Ref<PaginationState>,
  search?: Ref<string | undefined>,
): UseQueryReturnType<ListUser, Error> {
  return useQuery({
    queryKey: ['list-product', pagination, search],
    queryFn: async () => {
      try {
        const respData = await getListUser({
          limit: pagination.value.pageSize,
          skip: pagination.value.pageIndex * 10,
          q: search?.value,
        })
        return respData
      }
      catch (e: any) {
        toast.error(e.message)
      }
    },
    placeholderData: previousData => previousData,
  })
}

export function useAddUser(): UseMutationReturnType<User | undefined, Error, { payload: Payload }, unknown> {
  return useMutation({
    mutationFn: async ({ payload }) => {
      try {
        const respData = await addUser(payload)
        return respData
      }
      catch (e: any) {
        throw new Error(e.message || 'Unknown error occurred')
      }
    },
  })
}

export function useDetailUser(): UseMutationReturnType<User | undefined, Error, { id: number }, unknown> {
  return useMutation({
    mutationFn: async ({ id }) => {
      try {
        const respData = await detailUser(id)
        return respData
      }
      catch (e: any) {
        throw new Error(e.message || 'Unknown error occurred')
      }
    },
  })
}

export function useEditUser(): UseMutationReturnType<User | undefined, Error, { payload: Payload, id: number }, unknown> {
  return useMutation({
    mutationFn: async ({ payload, id }) => {
      try {
        const respData = await updateUser(payload, id)
        return respData
      }
      catch (e: any) {
        throw new Error(e.message || 'Unknown error occurred')
      }
    },
  })
}

export function useDeleteUser(): UseMutationReturnType<User | undefined, Error, { id: number }, unknown> {
  return useMutation({
    mutationFn: async ({ id }) => {
      try {
        const respData = await deleteUser(id)
        return respData
      }
      catch (e: any) {
        throw new Error(e.message || 'Unknown error occurred')
      }
    },
  })
}
