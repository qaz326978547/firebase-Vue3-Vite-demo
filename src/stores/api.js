import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
export const apiStore = defineStore('apiStore', () => {

    const baseURL = 'https://fir-demo-40c82-default-rtdb.firebaseio.com'; // 替换为您的实时数据库URL
    const api = axios.create({
        baseURL,
    });

    const data = ref([])

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
            const response = await api.post('/products.json', {
                products: products.map((product) => ({
                    ...product,
                    id: null, // 必须设置为null，以便Firebase生成ID
                })),
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to initialize products:', error);
            throw error;
        }
    };

    const getData = async () => {
        try {
            const response = await api.get('/products.json');
            console.log(response.data);
            const products = response.data;
            const productIds = Object.keys(products);
            const formattedData = productIds.map((productId) => {
                const product = products[productId];
                return {
                    id: productId,
                    ...product,
                };
            });
            data.value = {
                products: formattedData,
            };
        } catch (error) {
            console.error('Failed to get data:', error);
            throw error;
        }
    };
    return {
        initUsers,
        initProducts,
        getData,
        data
    }
})