<template>
    <div>
        <button @click="pushUserData(users)">Push UserData</button>
        <button @click="pushProductData(products)">Push ProductData</button>
        <button @click="getData">get Product</button>
        {{ data }}
    </div>
</template>

<script setup>
import { apiStore } from '@/stores/api.js'
import { ref } from 'vue'
const { initUsers, initProducts, getData, data } = apiStore()

const users = ref([
    {
        username: 'Rax',
        password: '123456',
        email: 'qqqq@gmail.com'
    },
    {
        username: 'Mary',
        password: '123456',
        email: 'qqqddddq@gmail.com'
    }
])
const products = ref([
    {
        title: 'Product 1',
        price: 100,
        count: 10,
        img: 'img/product1.jpg',
        content: 'Content 1'
    },
    {
        title: 'Product 2',
        price: 200,
        count: 20,
        img: 'img/product2.jpg',
        content: 'Content 2'
    }
])

const pushUserData = async (users) => {
    try {
        initUsers(users)
        console.log('users OK', users)
    } catch (error) {
        console.error('Failed to initialize users:', error);
        throw error;
    }
}

const pushProductData = async (products) => {
    try {

        initProducts(products)
        console.log('products OK', users)

    } catch (error) {
        console.error('Failed to initialize products:', error);
        throw error;
    }
}

</script>