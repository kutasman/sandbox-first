<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const authStore = useAuthStore()
const handleLogout = async () => {
  await authStore.logout()
  await router.push('/')
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

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <router-link to="/" class="navbar-item">
              Home
            </router-link>

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