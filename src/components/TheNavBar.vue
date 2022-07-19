<script setup>
import { useAuthStore } from '../stores/auth'
import { useGamesStore } from '../stores/games'
import router from '../router'
import {ref} from "vue";
const authStore = useAuthStore()
const gamesStore = useGamesStore()
const handleLogout = async () => {
  await authStore.logout()
  await router.push('/')
}
const navbarIsActive = ref(false);
const handleStartNewGame = async () => {
  const res = await gamesStore.startNewGame()
  if ([200, 201].includes(res.status) && res.data.id){
    await router.push({name: 'userGamesEdit', params: {id: res.data.id}})
  }
}
</script>
<template>
  <section class="section py-0">
    <div class="container">
      <nav class="navbar mb-4" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item" href="/">
            <strong>Project Name</strong>
          </router-link>

          <a role="button"
             @click="navbarIsActive = !navbarIsActive"
             class="navbar-burger"
             :class="{'is-active': navbarIsActive}"
             aria-label="menu"
             aria-expanded="false"
             data-target="navbar">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbar" class="navbar-menu" :class="{'is-active': navbarIsActive}">
          <div class="navbar-start">
            <a v-if="authStore.isAuth" @click.prevent="handleStartNewGame" class="navbar-item">
              Start a game
            </a>
          </div>

          <div class="navbar-end">
            <router-link v-if="authStore.isAuth" class="navbar-item" :to="{name: 'userAccount'}">
              <span class="icon">
                <i class="fa fa-user"></i>
              </span>
              <span>
                Profile
              </span>
            </router-link>
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-light" v-if="authStore.isAuth" @click="handleLogout">
                  <span class="icon">
                    <i class="fa fa-sign-out"></i>
                  </span>
                </a>
                <template v-else>
                  <a class="button is-primary" @click="$router.push({name: 'signUp'})">
                    <strong>Sign up</strong>
                  </a>
                  <a class="button is-light" @click.prevent="$router.push({name: 'login'})">
                    Log in
                  </a>
                </template>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </section>
</template>
<style lang="scss">
.router-link-active {
  font-weight: bold;
}
</style>