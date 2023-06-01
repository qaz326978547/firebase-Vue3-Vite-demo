<template>
    <h1>Sing In</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="login">Submit</button></p>
    <p><button @click="singInWithGoogle">Sign In With Google</button></p>
</template>
  
  
<script setup>
import { ref } from 'vue'
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import { useRouter } from 'vue-router' // import router
import { loginStore } from '../stores/isLoginStore.js';

const store = loginStore()


const email = ref('')
const password = ref('')
const errMsg = ref()
const router = useRouter() // use router




const login = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            // Signed in 
            console.log('Success sign in', data);
            store.login()
            router.push('/feed') // redirect to feed
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Error', errorCode, errorMessage);
            switch (error.code) {
                case 'auth/invalid-email':
                    errMsg.value = '無效的電子郵件地址'
                    break;
                case 'auth/user-disabled':
                    errMsg.value = '使用者已停用'
                    break;
                case 'auth/user-not-found':
                    errMsg.value = '無此使用者'
                    break;
                case 'auth/wrong-password':
                    errMsg.value = '密碼錯誤'
                    break;
            }
            // ..
        })
}

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