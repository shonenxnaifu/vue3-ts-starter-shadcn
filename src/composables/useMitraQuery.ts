import type { UseInfiniteQueryReturnType } from '@tanstack/vue-query'
import type { MitraListDropdownItem, MitraListDropdownResponse } from '@/api'
import type { SearchDropdownParams } from '@/types'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { getMitra } from '@/api'

interface DropdownItem {
  value: string
  label: string
}

export function useGetMitraQuery(params: SearchDropdownParams): UseInfiniteQueryReturnType<DropdownItem[], Error> {
  return useInfiniteQuery({
    queryKey: ['dropdown-mitra', params],
    queryFn: ({ pageParam = 1 }) => {
      return getMitra({ ...params, page: pageParam, size: '10' })
    },
    getNextPageParam: (lastPage, allPages) => {
      const data = (lastPage.data.content || []) as MitraListDropdownItem[]

      if (data.length < 10) {
        return undefined
      }

      return allPages.length + 1
    },
    select: (data) => {
      const flattenedContent = data.pages.flatMap((page: MitraListDropdownResponse) => {
        return (page.data.content || []) as MitraListDropdownItem[]
      })

      const mapped = flattenedContent.map(item => ({
        value: item.id,
        label: item.name,
      }))

      return [{ label: 'Pilih Mitra', value: '' }, ...mapped]
    },
    initialPageParam: 1,
  })
}
