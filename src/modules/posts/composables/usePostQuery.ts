import type { UseQueryReturnType } from '@tanstack/vue-query'
import type { Post, PostListResponse } from '@/modules/posts/types'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { getPosts } from '@/modules/posts/api/postService'

export function useGetPostQuery(params?: { _page?: number, _limit?: number }): UseQueryReturnType<Post[], Error> {
  return useQuery({
    queryKey: ['posts-infinite', params],
    queryFn: async () => {
      const respData = await getPosts(params)
      return respData
    },
    placeholderData: keepPreviousData,
  })
}
