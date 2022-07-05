<template>
  <section class="section">
    <div class="container is-flex is-justify-content-center is-align-items-center is-flex-direction-column mt-5">
      <div class="title">Reset password</div>
      <div class="subtitle is-size-6">Remember password? <router-link to="/login">Login</router-link></div>
      <div class="card">
        <div class="card-content">
          <form action="#" @submit.prevent="handleSendLink">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" placeholder="Email" v-model="email">
              </div>
            </div>
          </form>
        </div>
        <div class="card-footer is-flex is-justify-content-center p-3">
          <button class="button is-success is-fullwidth" :class="{'is-loading': busy}" @click.prevent="handleSendLink">Send link</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { ref } from 'vue'
const authStore = useAuthStore()
const email = ref('')
const busy = ref(false)
const handleSendLink = () => {
  busy.value = true
  authStore.resetPasswordLink(email)
  setTimeout(() => {
    busy.value = false
  }, 1500)
}
</script>

<style scoped>

</style>