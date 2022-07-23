<template>
  <article
      :class="{'has-text-grey-light': game.status === 'Draft'}"
      class="tile game-item notification is-light is-vertical is-clickable">
    <span class="status-icon has-text-grey-light" v-if="game.locked_at"><i class="fa fa-lock" /> </span>
    <span class="status-icon has-text-grey-light" v-if="game.status === STATUS_FINISHED"><i class="fa fa-flag-checkered"></i> </span>
    <div class="title">{{ game.status !== 'Draft' ? game.name : 'Draft game' }}</div>
    <div class="subtitle">
      rounds: <status v-if="game.finished_rounds_count">{{ game.finished_rounds_count }} / </status>{{ game.rounds_max ?? 'unlimited' }}
<!--      round duration: {{ game.max_lock_minutes ? `${game.max_lock_minutes} min.` : 'unlimited' }}-->
    </div>
    <div class="white-space-break-spaces" v-if="game.latest_round_excerpt && game.status !== STATUS_FINISHED">...{{game.latest_round_excerpt }}</div>
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
        <div class="level-item" v-if="game.user_id === authStore.user?.id && [STATUS_DRAFT, STATUS_WAITING_FIRST_ROUND].includes(game.status)">
          <span
            @click.stop="$router.push({name: 'userGamesEdit', params: {id: game.id} })"
            class="button is-small is-primary">
            <i class="fa fa-gear" />
          </span>
        </div>
        <div class="level-item" v-if="game.status === STATUS_FINISHED" >
          <span class="button is-primary is-small" @click="handleShowRounds"><i class="fa fa-eye" /></span>
          <div class="modal" :class="{'is-active': showRounds}">
            <div class="modal-background"></div>
            <div class="modal-card">
              <div class="modal-card-head">
                <div class="modal-card-title">{{game.name}}</div>
                <button class="delete" aria-label="close" @click.prevent="showRounds = false"></button>
              </div>
              <section class="modal-card-body">
                <div v-for="round in allRounds" :key="round.id">
                  <div class="card is-shadowless round">
                    <div class="card-content">
                      <div class="white-space-break-spaces">{{ round.text }}</div>
                      <small class="is-flex is-justify-content-end has-text-grey-light ">
                        <span class="mr-1"><i class="fa fa-user" /></span>
                        <i>{{round.author.name}}</i>
                      </small>
                    </div>
                  </div>
                </div>
              </section>
              <footer class="modal-card-foot">
                <button class="button" @click.prevent="showRounds = false">Close</button>
              </footer>
            </div>
            <button class="modal-close is-large" @click.prevent="showRounds = false" aria-label="close"></button>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useGamesStore } from '../stores/games'
import { STATUS_FINISHED, STATUS_WAITING_FIRST_ROUND, STATUS_DRAFT} from '../constants'
const authStore = useAuthStore()
const gamesStore = useGamesStore()
const props = defineProps(['game'])
const draftRoundCreation = ref(false)
const showRounds = ref(false)
const allRounds = ref([])
const gameIsPlayable = computed(() => props.game.is_playable_for_current_user)
import goToNextRound from '../composables/goToNextRound'
const handleCreateRound = async () => {
  await goToNextRound({gameId: props.game.id, gameStatus: props.game.status})
}
const handleShowRounds = async () => {
  if (props.game?.status !== STATUS_FINISHED) return
  if (!allRounds.value.length){
    const game = await gamesStore.getGameById(props.game.id, {includes: ['rounds.author']})
    if (game){
      allRounds.value = game.rounds
    }
  }
  showRounds.value = true
}

</script>

<style scoped lang="scss">
@import "bulma/sass/utilities/derived-variables";
.game-item {
  &:hover {
     box-shadow: $shadow;
  }
  .status-icon {
    position: absolute;
    right: .8rem;
    top: .5rem;
  }
  .round {
    border-bottom: 1px solid lightgrey;
  }
}
</style>