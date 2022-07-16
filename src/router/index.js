import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useAuthStore} from "../stores/auth";
import * as Guards from './guards'
import { Guest, Auth } from './guards'
import { RouterView } from 'vue-router'
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
      component: () => import('@/views/LoginView.vue'),
      meta: {guards: {Guest}}
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('@/views/SignUp.vue'),
      meta: {guards: {Guest}}
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      component: () => import('@/views/ResetPassword.vue')
    },
    {
      path: '/verify-email',
      name: 'verifyEmail',
      component: () => import('@/views/VerifyEmail.vue'),
      meta: {guards: {Auth}}
    },
    {
      path: '/user',
      component: RouterView,
      children: [
        {
          path: '',
          name: 'userAccount',
          component: () => import('@/views/UserAccount.vue'),
          meta: {guards: {Auth}},
        },
        {
          path: 'games',
          name: 'userGames',
          component: () => import('@/views/UserGamesView.vue'),
          meta: {guards: {Auth}},
        },
        {
          path: 'games/:id',
          name: 'userGameEdit',
          component: () => import('@/views/UserGameEdit.vue'),
          meta: {guards: {Auth}},
        },
        {
          path: 'games/:id/round',
          name: 'userGameRound',
          component: () => import('@/views/UserGameRound.vue'),
          meta: {guards: {Auth}},
        },
      ],
    },
    {
      path: '/palette',
      name: 'testPalette',
      component: () => import('../views/PaletteTester.vue')
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
  await authStore.checkUser()

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