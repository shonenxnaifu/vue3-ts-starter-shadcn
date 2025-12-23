import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { vueQueryPluginOptions } from './libs'
import routes from './routes'
import './assets/css/index.css'
import 'vue-sonner/style.css'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(routes)
app.use(VueQueryPlugin, vueQueryPluginOptions)

app.mount('#app')
