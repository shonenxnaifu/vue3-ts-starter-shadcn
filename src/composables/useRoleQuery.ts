import type { UseInfiniteQueryReturnType } from '@tanstack/vue-query'
import type { RoleListDropdownItem, RoleListDropdownResponse } from '@/api'
import type { SearchDropdownParams } from '@/types'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { getRole } from '@/api'

interface DropdownItem {
  value: string
  label: string
}

export function useGetRoleQuery(params: SearchDropdownParams): UseInfiniteQueryReturnType<DropdownItem[], Error> {
  return useInfiniteQuery({
    queryKey: ['dropdown-role', params],
    queryFn: ({ pageParam = 1 }) => {
      return getRole({ ...params, page: pageParam, size: '10' })
    },
    getNextPageParam: (lastPage, allPages) => {
      const data = (lastPage.data.content || []) as RoleListDropdownItem[]

      if (data.length < 10) {
        return undefined
      }

      return allPages.length + 1
    },
    select: (data) => {
      const flattenedContent = data.pages.flatMap((page: RoleListDropdownResponse) => {
        return (page.data.content || []) as RoleListDropdownItem[]
      })

      const mapped = flattenedContent.map(item => ({
        value: item.id,
        label: item.name,
      }))

      return [{ label: 'Pilih Role', value: '' }, ...mapped]
    },
    initialPageParam: 1,
  })
}
