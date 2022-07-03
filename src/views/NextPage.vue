<template>
  <section class="section">
    <div class="container">
      <p class="title">
        Hi again!{{appName}}
      </p>
      <p class="subtitle">
        I'm "Next Page")
      </p>
      <article class="message is-danger">
  <div class="message-header">
    <p>Dark</p>
    <button class="delete" aria-label="delete"></button>
  </div>
  <div class="message-body">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
  </div>
</article>
      <p><button class="button is-success" @click="$router.push('/')">Go home</button> </p>
    </div>
  </section>

</template>
<script setup>
import {ref} from 'vue'

const appName = ref('appName')

</script>
<style lang="scss">




</style>