<template>
    <div class="is-flex is-justify-content-center is-align-items-center is-flex-direction-column mt-5">
      <div class="title">Log in</div>
      <div class="subtitle is-size-6">Doesn't have an account? <router-link to="/sign-up">Register</router-link></div>
      <div class="card">
        <div class="card-content pb-3">
          <form action="#" @submit.prevent="handleLogIn">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input @keyup.enter="handleLogIn" class="input" type="email" placeholder="Email" v-model="formState.email">
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input @keyup.enter="handleLogIn" class="input" type="password" placeholder="**********" v-model="formState.password">
              </div>
            </div>
            <div class="field has-text-right">
              <router-link to="/reset-password">Forgot password?</router-link>
            </div>
          </form>
          <template v-if="isDevMode">
            <div class="my-3">
              <button type="submit" class="button is-small is-info" @click.prevent="loginAs('user')">login as User</button>
            </div>
          </template>

        </div>
        <div class="card-footer is-flex is-justify-content-center p-3">
          <button class="button is-success is-fullwidth" :class="{'is-loading': busy}" @click.prevent="handleLogIn">Send</button>
        </div>
      </div>
    </div>
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
  busy.value = true
  await authStore.signIn({
    email: 'test@test.com',
    password: 'password',
  })

  await authStore.me()
  busy.value = false

  await router.push('/')
}

const handleLogIn = async () => {
  if (!formState.email) return
  busy.value = true
  await authStore.signIn(formState)
  await authStore.me()
  busy.value = false
  await router.push('/')

}

const isDevMode = computed(() => import.meta.env.MODE === 'development')
</script>

<style scoped>

</style>