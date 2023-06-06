
<template>
  <header>
    <nav>
      <router-link to="/"> Home </router-link> |
      <router-link to="/feed"> Feed </router-link> |
      <router-link to="/register"> Register </router-link> |
      <router-link to="/sign-in"> Login </router-link> |
      <button @click="store.userSignOut" v-if="store.accessToken">Sign out</button>
    </nav>
  </header>

  <RouterView />
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { loginStore } from '@/stores/isLoginStore';
import { userDataStore } from '@/stores/useUserDataStore';
import Cookies from 'js-cookie'

const router = useRouter()
const store = loginStore()
const userStore = userDataStore()
const accessToken = Cookies.get('accessToken');

router.beforeEach(async (to, from, next) => {

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  // console.log('accessToken', accessToken);
  // console.log('store.accessToken', store.accessToken);
  if (requiresAuth && !store.isLogIn && !accessToken) {
    //需要身分驗證 且 未登入
    alert('請先登入')
    next('/sign-in');
  } else {
    userStore.getUser()
    next();
    // 验证accessToken cookie
    if (accessToken) {
      // 存在accessToken，将登录状态设置为true
      store.isLogIn.value = true;
      next();
    } else {
      // 不存在accessToken，需要重新登录
      store.isLogIn.value = false;
      next('/sign-in');
    }
  }
})


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
