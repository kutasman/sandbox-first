import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from './axios'
import VueAxios from 'vue-axios'
const app = createApp(App)

import('@fortawesome/fontawesome-free/js/all.min')

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

app.mount('#app')
