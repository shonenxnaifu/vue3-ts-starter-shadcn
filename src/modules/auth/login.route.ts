import type { RouteRecordRaw } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'

const Login: () => Promise<typeof import('@/modules/auth/pages/Login.vue')> = () => import('@/modules/auth/pages/Login.vue')

export const authRoutes: Array<RouteRecordRaw> = [
  {
    name: 'login',
    path: '/auth/login',
    component: Login,
    meta: {
      layout: AuthLayout,
    },
  },
]
