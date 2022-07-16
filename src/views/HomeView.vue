<script setup>
import useAuthUser from '../composables/useAuthUser'
const user = useAuthUser()
</script>
<template>
  <section class="hero">
    <div class="hero-body px-0">
      <p class="title">
        Welcome, {{  user ? user.name : 'writer'}}!
      </p>
      <p v-if="!user">
        Please, <router-link to="/login">login</router-link> or <router-link to="sign-up">create account</router-link>!
      </p>
    </div>
  </section>

</template>
