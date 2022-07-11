import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useAuthStore} from "../stores/auth";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage.vue')
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('@/views/SignUpPage.vue')
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      component: () => import('@/views/ResetPassword.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/404.vue'),
    },
  ]
})

/*Router*/
router.beforeEach(async (to, from, next ) => {
  window.scrollTo({ top: 0, behavior: 'smooth' })

  //init auth store
  const authStore = useAuthStore()
  await authStore.fetchUser()

  //check guards
  const meta = Object.assign({}, ...(to.matched.map(item => item.meta) || {}))
  const guards = meta.guards
  if (guards) {
    for (const guardName in guards) {
      if (Guards[guardName]( next ) !== true) return
    }
  }

  next()
})

export default router