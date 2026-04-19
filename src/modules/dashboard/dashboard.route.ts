import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'

const Dashboard: () => Promise<typeof import('@/modules/dashboard/pages/MainPage.vue')> = () => import('@/modules/dashboard/pages/MainPage.vue')

export const dashboardRoutes: Array<RouteRecordRaw> = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
    meta: {
      layout: AppLayout,
      pageName: 'Dashboard',
    },
  },
]
