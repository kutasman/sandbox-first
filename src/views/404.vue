<template>
    <div class="is-flex is-flex-direction-row is-align-items-center">

      <img src="/img/404.jpg" alt="" class="is-hei"/>
      <div class="ml-5">
        <div class="title">These pages are still unwritten...</div>
        <div class="subtitle is-size-6">Try to <router-link to="/">find something</router-link> else....</div>
      </div>
    </div>
</template>

<script>
export default {
  name: "404Page"
}
</script>

<style scoped>
img {
  height: 80vh
}
</style>