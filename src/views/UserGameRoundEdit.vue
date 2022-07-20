<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Form } from 'vform'
import { useGamesStore } from '../stores/games'
import {debounce} from 'lodash'

const gamesStore = useGamesStore()
const formState = ref(new Form({
  text: '',
  excerpt: '',
}))

const route = useRoute()

onMounted(async () => {
  if (route.params.id){
    const round = await gamesStore.getRoundById(route.params.id)
    if (round){
      formState.value.fill(round)
    }
  }
})
</script>
<template>
  <div class="card">
    <form action="#">
      <div class="card-header">
        <div class="card-header-title">
          <span @click="$router.push({name: 'userGames'})"><i class="fa fa-arrow-left is-clickable" /></span>
        </div>
      </div>
      <div class="card-content">
        <div class="field">
          <label class="label">Text</label>
          <div class="control">
            <textarea class="textarea" placeholder="your text here..." v-model="formState.text"></textarea>
          </div>
        </div>
      </div>
    </form>

  </div>
</template>