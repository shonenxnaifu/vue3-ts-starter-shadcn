import type { RouteRecordRaw } from 'vue-router'
import { EmptyLayout } from '@/layouts'

const Dashboard: () => Promise<typeof import('@/modules/dashboard/pages/Dashboard.vue')> = () => import('@/modules/dashboard/pages/Dashboard.vue')

export const dashboardRoutes: Array<RouteRecordRaw> = [
  {
    name: 'dashboard',
    path: '/',
    component: Dashboard,
    meta: {
      layout: EmptyLayout,
    },
  },
]
