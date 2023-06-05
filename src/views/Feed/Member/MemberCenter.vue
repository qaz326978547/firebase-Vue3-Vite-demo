<template>
    <div>

        MemberCenter
        <ul>
            <li>
                <img :src="store.userData.photoURL" alt="">
            </li>
            <li>ID: {{ store.userData.uid }}</li>
            <li>Name: {{ store.userData.dispalyName }}</li>
        </ul>
    </div>
    <div>

    </div>
</template>

<script setup>
import { userDataStore } from '@/stores/useUserDataStore.js'
import { RouterView, RouterLink } from 'vue-router'
const store = userDataStore()






</script>