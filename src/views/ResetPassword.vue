<template>
  <section>
    <div class="is-flex is-justify-content-center is-align-items-center is-flex-direction-column mt-5" >
      <div class="title">Reset password</div>
      <div class="subtitle is-size-5">Remember password? <router-link to="/login">Login</router-link></div>
      <div class="card is-danger">
     <div class>
          <form action="#" @submit.prevent="handleSendLink">
            <div class="card-content is-size-6">
              <label for="email">Email</label>
              <div class="field" id="email">
                <input class="input"  type="email" placeholder="Email" v-model="email">
              </div>
            </div>
          </form>
        </div>
        <div>
          <button class="button is-success is-fullwidth is-danger" :class="{'is-loading': busy}" @click.prevent="handleSendLink">Send link</button>
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