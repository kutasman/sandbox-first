import { defineStore } from 'pinia'
import axios from '../axios'
export const useGamesStore = defineStore({
  id: 'games',
  state: () => ({
  }),
  getters: {
  },
  actions: {
    startNewGame(){
      return axios.get('games/create')
    }
  }
})
