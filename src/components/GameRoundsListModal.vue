<script setup>
import { ref, onMounted } from 'vue'
import {STATUS_FINISHED} from "../constants";
import { useGamesStore } from '../stores/games'
import NoData from '@/components/NoData.vue'
const gamesStore = useGamesStore()
const showRounds = ref(false)
const allRounds = ref([])
const roundsLoading = ref(false)
const props = defineProps({
  game: {
    type: Object,
    default: () => ({}),
  },
  buttonText: {
    type: String,
    default: '',
  }
})

const handleShowRounds = async () => {
  showRounds.value = true

  if (!allRounds.value.length){
    roundsLoading.value = true
    const game = await gamesStore.getGameById(props.game.id, {includes: ['rounds.author']})
    if (game){
      allRounds.value = game.rounds
    }
  }
  roundsLoading.value = true
}

</script>
<template>


  <span class="button is-primary is-small" @click="handleShowRounds">
    <i class="fa fa-eye" :class="{'mr-2' : buttonText}" /> {{ buttonText }}
  </span>

  <div class="modal" :class="{'is-active': showRounds}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <div class="modal-card-head">
        <div class="modal-card-title">{{game.name}}</div>
        <button class="delete" aria-label="close" @click.prevent="showRounds = false"></button>
      </div>
      <section class="modal-card-body">
        <no-data :loading="roundsLoading" v-if="!allRounds.length && roundsLoading"/>
        <div v-else>
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
        </div>
      </section>
      <footer class="modal-card-foot">
        <div class="is-flex is-flex-grow-1"></div>
        <button class="button" @click.prevent="showRounds = false">Close</button>
      </footer>
    </div>
    <button class="modal-close is-large" @click.prevent="showRounds = false" aria-label="close"></button>
  </div>
</template>
<style lang="scss" scoped>
.round {
    border-bottom: 1px solid lightgrey;
}
</style>