<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="singInWithGoogle">Sign In With Google</button></p>
</template>
  
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // import router
import { loginStore } from '../stores/isLoginStore.js';
import {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
const email = ref('')
const password = ref('')
const router = useRouter() // use router
const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            // Signed in 
            console.log('Success', data);
            router.push('/feed') // redirect to feed
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Error', errorCode, errorMessage);
            // ..
        })
}

const store = loginStore()

const singInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            // The signed-in user info.
            store.login()
            const user = result.user;
            console.log('Success', user);
            router.push('/feed') // redirect to feed
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Error', errorCode, errorMessage);
            // ...
        });
}

</script>
