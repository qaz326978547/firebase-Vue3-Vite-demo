import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

export const userDataStore = defineStore('userDataStore', () => {
  ////
  const userData = ref({
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
  }
})
