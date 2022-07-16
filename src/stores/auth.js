import { defineStore } from 'pinia'
import axios from '../axios'
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    init: false,
  }),
  getters: {
    isAuth: (state) => !! state.user?.id,
    isVerified: state => !! state.user?.email_verified_at
  },
  actions: {
    async signIn(formState){
      await this.getCsrfCookie()
      await axios.post('/login', formState)
    },
    async logout(){
      await axios.post('/logout')
      this.user = null
    },
    signUp(formState){
      console.log(formState)
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
