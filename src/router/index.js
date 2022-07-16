import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useAuthStore} from "../stores/auth";
import * as Guards from './guards'
import { Guest, Auth, Verified } from './guards'
import { RouterView } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    // always scroll to top
    return { top: 0, behavior: 'smooth'  }
  },
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
      meta: { guards: { Auth } },
      children: [
        {
          path: '',
          name: 'userAccount',
          component: () => import('@/views/UserAccount.vue'),
        },
        {
          path: 'games',
          name: 'userGames',
          component: () => import('@/views/UserGamesView.vue'),
        },
        {
          path: 'games/:id',
          name: 'userGamesEdit',
          component: () => import('@/views/UserGameEdit.vue'),
        },
        {
          path: 'games/:id/round',
          name: 'userGamesRound',
          component: () => import('@/views/UserGameRound.vue'),
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

  //init auth store
  const authStore = useAuthStore()
  await authStore.checkUser()

  //check guards
  const guards = Object.assign({}, ...(to.matched.map(item => item.meta.guards) || {}))
  if (guards) {
    for (const guardName in guards) {
      if (Guards[guardName]( next ) !== true) return
    }
  }

  next()
})

export default router