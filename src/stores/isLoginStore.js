import { defineStore } from 'pinia'; //引入storeToRefs可以解構state資料
import { userDataStore } from './useUserDataStore'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { ref } from 'vue';
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signOut
} from 'firebase/auth';



export const loginStore = defineStore('loginStore', () => {
    const store = userDataStore()
    const isLogIn = ref(false);
    const showMsg = ref('');
    const inputData = ref({
        email: '',
        password: '',
    })
    const accessToken = ref('');
    const router = useRouter()

    //重置inputData
    const resetInputData = () => {
        showMsg.value = '';
        inputData.value = {
            email: '',
            password: '',
        }
    }
    //忘記密碼
    const sendPasswordReset = () => {
        console.log('yo');
        const email = inputData.value.email;
        sendPasswordResetEmail(getAuth(), email)
            .then(() => {
                // 密码重置邮件已发送成功
                showMsg.value = '密碼重置郵件已發送成功'
                // 进行适当的提示或导航等操作
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error', errorCode, errorMessage);
                // 根据错误代码进行适当的处理
                switch (errorCode) {
                    case 'auth/missing-email':
                        showMsg.value = '請輸入電子郵件地址';
                        break;
                    case 'auth/invalid-email':
                        showMsg.value = '無效的電子郵件地址';
                        break;
                    case 'auth/user-disabled':
                        showMsg.value = '使用者已停用';
                        break;
                    case 'auth/user-not-found':
                        showMsg.value = '無此使用者';
                        break;
                    case 'auth/wrong-password':
                        showMsg.value = '密碼錯誤';
                        break;
                    default:
                        showMsg.value = '發生錯誤，無法重置密碼';
                        break;
                }
                // ...
            });
    };
    //信箱註冊
    const UserRegister = () => {
        createUserWithEmailAndPassword(getAuth(), inputData.value.email, inputData.value.password)
            .then((data) => {
                showMsg.value = '';
                // Signed in 
                console.log('Success', data);
                userSignIn()
                // ...
            })
            .catch((error) => {
                showMsg.value = "";
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
                console.log('Error', errorCode, errorMessage);
                switch (error.code) {
                    case 'auth/invalid-email':
                        showMsg.value = '無效的電子郵件地址';
                        break;
                    case 'auth/email-already-in-use':
                        showMsg.value = '此電子郵件地址已被使用';
                        break;
                    case 'auth/weak-password':
                        showMsg.value = '密碼強度不足';
                        break;
                    default:
                        showMsg.value = '註冊失敗,請稍後再試';
                        break;
                }
                // ..
            })
    }
    //信箱登入
    const userSignIn = () => {
        console.log('userSignIn');
        signInWithEmailAndPassword(getAuth(), inputData.value.email, inputData.value.password)
            .then((res) => {
                // Signed in 
                showMsg.value = '';
                console.log('Success sign in', res);
                const user = res.user;
                accessToken.value = user.accessToken;
                const expirationTime = new Date();
                expirationTime.setHours(23, 59, 59)
                Cookies.set('accessToken', accessToken.value, { expires: expirationTime });
                isLogIn.value = true;
                router.push('/feed') // redirect to feed
                inputData.value = {
                    email: '',
                    password: '',
                }
                // ...
            })
            .catch((error) => {
                showMsg.value = "";
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error', errorCode, errorMessage);
                switch (error.code) {
                    case 'auth/invalid-email':
                        showMsg.value = '無效的電子郵件地址'
                        break;
                    case 'auth/user-disabled':
                        showMsg.value = '使用者已停用'
                        break;
                    case 'auth/user-not-found':
                        showMsg.value = '無此使用者'
                        break;
                    case 'auth/wrong-password':
                        showMsg.value = '密碼錯誤'
                        break;
                }
                // ..
            })
    }
    //google登入
    const singInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
            .then((res) => {
                // The signed-in user info.
                isLogIn.value = true;
                const user = res.user;
                accessToken.value = user.accessToken;
                const expirationTime = new Date();
                expirationTime.setHours(23, 59, 59)
                Cookies.set('accessToken', accessToken.value, { expires: expirationTime });
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
    //登出
    const userSignOut = () => {
        signOut(getAuth()).then(() => {
            // Sign-out successful.
            isLogIn.value = false;
            accessToken.value = "";
            Cookies.remove('accessToken');
            router.push('/')
        }).catch((error) => {
            // An error happened.
            console.log(error);
            console.log('sign out error')

        });
    }

    return {
        isLogIn,
        showMsg,
        inputData,
        accessToken,
        sendPasswordReset,
        userSignIn,
        singInWithGoogle,
        userSignOut,
        UserRegister,
        resetInputData
    };
});
