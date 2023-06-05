<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="store.inputData.email" /></p>
    <p><input type="password" placeholder="Password" v-model="store.inputData.password" /></p>
    <p v-if="store.showMsg">{{ store.showMsg }}</p>
    <p><button @click="store.UserRegister">Submit</button></p>
    <p><button @click="store.singInWithGoogle">Sign In With Google</button></p>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import { loginStore } from '../stores/isLoginStore.js';
const store = loginStore()



onMounted(() => {
    store.resetInputData()
})
</script>
