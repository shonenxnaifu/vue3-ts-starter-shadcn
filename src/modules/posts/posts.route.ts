import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'

const PostsPage: () => Promise<typeof import('@/modules/posts/pages/MainPage.vue')> = () => import('@/modules/posts/pages/MainPage.vue')

export const postsRoutes: Array<RouteRecordRaw> = [
  {
    name: 'posts',
    path: '/posts',
    component: PostsPage,
    meta: {
      layout: AppLayout,
    },
  },
]
