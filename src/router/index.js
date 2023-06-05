import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/feed",
      name: "",
      component: () => import("../views/Feed.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "member",
          component: () => import("../views/Feed/Member/MemberCenter.vue"),
        },
        {
          path: "/data",
          name: 'data',
          component: () => import("../views/Feed/Member/CreateData.vue"),
        }
      ]
    },
  ]
})






export default router
