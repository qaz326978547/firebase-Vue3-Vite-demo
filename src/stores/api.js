import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const apiStore = defineStore('apiStore', () => {



    const baseURL = 'https://fir-demo-40c82-default-rtdb.firebaseio.com'; // 替换为您的实时数据库URL
    const api = axios.create({
        baseURL,
    });

    const data = ref([])
    const IDName = ref("")
    const keyId = ref([])

    // 初始化用户数据
    const initUsers = async (users) => {
        try {
            const response = await api.post('/users.json', users);
            return response.data;
        } catch (error) {
            console.error('Failed to initialize users:', error);
            throw error;
        }
    };

    const initProducts = async (products) => {
        try {
            const response = await api.post('/products.json', products);
            console.log('response', response.data);
            IDName.value = response.data.name;
        } catch (error) {
            console.error('Failed to initialize products:', error);

            throw error;
        }
    };


    const getData = async () => {
        try {
            const response = await api.get('/products.json');
            data.value = response.data;
            console.log('response', data.value[IDName.value]);
            keyId.value = Object.keys(data.value)


        } catch (error) {
            console.error('Failed to get data:', error);
            throw error;
        }
    };


    const getProduct = async (id) => {
        try {
            const response = await api.get(`/products/${id}.json`);
            console.log('response', response.data);
            data.value = response.data;
        } catch (error) {
            console.error('Failed to get product:', error);
            throw error;
        }
    };

    return {
        initUsers,
        initProducts,
        getData,
        getProduct,
        keyId,
        data
    }
})