import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import { authRoutes } from '@/modules/auth/login.route'

import { dashboardRoutes } from '@/modules/dashboard/dashboard.route'
import { postsRoutes } from '@/modules/posts/posts.route'
import { usersRoutes } from '@/modules/users/users.route'
import { useAuthStore } from '@/stores'

const PageNotFound: () => Promise<typeof import('@/layouts/PageNotFound.vue')> = () => import('@/layouts/PageNotFound.vue')

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
    {
      name: 'notfound',
      path: '/:pathMatch(.*)*',
      component: PageNotFound,
    },
  ],
})

routes.beforeEach((to) => {
  const authStore = useAuthStore()
  const publicPages = ['/auth/login', '/auth/forgot-pass', '/auth/otp']
  const authRequired = !publicPages.includes(to.path)
  const isLoggedIn = !!authStore.getUser()

  if (authRequired && !isLoggedIn) {
    return '/auth/login'
  }
  else if ((to.path === '/auth/login' || to.path === '/') && isLoggedIn) {
    return '/dashboard'
  }
})

export default routes
