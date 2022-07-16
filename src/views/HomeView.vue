<script setup>
import { useAuthStore } from '../stores/auth'
import { computed } from 'vue'
const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>
<template>
  <section class="hero">
    <div class="hero-body px-0">
      <p class="title">
        Welcome, {{  authStore.isAuth ? user.name : 'writer'}}!
      </p>
      <p v-if="!authStore.isAuth">
        Please, <router-link to="/login">login</router-link> or <router-link to="sign-up">create account</router-link>!
      </p>
    </div>
  </section>

</template>
