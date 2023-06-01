import { defineStore } from 'pinia'; //引入storeToRefs可以解構state資料
import { ref } from 'vue';
export const loginStore = defineStore('loginStore', () => {
    const isLogIn = ref(false);
    const login = () => {
        isLogIn.value = true;
        console.log(isLogIn.value);
    };
    const logOut = () => {
        isLogIn.value = false;
        console.log(isLogIn.value);
    };
    return {
        isLogIn,
        login,
        logOut,
    };
});
