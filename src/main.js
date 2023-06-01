import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";

import App from './App.vue'
import router from './router'

const firebaseConfig = {
    apiKey: "AIzaSyBNL4sowNT_kjLoj15UhQcJP0vw0_KF_mU",
    authDomain: "fir-demo-40c82.firebaseapp.com",
    databaseURL: "https://fir-demo-40c82.firebaseapp.com",
    projectId: "fir-demo-40c82",
    storageBucket: "fir-demo-40c82.appspot.com",
    messagingSenderId: "552694961949",
    appId: "1:552694961949:web:c99c267a2a3a59546ef3f4"
};
const firebase = initializeApp(firebaseConfig);
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(createPinia())
app.use(router)

app.mount('#app')
