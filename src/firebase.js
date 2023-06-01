import firebase from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBNL4sowNT_kjLoj15UhQcJP0vw0_KF_mU",
    authDomain: "fir-demo-40c82.firebaseapp.com",
    databaseURL: "https://fir-demo-40c82-default-rtdb.firebaseio.com",
    projectId: "fir-demo-40c82",
    storageBucket: "fir-demo-40c82.appspot.com",
    messagingSenderId: "552694961949",
    appId: "1:552694961949:web:c99c267a2a3a59546ef3f4"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
