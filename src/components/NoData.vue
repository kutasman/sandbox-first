<script setup>
defineProps({
  loading: Boolean,
  loadingText: {
    type: String,
    default: 'loading...',
  },
  emptyText: {
    type: String,
    default: 'nothing here'
  }
})

</script>
<template>
  <div class="my-6 has-text-centered">
    <slot name="loading" v-if="loading">
      {{ loadingText }}
    </slot>
    <slot name="empty" v-else>
      {{ emptyText }}
    </slot>
  </div>
</template>

<style scoped>

</style>