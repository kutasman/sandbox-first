import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
      path: '/next-page',
      name: 'next-page',
      component: () => import('@/views/NextPage.vue')
    }
  ]
})

export default router
