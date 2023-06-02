
<template>
  <header>
    <nav>
      <router-link to="/"> Home </router-link> |
      <router-link to="/feed"> Feed </router-link> |
      <router-link to="/register"> Register </router-link> |
      <router-link to="/sign-in"> Login </router-link> |
      <button @click="handleSignOut" v-if="store.isLogIn">Sign out</button>
    </nav>
  </header>

  <RouterView />
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { loginStore } from '@/stores/isLoginStore';
const router = useRouter()
const store = loginStore()



const auth = getAuth()
const handleSignOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    store.logOut()
    router.push('/')
  }).catch((error) => {
    // An error happened.
    console.log(error);
    console.log('sign out error')
  });

}

////
const userData = ref({
  uid: '',
  dispalyName: '',
  email: '',
  photoURL: '',
})


router.beforeEach(async (to, from, next) => {

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth && !store.isLogIn) {
    alert('請先登入')
    next('/sign-in');
  } else {
    getUser()
    next();
  }
})

const getUser = () => {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user', user)
      userData.value = {
        uid: user.uid,
        dispalyName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }
      // ...
    }
  });

}
///


</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
