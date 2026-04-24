import type { UseMutationReturnType, UseQueryReturnType } from '@tanstack/vue-query'
import type { PaginationState } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import type { ListProduct, Payload, Product } from '@/modules/product/types'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import { addProduct, deleteProduct, detailProduct, getAllCategories, getListProduct, getListProductByCategory, updateProduct } from '@/modules/product/api/productService'

export function useListProduct(
  pagination: Ref<PaginationState>,
  search?: Ref<string | undefined>,
): UseQueryReturnType<ListProduct, Error> {
  return useQuery({
    queryKey: ['list-product', pagination, search],
    queryFn: async () => {
      try {
        const respData = await getListProduct({
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

export function useAddProduct(): UseMutationReturnType<Product | undefined, Error, { payload: Payload }, unknown> {
  return useMutation({
    mutationFn: async ({ payload }) => {
      try {
        const respData = await addProduct(payload)
        return respData
      }
      catch (e: any) {
        throw new Error(e.message || 'Unknown error occurred')
      }
    },
  })
}

export function useListAllCategories(): UseQueryReturnType<Array<string>, Error> {
  return useQuery({
    queryKey: ['list-categories'],
    queryFn: async () => {
      try {
        const respData = await getAllCategories()
        return respData
      }
      catch (e: any) {
        toast.error(e.message)
      }
    },
    placeholderData: previousData => previousData,
  })
}

export function useDetailProduct(): UseMutationReturnType<Product | undefined, Error, { id: number }, unknown> {
  return useMutation({
    mutationFn: async ({ id }) => {
      try {
        const respData = await detailProduct(id)
        return respData
      }
      catch (e: any) {
        throw new Error(e.message || 'Unknown error occurred')
      }
    },
  })
}

export function useEditProduct(): UseMutationReturnType<Product | undefined, Error, { payload: Payload, id: number }, unknown> {
  return useMutation({
    mutationFn: async ({ payload, id }) => {
      try {
        const respData = await updateProduct(payload, id)
        return respData
      }
      catch (e: any) {
        throw new Error(e.message || 'Unknown error occurred')
      }
    },
  })
}

export function useDeleteProduct(): UseMutationReturnType<Product | undefined, Error, { id: number }, unknown> {
  return useMutation({
    mutationFn: async ({ id }) => {
      try {
        const respData = await deleteProduct(id)
        return respData
      }
      catch (e: any) {
        throw new Error(e.message || 'Unknown error occurred')
      }
    },
  })
}

export function useListProductByCategory(
  cat: string,
  pagination: Ref<PaginationState>,
): UseQueryReturnType<ListProduct, Error> {
  return useQuery({
    queryKey: ['list-product-by-cat', pagination, cat],
    queryFn: async () => {
      try {
        const respData = await getListProductByCategory(cat, {
          limit: pagination.value.pageSize,
          skip: pagination.value.pageIndex * 10,
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

export function useListProductByFilterCat(
  sortBy: string,
  orderBy: 'asc' | 'desc',
  cat?: Ref<string | undefined>,
): UseQueryReturnType<ListProduct, Error> {
  return useQuery({
    queryKey: ['list-product-by-filter-cat', sortBy, orderBy, cat],
    queryFn: async () => {
      try {
        const respData = await getListProductByCategory(cat?.value, {
          limit: 5,
          skip: 0,
          sortBy,
          order: orderBy,
        })
        return respData
      }
      catch (e: any) {
        toast.error(e.message)
      }
    },
    enabled: () => cat?.value !== undefined,
    placeholderData: previousData => previousData,
  })
}
