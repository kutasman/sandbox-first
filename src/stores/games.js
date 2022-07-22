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
    async getUserGames(page){
      let res = await axios.get(`user/games`, {params: {page}})
      return res.status === 200 ? res.data : {data: {}, meta: {}}
    },
    async getNextRound(gameId){
      const res = await  axios.get(`games/${gameId}/rounds/next`)
      return [201, 200].includes(res.status) ? res.data : null
    },
    async createDraftRound(gameId){
      const res = await axios.get(`games/${gameId}/rounds/create`)
      return res.status === 201 ? res.data : null
    },
    updateRound(vForm){
      return vForm.put(`rounds/${vForm.id}`)
    },
    publishRound(vForm){
      return vForm.post(`rounds/${vForm.id}/publish`)
    },
    async getRoundById(roundId, params= {}){
      const res = await axios.get(`rounds/${roundId}`, {params})
      return res.status === 200
        ? res.data
        : null
    },

  }
})
