<template>
    <div class="is-flex is-justify-content-center is-align-items-center is-flex-direction-column mt-5">
      <div class="title">Log in</div>
      <div class="subtitle is-size-6">Doesn't have an account? <router-link to="/sign-up">Register</router-link></div>
      <div class="card">
        <form action="#" @submit.prevent="handleLogIn" @keydown="form.onKeydown($event)">
          <div class="card-content pb-3">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input @keyup.enter="handleLogIn"
                       :class="{'is-danger': form.errors.has('email')}"
                       class="input"
                       name="email"
                       type="email"
                       placeholder="Email"
                       v-model="form.email">
              </div>
              <div class="help is-danger" v-if="form.errors.has('email')">{{ form.errors.get('email')}}</div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input @keyup.enter="handleLogIn"
                       class="input"
                       name="password"
                       type="password"
                       :class="{'is-danger': form.errors.has('password')}"
                       placeholder="**********"
                       v-model="form.password">
              </div>
              <div class="help is-danger" v-if="form.errors.has('password')">{{ form.errors.get('password')}}</div>
            </div>
            <div class="field has-text-right">
              <router-link to="/reset-password">Forgot password?</router-link>
            </div>
            <template v-if="isDevMode">
              <div class="my-3">
                <button class="button is-small is-info" @click.prevent="loginAs('user')">login as User</button>
              </div>
            </template>
          </div>
          <div class="card-footer is-flex is-justify-content-center p-3">
            <button type="submit" class="button is-success is-fullwidth"
                    :class="{'is-loading': form.busy}">
              Send
            </button>
          </div>
        </form>

      </div>
    </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import { Form } from 'vform'
import { useAuthStore } from '../stores/auth'
import router from '../router'
const authStore = useAuthStore()
const form = ref(new Form({
  email: '',
  password: '',
}))

const loginAs = async () => {
  form.value.email = 'test@test.com'
  form.value.password = 'password'
  await authStore.signIn(form.value)
  await authStore.me()
  await router.push('/')
}

const handleLogIn = async () => {
  await authStore.signIn(form.value)
  await authStore.me()
  await router.push('/')
}

const isDevMode = computed(() => import.meta.env.MODE === 'development')
</script>

<style scoped>

</style>