import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'

const Product: () => Promise<typeof import('@/modules/product/pages/MainPage.vue')> = () => import('@/modules/product/pages/MainPage.vue')

export const productRoutes: Array<RouteRecordRaw> = [
  {
    path: '/product',
    meta: {
      layout: AppLayout,
      pageName: 'Product',
    },
    children: [
      {
        name: 'product',
        path: '',
        component: Product,
      },
    ],
  },
]
