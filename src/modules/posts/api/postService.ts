import type { AxiosResponse } from 'axios'
import type { Post, PostListResponse } from '@/modules/posts/types'
import { axios } from '@/libs/axios'

// GET all posts
export function getPosts(params?: { _page?: number, _limit?: number }): Promise<PostListResponse> {
  return axios.get('/posts', { params }).then((resp: AxiosResponse) => {
    const respData: PostListResponse = {
      data: resp.data,
      totalData: Number(resp.headers['x-total-count']),
    }
    return respData
  })
}
