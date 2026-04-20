import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'

const Account: () => Promise<typeof import('@/modules/account/pages/MainPage.vue')> = () => import('@/modules/account/pages/MainPage.vue')

export const accountRoutes: Array<RouteRecordRaw> = [
  {
    path: '/account',
    meta: {
      layout: AppLayout,
      pageName: 'Account',
    },
    children: [
      {
        name: 'account',
        path: '',
        component: Account,
      },
    ],
  },
]
