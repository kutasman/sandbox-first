<script setup>
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()

</script>
<template>

      <h1 class="title">
        Hello World
      </h1>
      <div v-if="authStore.isAuth">
        <span>Hi, <router-link :to="{name: 'userAccount'}">{{ authStore.user.name }}</router-link>!</span>
        <br>
        <button class="button is-info is-small mt-4" @click.prevent="() => { authStore.logout(); $router.push('/login')}">Logout</button>
      </div>
      <div v-else class="subtitle">WOW! Now you can <router-link to="/login">Login!</router-link></div>

</template>
