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
        </div>
        <div class="card-footer is-flex is-justify-content-center p-3">
          <button class="button is-success is-fullwidth" :class="{'is-loading': busy}" @click.prevent="handleLogIn">Send</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {reactive, ref} from 'vue'
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
const busy = ref(false)
const formState = reactive({
  email: '',
  password: '',
})

const handleLogIn = () => {
  if (!formState.email) return
  busy.value = true
  authStore.signIn(formState)
  setTimeout(() => {
    busy.value = false
  }, 1500)
}
</script>

<style scoped>

</style>