<script setup>
  import TheNavBar from '@/components/TheNavBar.vue'
  import TheFooter from '@/components/TheFooter.vue'
</script>
<template>

    <the-nav-bar />

    <section class="main-content section py-2">
      <div class="container ">
        <slot  />
      </div>
    </section>

    <the-footer />
</template>