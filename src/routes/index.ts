import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import { dashboardRoutes } from '@/modules/dashboard/dashboard.route'

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    ...dashboardRoutes,
  ],
})

export default routes
