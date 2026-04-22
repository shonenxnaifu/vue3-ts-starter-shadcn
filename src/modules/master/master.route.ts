import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'

const Product: () => Promise<typeof import('@/modules/product/pages/MainPage.vue')> = () => import('@/modules/product/pages/MainPage.vue')
const User: () => Promise<typeof import('@/modules/master/user/pages/MainPage.vue')> = () => import('@/modules/master/user/pages/MainPage.vue')

export const masterRoutes: Array<RouteRecordRaw> = [
  {
    path: '',
    meta: {
      layout: AppLayout,
      pageName: 'Master',
    },
    children: [
      {
        path: '/master/product',
        meta: {
          layout: AppLayout,
          pageName: 'Product',
        },
        children: [
          {
            name: 'master-product',
            path: '',
            component: Product,
          },
        ],
      },
      {
        path: '/master/user',
        meta: {
          layout: AppLayout,
          pageName: 'User',
        },
        children: [
          {
            name: 'master-user',
            path: '',
            component: User,
          },
        ],
      },
    ],
  },
]
