import type { AxiosResponse } from 'axios'
import type { PostListResponse } from '@/modules/posts/types'
import { axiosBase } from '@/libs/axios-instances'

// GET all posts
export function getPosts(params?: { _page?: number, _limit?: number }): Promise<PostListResponse> {
  return axiosBase.get('/posts', { params }).then((resp: AxiosResponse) => {
    const respData: PostListResponse = {
      data: resp.data,
      totalData: Number(resp.headers['x-total-count']),
    }
    return respData
  })
}
