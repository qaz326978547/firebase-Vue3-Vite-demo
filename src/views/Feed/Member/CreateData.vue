<template>
    <div>
        <!-- <button @click="pushUserData(users)">Push UserData</button> -->
        <button @click="pushProductData(products)">Push ProductData</button>
        <button @click="getData">get Product</button>
        <ul v-if="store.data">
            <li v-for="data in store.data">
                {{ data }}
            </li>
            <li>{{ store.data }}</li>
            <li v-for="id in store.keyId">
                <router-link :to="`/data/${id}`">{{ id }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { apiStore } from '@/stores/api.js'
import { userDataStore } from '@/stores/useUserDataStore.js'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const { initUsers, initProducts, getData } = apiStore()


const store = apiStore()




const products = ref({

    "name": "iphone 6",
    "price": 1000
})
// const pushUserData = async (users) => {
//     try {
//         initUsers(users)
//         console.log('users OK', users)
//     } catch (error) {
//         console.error('Failed to initialize users:', error);
//         throw error;
//     }
// }

const pushProductData = async (products) => {
    try {
        initProducts(products)
    } catch (error) {
        console.error('Failed to initialize products:', error);
        throw error;
    }
}


</script>