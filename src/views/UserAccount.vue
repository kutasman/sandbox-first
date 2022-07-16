<template>
    <div class="card">
      <div class="card-header">
        <div class="card-header-title">Your profile</div>
      </div>
      <div class="card-content is-flex is-flex-direction-row">
        <img src="/img/avatar.svg">
        Name: {{ authStore.user?.name }}<br>
        Email: {{ authStore.user?.email }}
      </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
</script>
