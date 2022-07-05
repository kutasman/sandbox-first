<template>
  <section>
    <div >
      <div>Reset password</div>
      <div>Remember password? <router-link to="/login">Login</router-link></div>
      <div>
        <div>
          <form action="#" @submit.prevent="handleSendLink">
            <div>
              <label for="email">Email</label>
              <div id="email">
                <input  type="email" placeholder="Email" v-model="email">
              </div>
            </div>
          </form>
        </div>
        <div>
          <button :class="{'is-loading': busy}" @click.prevent="handleSendLink">Send link</button>
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