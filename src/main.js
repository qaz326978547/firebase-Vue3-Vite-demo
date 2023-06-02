import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { auth, firebaseApp } from '../firebase'

import App from './App.vue'
import router from './router'


const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$auth = auth
app.config.globalProperties.$firebaseApp = firebaseApp
app.use(pinia)
app.use(router)

app.mount('#app')
