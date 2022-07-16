<script setup>
  import TheNavBar from '@/components/TheNavBar.vue'
  import TheFooter from '@/components/TheFooter.vue'
</script>
<template>
  <section class="section pt-0">
    <div class="container app">

      <the-nav-bar />

      <div class="main-content">
        <slot  />
      </div>

      <the-footer />
    </div>

  </section>
</template>