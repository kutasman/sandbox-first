<template>
    <div class="is-flex is-justify-content-center is-align-items-center is-flex-direction-column mt-5">
      <div class="title">Sign up</div>
      <div class="subtitle is-size-6">Already have an account? <router-link to="/login">Sign in</router-link></div>
      <div class="card">
        <div class="card-content">
          <form action="#" @submit.prevent="handleSignUp">
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
            <div class="field">
              <label class="label">Repeat password</label>
              <div class="control">
                <input class="input" type="password" placeholder="**********" v-model="formState.password_confirmation">
              </div>
            </div>
          </form>
        </div>
        <div class="card-footer is-flex is-justify-content-center p-3">
          <button class="button is-success is-fullwidth" @click.prevent="handleSignUp">Register</button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { reactive, ref } from 'vue'

const authStore = useAuthStore()
const busy = ref(false)
const formState = reactive({
  email: '',
  password: '',
  password_confirmation: '',
})

const handleSignUp = () => {
  busy.value = true
  authStore.signUp(formState)
  setTimeout(() => {
    busy.value = false
  }, 1500)
}

</script>

<style scoped>

</style>