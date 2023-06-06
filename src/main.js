import './assets/main.css'
import { VueFire, VueFireAuth } from 'vuefire'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { auth, firebaseApp } from '../firebase'
import Cookies from 'js-cookie'
import App from './App.vue'

import router from './router'


const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$auth = auth
app.config.globalProperties.$firebaseApp = firebaseApp
app.config.globalProperties.$cookies = Cookies
app.use(pinia)
app.use(router)
app
    .use(VueFire, {
        firebaseApp,
        modules: [
            VueFireAuth(),
        ],
    })
app.mount('#app')
