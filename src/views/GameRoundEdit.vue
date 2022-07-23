<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Form } from 'vform'
import { useGamesStore } from '../stores/games'
import { debounce } from 'lodash'
import slider from "vue3-slider"
import { STATUS_PUBLISHED } from "../constants";
const route = useRoute()

const gamesStore = useGamesStore()
const game = ref(null)

const roundFormState = ref(new Form({
  id: null,
  text: '',
  excerpt: '',
  excerpt_length: 0,
}))
const roundStatus = ref(null)

const showExcerptForm = ref(false)
const handleUpdateWithoudDebounce = async () => {
  roundFormState.value.update({
    excerpt: excerptFinal.value
  })
  await gamesStore.updateRound(roundFormState.value)
}
const handleUpdate = debounce( handleUpdateWithoudDebounce, 1000)

const publishRoundForm = ref( new Form({id: null}))

const limitedText = computed(() => `${roundFormState.value.text.length > 1000 ? '...' : ''}` + roundFormState.value.text.slice(0, 1000))

const handleToggleExcerptForm = () => {
  showExcerptForm.value = ! showExcerptForm.value
  if (!showExcerptForm.value ){
    roundFormState.value.excerpt_length = 0
  } else {
    roundFormState.value.excerpt_length = 5
    roundFormState.value.excerpt = excerptFinal.value
  }

  handleUpdate()
}
const isLastRound = computed(() => game.value?.rounds_max - ( game.value?.finished_rounds_count ?? 0 ) === 1)

const excerptFinal = computed(() => roundFormState.value.excerpt_length ? limitedText.value.slice(0-roundFormState.value.excerpt_length) : '')

const handlePublish = async () => {
  await handleUpdateWithoudDebounce()
  publishRoundForm.value.fill({id: roundFormState.value.id})
  gamesStore.publishRound(publishRoundForm.value)
    .then(res => {
      if (res.status === 200){
        roundStatus.value = STATUS_PUBLISHED
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
}

onMounted(async () => {
  if (route.params.id){
    const round = await gamesStore.getRoundById(route.params.id, {includes: ['game']})
    if (round){
      game.value = round.game
      roundFormState.value.fill(round)
      roundStatus.value = round.status
      if (round.excerpt) {
        showExcerptForm.value = true
      }
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
          <span class="loader" v-if="roundFormState.busy" />
          <small class="has-text-grey-light" v-if="roundFormState.recentlySuccessful" >saved</small>
        </div>
      </div>
      <div class="card-content" v-if="roundStatus === STATUS_PUBLISHED">
        <div class="title is-size-4">{{ isLastRound ? 'The last round has been published!' : 'Round has been published'}}</div>
        <div class="field" v-if="excerptFinal">
          <div class="label">Excerpt</div>
          <div class="content has-text-primary is-size-4">{{ excerptFinal }}</div>
        </div>
        <div class="field">
          <div class="label">Text</div>
          <div class="content white-space-break-spaces">{{ roundFormState.text }}</div>
        </div>
        <div v-if="isLastRound && false"><button class="button is-primary" @click.prevent="" >View all rounds</button> </div>
      </div>
      <div class="card-content" v-else>
        <div class="field" v-if="game?.latest_round_excerpt">
          <div class="label">Previous round excerpt</div>
          ...{{ game?.latest_round_excerpt }}
        </div>
        <div class="field">
          <label class="label">Text<span class="tag is-info is-small ml-3" v-if="isLastRound">last round</span></label>
          <div v-if="showExcerptForm" class="my-4 white-space-break-spaces">
            <span class="has-text-grey">{{ limitedText.slice(0, limitedText.length - roundFormState.excerpt_length) }}</span>
            <span class="has-text-primary-dark is-size-4" v-if="roundFormState.excerpt_length">{{ excerptFinal }}</span>
          </div>
          <div class="control" v-else>
            <resize-textarea
              v-if="roundFormState.id"
              style="overflow-y: scroll !important; overflow-x: hidden !important;"
              class="textarea is-focusless"
              placeholder="Your text here..."
              :rows="3"
              :maxHeight="300"
              v-model="roundFormState.text">
            </resize-textarea>
          </div>
        </div>
        <div class="field" v-if="showExcerptForm">
          <div class="label">
            Please, use slider to set excerpt length
          </div>
          <slider v-model="roundFormState.excerpt_length"
                  @change="handleUpdate"
                  flip
                  :height="12"
                  :min="1"
                  :max="roundFormState.text.length > 1000 ? 1000 : roundFormState.text.length"
                  color="#00c4a7"
                  track-color="#f5f5f5" />
        </div>

        <div class="field">
          <div class="buttons">
            <button class="button"
                    v-if="!isLastRound"
                    :class="showExcerptForm ? 'is-light' : 'is-primary'" @click.prevent="handleToggleExcerptForm">
              <span class="mr-3" v-if="showExcerptForm"><i class="fa fa-pencil" /> </span>
              {{ showExcerptForm ? 'Edit round text' : 'Define excerpt' }}
            </button>
            <button class="button is-primary"
                    :class="{'is-loading': publishRoundForm.busy}"
                    :disabled="!isLastRound && !showExcerptForm"
                    @click.prevent="handlePublish">
              Publish round
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped lang="scss">
:deep(.vue3-slider){
  .handle {
    transform: scale(1.5) !important;
    &.hover {
      transform: scale(2) !important;
    }
  }
}
</style>