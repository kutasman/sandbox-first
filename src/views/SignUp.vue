<template>
    <div class="is-flex is-justify-content-center is-align-items-center is-flex-direction-column mt-5">
      <div class="title">Sign up</div>
      <div class="subtitle is-size-6">Already have an account? <router-link to="/login">Sign in</router-link></div>
      <div class="card">
        <form action="#" @submit.prevent="handleSignUp" @keydown="form.onKeydown($event)">
          <div class="card-content">
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input class="input"
                         :class="{'is-danger': form.errors.has('email')}"
                         type="email"
                         name="email"
                         placeholder="Email"
                         v-model="form.email">
                </div>
                <div class="help is-danger" v-if="form.errors.has('email')">{{ form.errors.get('email')}}</div>
              </div>
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input"
                         :class="{'is-danger': form.errors.has('name')}"
                         name="name"
                         placeholder="Name"
                         v-model="form.name">
                </div>
                <div class="help is-danger" v-if="form.errors.has('name')">{{ form.errors.get('name')}}</div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input class="input"
                         type="password"
                         name="password"
                         :class="{'is-danger': form.errors.has('password')}"
                         placeholder="**********"
                         v-model="form.password">
                </div>
              </div>
              <div class="field">
                <label class="label">Repeat password</label>
                <div class="control">
                  <input class="input"
                         :class="{'is-danger': form.errors.has('password')}"
                         type="password"
                         name="password_confirmation"
                         placeholder="**********"
                         v-model="form.password_confirmation">
                </div>
              </div>
            <div class="help is-danger" v-if="form.errors.has('password')">{{ form.errors.get('password')}}</div>
          </div>
          <div class="card-footer is-flex is-justify-content-center p-3">
            <button class="button is-success is-fullwidth is-danger"
                    :class="{'is-loading': form.busy}">
              Register
            </button>
          </div>
        </form>

      </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { Form } from 'vform'
import { ref } from "vue";
import router from "../router";

const authStore = useAuthStore()
const form = ref(new Form({
  email: '',
  name: '',
  password: '',
  password_confirmation: '',
}))
const handleSignUp = async () => {
  const res = await authStore.signUp(form.value)

  if (res.status === 204){
    await authStore.me()
    await router.push('/')
  }
}

</script>