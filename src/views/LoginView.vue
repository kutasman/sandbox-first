<template>
  <section class="section">
    <div class="container is-flex is-justify-content-center is-align-items-center is-flex-direction-column mt-5">
      <div class="title">Log in</div>
      <div class="subtitle is-size-6">Doesn't have an account? <router-link to="/sign-up">Register</router-link></div>
      <div class="card">
        <div class="card-content pb-3">
          <form action="#" @submit.prevent="handleLogIn">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" placeholder="Email" v-model="formState.email">
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" type="password" placeholder="**********" v-model="formState.password">
              </div>
            </div>
            <div class="field has-text-right">
              <router-link to="/reset-password">Forgot password?</router-link>
            </div>
          </form>
          <template v-if="isDevMode">
            <div class="my-3">
              <button class="button is-small is-info" @click.prevent="loginAs('user')">login as User</button>
            </div>
          </template>

        </div>
        <div class="card-footer is-flex is-justify-content-center p-3">
          <button class="button is-success is-fullwidth" :class="{'is-loading': busy}" @click.prevent="handleLogIn">Send</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {computed, reactive, ref} from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const busy = ref(false)
const router = useRouter()
const formState = reactive({
  email: '',
  password: '',
})

const loginAs = async () => {
  localStorage.setItem('authUser', JSON.stringify({
    "id": 1,
    "name": "Sam Smith",
    "avatar": "/img/avatar.svg",
    "email": "sam.smith@gmail.com"
  }))
  await authStore.me()
  router.push('/')
}

const handleLogIn = () => {
  if (!formState.email) return
  busy.value = true
  authStore.signIn(formState)
  setTimeout(() => {
    busy.value = false
  }, 1500)
}

const isDevMode = computed(() => import.meta.env.MODE === 'development')
</script>

<style scoped>

</style>