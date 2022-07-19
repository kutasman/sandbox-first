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
    },
    async getGameById(id){
      if (!id) return null
      const {data} = await axios.get(`games/${id}`)
      return data
    },
    update: vForm => vForm.put(`games/${vForm.id}`),
    startGame: id => axios.post(`games/${id}/start`)
  }
})
