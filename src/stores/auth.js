import { defineStore } from 'pinia'
import axios from '../axios'
const LS_ACCESS_TOKEN_KEY = 'access_token'
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    init: false,
  }),
  getters: {
    isAuth: (state) => !! state.user?.id,
    isVerified: () => true //!! state.user?.email_verified_at
  },
  actions: {
    async signIn(vForm){
      // await this.getCsrfCookie()
      // await vForm.post('/login')
      const res = await vForm.post('/access-tokens')
      if (res.status === 200){
        localStorage.setItem(LS_ACCESS_TOKEN_KEY, res.data.access_token)
      }
    },
    async logout(){
      // await axios.post('/logout')
      localStorage.removeItem(LS_ACCESS_TOKEN_KEY)
      this.user = null
    },
    signUp(vForm){
      return vForm.post('/register')
    },
    resetPasswordLink(email){
      console.log(email)
    },
    async getCsrfCookie(){
      const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '')
      await axios.get(`${baseUrl}/sanctum/csrf-cookie`);
    },
    async me(){
      try {
        const res = await axios.get('/user')
        if (res.status === 200){
          this.user = res.data
        }
      } catch (e) {
        //
      }
    },
    async checkUser(){
      if (!this.user && !this.init){
        this.init = true
        await this.me()
      }
    }
  }
})
