import type { UseQueryReturnType } from '@tanstack/vue-query'
import type { PaginationState } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import type { PostListResponse } from '@/modules/posts/types'
import { useQuery } from '@tanstack/vue-query'
import { getPosts } from '@/modules/posts/api/postService'

export function usePaginationQuery(pagination: Ref<PaginationState>): UseQueryReturnType<PostListResponse, Error> {
  return useQuery({
    queryKey: ['posts-infinite', pagination],
    queryFn: async () => {
      const respData = await getPosts({
        _page: pagination.value.pageIndex + 1,
        _limit: pagination.value.pageSize,
      })
      return respData
    },
    placeholderData: previousData => previousData,
  })
}
