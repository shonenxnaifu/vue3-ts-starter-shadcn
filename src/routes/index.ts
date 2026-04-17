import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import { authRoutes } from '@/modules/auth/login.route'

import { dashboardRoutes } from '@/modules/dashboard/dashboard.route'
import { postsRoutes } from '@/modules/posts/posts.route'
import { usersRoutes } from '@/modules/users/users.route'

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    ...authRoutes,
    ...dashboardRoutes,
    {
      path: '/modules',
      name: 'modules',
      children: [...postsRoutes, ...usersRoutes],
    },
  ],
})

export default routes
