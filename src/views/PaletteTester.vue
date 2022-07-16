<template>
  <div class="is-flex is-flex-direction-row is-justify-content-space-between">
    <div v-for="i in 6" class="box white " :class="`has-background-${colors[i -1]}`" :key="i">{{ i }} - {{ colors[i-1]}}</div>
  </div>
  <div class="buttons">
    <button class="button is-primary">Primary</button>
    <button class="button is-link">Link</button>
  </div>

  <div class="buttons">
    <button class="button is-info">Info</button>
    <button class="button is-success">Success</button>
    <button class="button is-warning">Warning</button>
    <button class="button is-danger">Danger</button>
  </div>
  <div class="buttons">
    <button class="button is-primary is-light">Primary</button>
    <button class="button is-link is-light">Link</button>
  </div>

  <div class="buttons">
    <button class="button is-info is-light">Info</button>
    <button class="button is-success is-light">Success</button>
    <button class="button is-warning is-light">Warning</button>
    <button class="button is-danger is-light">Danger</button>
  </div>
</template>

<script setup>
import {shallowRef} from 'vue'

const colors = shallowRef([
  'primary',
  'info',
  'danger',
  'success',
  'warning',
  'link'
])
</script>

<style scoped>
.box {
  height: 150px;
  width: 150px;
}
</style>