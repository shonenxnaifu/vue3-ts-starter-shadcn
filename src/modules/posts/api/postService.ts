import type { Post, PostListResponse } from '@/modules/posts/types'
import { axios } from '@/libs/axios'

// GET all posts
export function getPosts(params?: { _page?: number, _limit?: number }): Promise<Post[]> {
  return axios.get<Post[]>('/posts', { params }).then((resp) => {
    return resp.data
  })
}
