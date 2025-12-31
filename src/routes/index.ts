import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import { dashboardRoutes } from '@/modules/dashboard/dashboard.route'
import { postsRoutes } from '@/modules/posts/posts.route'

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    ...dashboardRoutes,
    ...postsRoutes,
  ],
})

export default routes
