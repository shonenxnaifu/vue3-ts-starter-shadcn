import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'

const UsersPage: () => Promise<typeof import('@/modules/users/pages/MainPage.vue')> = () => import('@/modules/users/pages/MainPage.vue')

export const usersRoutes: Array<RouteRecordRaw> = [
  {
    name: 'users',
    path: '/users',
    component: UsersPage,
    meta: {
      layout: AppLayout,
    },
  },
]
