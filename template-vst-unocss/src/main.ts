import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import nprogress from './libs/nprogress/index'
import vueRequest from './libs/vue-request/index'

import './assets/base.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(nprogress)
app.use(vueRequest)

app.mount('#app')
