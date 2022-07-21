<script setup>
import {onMounted, ref, watch} from 'vue'
import { useRoute } from 'vue-router'
import { Form } from 'vform'
import { useGamesStore } from '../stores/games'
import { debounce } from 'lodash'

const gamesStore = useGamesStore()
const game = ref(null)
const roundTextFormState = ref(new Form({
  id: null,
  text: '',
  // excerpt: '',
}))

const route = useRoute()

const handleUpdate = debounce(() => {
  gamesStore.updateRound(roundTextFormState.value)
}, 1000)

const handleSetExcerpt = () => {

}

onMounted(async () => {
  if (route.params.id){
    const round = await gamesStore.getRoundById(route.params.id, {includes: ['game']})
    if (round){
      game.value = round.game
      roundTextFormState.value.fill(round)
    }
  }
})
</script>
<template>
  <div class="card">
    <form action="#" @input="handleUpdate">
      <div class="card-header">
        <div class="card-header-title">
          <span class="mr-3" @click="$router.go(-1)"><i class="fa fa-arrow-left is-clickable" /></span>
          {{ game?.name }} | Your round
        </div>
        <div class="card-header-icon">
          <span class="loader" v-if="roundTextFormState.busy" />
          <small class="has-text-grey-light" v-if="roundTextFormState.recentlySuccessful" >saved</small>
        </div>
      </div>
      <div class="card-content">
        <div class="field">
          <label class="label">Text</label>
          <div class="control">
            <resize-textarea
              v-if="roundTextFormState.id"
              style="overflow-y: scroll !important; overflow-x: hidden !important;"
              class="textarea is-focusless"
              placeholder="Your text here..."
              :rows="6"
              :maxHeight="300"
              v-model="roundTextFormState.text">
            </resize-textarea>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>