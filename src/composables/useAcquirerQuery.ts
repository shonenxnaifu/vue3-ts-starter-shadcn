import type { UseInfiniteQueryReturnType } from '@tanstack/vue-query'
import type { AcquirerListDropdownItem, AcquirerListDropdownResponse } from '@/api'
import type { SearchDropdownParams } from '@/types'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { getAcquirer } from '@/api'

interface DropdownItem {
  value: string
  label: string
}

export function useGetAcquirerQuery(params: SearchDropdownParams): UseInfiniteQueryReturnType<DropdownItem[], Error> {
  return useInfiniteQuery({
    queryKey: ['dropdown-acquirer', params],
    queryFn: ({ pageParam = 1 }) => {
      return getAcquirer({ ...params, page: pageParam, size: '10' })
    },
    getNextPageParam: (lastPage, allPages) => {
      const data = (lastPage.data.content || []) as AcquirerListDropdownItem[]

      if (data.length < 10) {
        return undefined
      }

      return allPages.length + 1
    },
    select: (data) => {
      const flattenedContent = data.pages.flatMap((page: AcquirerListDropdownResponse) => {
        return (page.data.content || []) as AcquirerListDropdownItem[]
      })

      const mapped = flattenedContent.map(item => ({
        value: item.id,
        label: item.name,
      }))

      return [{ label: 'Pilih Acquirer', value: '' }, ...mapped]
    },
    initialPageParam: 1,
  })
}
