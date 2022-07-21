import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from './axios'
import VueAxios from 'vue-axios'
const app = createApp(App)
import MasonryWall from '@yeger/vue-masonry-wall'
import('@fortawesome/fontawesome-free/js/all.min')
import ResizeTextarea from 'resize-textarea-vue3'
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(MasonryWall)
app.use(ResizeTextarea)

app.mount('#app')
