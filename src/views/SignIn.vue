<template>
    <h1>Sing In</h1>
    <p><input type="text" placeholder="Email" v-model="store.inputData.email" /></p>
    <p><input type="password" placeholder="Password" v-model="store.inputData.password" /></p>
    <p v-if="store.showMsg">{{ store.showMsg }}</p>
    <p><button @click="store.userSignIn">Submit</button></p>
    <p><button @click="store.singInWithGoogle">Sign In With Google</button></p>
    <p><button @click="store.sendPasswordReset">忘記密碼?</button></p>
</template>
  
  
<script setup>
import { ref, onMounted } from 'vue'
import { loginStore } from '../stores/isLoginStore.js';
const store = loginStore()


onMounted(() => {
    store.resetInputData()
})


</script>