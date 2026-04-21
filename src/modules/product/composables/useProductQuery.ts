import type { UseQueryReturnType } from '@tanstack/vue-query'
import type { PaginationState } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import type { ListProduct } from '@/modules/product/types'
import { useQuery } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import { getListProduct } from '@/modules/product/api/productService'

export function useListProduct(
  pagination: Ref<PaginationState>,
): UseQueryReturnType<ListProduct, Error> {
  return useQuery({
    queryKey: ['list-product', pagination],
    queryFn: async () => {
      try {
        const respData = await getListProduct({
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
