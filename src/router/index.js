import Vue from "vue"
import VueRouter from "vue-router"
// import { createRouter, createWebHistory } from "vue-router"
import SignIn from "../views/SignIn.vue"
import NotFound from "../views/NotFound.vue"
// import store from "./../store"

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

// 這個造成我的網頁會在登入之後 5 內跳轉回登入頁面
// from 使用者來自哪個路由 to 使用者要到哪個路由
// router.beforeEach(async (to, from, next) => {
// 呼叫 actions 使用 dispatch，表示分發
// store.dispatch("fetchCurrentUser")

//   next()
// })

export default router
