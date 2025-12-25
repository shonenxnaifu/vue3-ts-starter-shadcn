import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { vueQueryPluginOptions } from './libs'

import routes from './routes'

import './assets/css/index.css'

import 'vue-sonner/style.css'

const pinia = createPinia()

library.add(fab, far, fas)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(pinia)
app.use(routes)
app.use(VueQueryPlugin, vueQueryPluginOptions)

app.mount('#app')
