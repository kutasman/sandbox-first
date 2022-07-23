<script setup>
import  { ref, onMounted, computed, reactive } from 'vue'
import { useGamesStore } from '../stores/games'
import NoData from '@/components/NoData.vue'
import MasonryWall from '@yeger/vue-masonry-wall'
import UserGamesItem from '@/components/UserGamesItem.vue'

const gamesStore = useGamesStore()

const gamesLoading = ref(false)
const pagination = reactive({
  page: 0,
  current_page: 1,
  last_page: 1
})

const hasOlderGames = computed(() => {
  return pagination.current_page < pagination.last_page
})
const publicGames = ref([])


const loadGames = async () => {
  gamesLoading.value = true
  const { data, meta } = await gamesStore.getPublicGames( ++pagination.page )
  publicGames.value = pagination.page > 1 ? publicGames.value.concat(data) : data
  Object.assign(pagination, meta)
  gamesLoading.value = false
}

onMounted(() => loadGames())

</script>

<template>
  <div v-if="publicGames.length">
    <masonry-wall :items="publicGames" :gap="16">
      <template #default="{ item }">
        <user-games-item :game="item" />

      </template>
    </masonry-wall>
    <div class="is-flex is-justify-content-center py-5" v-if="hasOlderGames">
      <button class="button is-small is-light"
              :class="{'is-loading': gamesLoading}"
              @click.prevent="loadGames">
        Load more
      </button>
    </div>
  </div>
  <no-data v-else :loading="gamesLoading"/>
</template>