<template>
  <article
      :class="{'has-text-grey-light': game.status === 'Draft'}"
      class="tile game-item notification is-light is-vertical is-clickable">
    <div class="title">{{ game.status !== 'Draft' ? game.name : 'Draft game' }}</div>
    <div class="subtitle">rounds: {{ game.rounds_max ?? 'unlimited' }}, round duration: {{ game.max_lock_minutes ? `${game.max_lock_minutes} min.` : 'unlimited' }}</div>
    <div>excerpt...</div>
    <div class="level mt-3 is-mobile">
      <div class="level-left">
        <div class="level-item" v-if="gameIsPlayable">
          <span
            @click.stop="$router.push({name: 'userGamesRound', params: {id: game.id} })"
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
import { computed } from 'vue'
import {useAuthStore} from "../stores/auth";

const authStore = useAuthStore()

const props = defineProps(['game'])

const gameIsPlayable = computed(() => props.game.locked_at === null && props.game.status !== 'Draft')

</script>

<style scoped lang="scss">
@import "bulma/sass/utilities/derived-variables";
.game-item {
&:hover {
   box-shadow: $shadow;
 }
}
</style>