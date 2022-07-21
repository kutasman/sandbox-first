import { GAME_STATUSES } from '../constants'
import router from '../router'
import { useGamesStore } from '../stores/games'

export default async function ({gameId, gameStatus}){
    const gamesStore = useGamesStore()
    if ([GAME_STATUSES.STATUS_DRAFT, GAME_STATUSES.STATUS_WAITING_FIRST_ROUND].includes(gameStatus)){
        const round = await gamesStore.getNextRound(gameId)
        if (round){
            await router.push({name: 'userGamesRoundEdit', params: {id: round.id}})
        }
    }
}