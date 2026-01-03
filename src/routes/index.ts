import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import { dashboardRoutes } from '@/modules/dashboard/dashboard.route'

import { postsRoutes } from '@/modules/posts/posts.route'
import { usersRoutes } from '@/modules/users/users.route'

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    ...dashboardRoutes,
    {
      path: '/modules',
      name: 'modules',
      children: [...postsRoutes, ...usersRoutes],
    },
  ],
})

export default routes
