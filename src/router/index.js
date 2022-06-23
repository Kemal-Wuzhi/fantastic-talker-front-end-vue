import Vue from "vue"
import VueRouter from "vue-router"
// import { createRouter, createWebHistory } from "vue-router"
import SignIn from "../views/SignIn.vue"
import NotFound from "../views/NotFound.vue"
import store from "./../store"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/signin",
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignUp.vue"),
  },
  {
    path: "/mainpage",
    name: "mainpage",
    component: () => import("../views/MainPage.vue"),
    children: [
      {
        path: "/teachers",
        name: "teacher-introduction",
        component: () => import("../views/TeachersIntro.vue"),
      },
    ],
  },
  {
    path: "/teachers/:id",
    name: "teacher",
    component: () => import("../views/TeacherIntro.vue"),
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("../views/SettingPage.vue"),
  },

  {
    path: "/user-profile/:userId",
    name: "user-profile",
    redirect: "/user-profile",
    component: () => import("../views/UserProfile.vue"),
    children: [],
  },

  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
]

const router = new VueRouter({
  linkExactActiveClass: "active",
  mode: "history",
  routes,
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token")
  const tokenInStore = store.state.token

  let isAuthenticated = store.state.isAuthenticated

  if (token && token !== tokenInStore) {
    isAuthenticated = await store.dispatch("fetchCurrentUser")
  }

  const pathsWithoutAuthentication = ["signin", "signup"]

  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next("/signin")
    return
  }

  // 如果 token 有效，且要去登入和註冊頁，則轉址到首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next("/mainpage")
    return
  }

  next()
})

export default router
