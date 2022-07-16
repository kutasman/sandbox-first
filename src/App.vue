<script setup>
import { RouterView } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
</script>

<template>
  <main-layout>
    <router-view />
  </main-layout>
</template>

<style lang="scss">
@import "assets/main";
</style>
