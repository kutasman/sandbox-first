<script setup>
import {onMounted, watch, ref, computed, shallowRef} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGamesStore } from '../stores/games'
import { Form } from 'vform'
import NoData from '@/components/NoData.vue'

const gamesStore = useGamesStore()
const route = useRoute()
const router = useRouter()
const formState = ref(new Form({
  id: null,
  name: '',
  rounds_max: 15,
  max_lock_minutes: 0,
}))
const startForm = ref(new Form())
const gameStatus = shallowRef(null)
const limitRoundsDuration = ref(false)

const loadGame = async () => {
  const gameLoaded = await gamesStore.getGameById(route.params.id)
  if (gameLoaded){
    formState.value.fill(gameLoaded)
  }
  limitRoundsDuration.value = !! formState.value?.max_lock_minutes
  gameStatus.value = gameLoaded?.status
}
const formBusy = computed(() => startForm.value.busy)

onMounted(() => {
  loadGame()
})

watch(() => limitRoundsDuration.value, (to) => {
  formState.value.max_lock_minutes = to ? 15 : null
})

watch(() => route.params.id, () => {
  loadGame()
})

const handleChanged = () => {
  gamesStore.update(formState.value)
}

const handleCreateRound = async () => {
  // await startForm.value.post(`games/${formState.value.id}/start`)

  const round = await gamesStore.createDraftRound(route.params.id)
  if (round){
    await router.push({name: 'userGamesRoundEdit', params: {id: round.id}})
  }
}

</script>
<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title" v-if="formState.id">
        <span class="mr-3 is-clickable" @click="$router.push({name: 'userGames'})">
          <i class="fa fa-arrow-left" />
        </span>
        {{ gameStatus === 'Draft' ? 'Start new game' : 'Edit game' }}
      </div>
    </div>
    <div class="card-content">
      <form action="#" id="game"
            @change="handleChanged"
            @submit.prevent="handleChanged"
            @keydown="formState.onKeydown($event)" v-if="formState.id">
        <div class="field">
          <div class="label">Game name</div>
          <div class="control">
            <input class="input"
                   :class="{'is-danger': formState.errors.has('name')}"
                   v-model="formState.name" />
          </div>
          <div class="help is-danger" v-if="formState.errors.has('name')">{{ formState.errors.get('name') }}</div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <div class="label">Rounds</div>
              <div class="control select is-fullwidth">
                <select
                  :class="{'is-danger': formState.errors.has('rounds_max')}"
                  v-model="formState.rounds_max"
                >
                  <option v-for="value in [2, 5, 7, 10, 15, 30]" :value="value" :key="value">{{ value }}</option>
                </select>
              </div>
              <div class="help is-danger" v-if="formState.errors.has('rounds_max')">{{ formState.errors.get('rounds_max') }}</div>
              <div class="help is-info" >Set max rounds amount</div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <div class="label is-clickable" @click="limitRoundsDuration = !limitRoundsDuration">
                <input type="checkbox" v-model="limitRoundsDuration">
                Round duration limit
              </div>
              <div class="control select is-fullwidth">
                <select
                        :disabled="!limitRoundsDuration"
                        :class="{'is-danger': formState.errors.has('max_lock_minutes')}"
                        v-model="formState.max_lock_minutes"
                >
                  <option v-if="!limitRoundsDuration" :value="null" key="nulable">without limits</option>
                  <option v-for="value in [15, 30, 45, 60]" :value="value" :key="value">{{value }} min</option>
                </select>
              </div>
              <div class="help is-danger" v-if="formState.errors.has('max_lock_minutes')">{{ formState.errors.get('max_lock_minutes') }}</div>
              <div class="help is-info" >Specify max round duration</div>
            </div>
          </div>
        </div>

        <div class="field" v-if="gameStatus === 'Draft' && false">
          <button form="game"
                  @click.prevent="handleCreateRound" class="button is-primary"
                  :class="{'is-loading': formBusy}">Create first round</button>
        </div>
      </form>
      <no-data v-else :loading="formState.busy"/>
    </div>
    <div class="card-footer"></div>
  </div>
</template>