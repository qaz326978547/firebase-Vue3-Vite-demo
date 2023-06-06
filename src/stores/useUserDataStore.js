import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import axios from 'axios'
export const userDataStore = defineStore('userDataStore', () => {
  ////
  const userData = ref({
    isAdmin: false,
    uid: '',
    dispalyName: '',
    email: '',
    photoURL: '',
  })


  const getUser = () => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userData.value = {
          isAdmin: user.email === 'test1234@gmail.com' ? true : false,
          uid: user.uid,
          dispalyName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }
        // ...
      }
      console.log('userData', userData.value);
    });

  }



  return {
    userData,
    getUser,
    // getAdmin,
  }
})
