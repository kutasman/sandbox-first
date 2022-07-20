<template>
  <article
      :class="{'has-text-grey-light': game.status === 'Draft'}"
      class="tile game-item notification is-light is-vertical is-clickable">
    <div class="title">{{ game.status !== 'Draft' ? game.name : 'Draft game' }}</div>
    <div class="subtitle">
      rounds: {{ game.rounds_max ?? 'unlimited' }},
      round duration: {{ game.max_lock_minutes ? `${game.max_lock_minutes} min.` : 'unlimited' }}
      <span v-if="game.locked_at">, locked at: {{ game.locked_at}}</span>
    </div>
    <div>excerpt...</div>
    <div class="level mt-3 is-mobile">
      <div class="level-left">
        <div class="level-item" v-if="gameIsPlayable">
          <span
            @click.stop="handleCreateRound"
            :class="{'is-loading': draftRoundCreation}"
            class="button is-small is-primary" >
            <i class="fa fa-play" />
          </span>
        </div>
        <div class="level-item" v-if="game.user_id === authStore.user?.id">
          <span
            @click.stop="$router.push({name: 'userGamesEdit', params: {id: game.id} })"
            class="button is-small is-primary">
            <i class="fa fa-gear" />
          </span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import {computed, ref} from 'vue'
import { useAuthStore } from '../stores/auth'
import { useGamesStore } from '../stores/games'
import { useRouter } from 'vue-router'
import {GAME_STATUSES} from "../constants";
const router = useRouter()
const gamesStore = useGamesStore()

const authStore = useAuthStore()

const props = defineProps(['game'])
const draftRoundCreation = ref(false)

const gameIsPlayable = computed(() => true)

const handleCreateRound = async () => {
  if ([GAME_STATUSES.STATUS_DRAFT, GAME_STATUSES.STATUS_WAITING_FIRST_ROUND].includes(props.game.status)){
    const round = await gamesStore.getNextRound(props.game.id)
    if (round){
      await router.push({name: 'userGamesRoundEdit', params: {id: round.id}})
    }
  }
}

</script>

<style scoped lang="scss">
@import "bulma/sass/utilities/derived-variables";
.game-item {
&:hover {
   box-shadow: $shadow;
 }
}
</style>