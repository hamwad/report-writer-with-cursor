import './assets/css/styles.css'
import './assets/css/tailwind.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import queryClient from './api/queryClient'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import configureApp from './config'

configureApp()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  unstyled: false,
  pt: {
    // Pass Through options
  },
  theme: {
    name: 'aura-light-green',
    dark: false,
  },
})

VueQueryPlugin.install(app, {
  queryClient,
})

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
