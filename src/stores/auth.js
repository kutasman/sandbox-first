import { defineStore } from 'pinia'
import axios from '../axios'
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null
  }),
  getters: {
    isAuth: (state) => !! state.user?.id
  },
  actions: {
    signIn(formState){
      console.log(formState)
    },
    logout(){
      localStorage.removeItem('authUser')
      this.user = null
    },
    signUp(formState){
      console.log(formState)
    },
    resetPasswordLink(email){
      console.log(email)
    },
    async me(){
      const authUser = JSON.parse(localStorage.getItem('authUser') ?? 'null')
      if (authUser){
        this.user = authUser
      }
      // return axios.get('http://localhost:3000/mock/user.json')
      //     .then(res => {
      //       this.user = res.data.data
      //     })
    },
    async checkUser(){
      if (!this.user){
        await this.me()
      }
    }
  }
})
