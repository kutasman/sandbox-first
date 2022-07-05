import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: 0
  }),
  getters: {
    isAuth: (state) => !! state.user.id
  },
  actions: {
    signIn(formState){
      console.log(formState)
    },
    logout(){

    },
    signUp(formState){
      console.log(formState)
    },
    resetPasswordLink(email){
      console.log(email)
    },
    getUser(){

    }
  }
})
