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
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
]

// export const router = createRouter({
//   history: createWebHistory(),
//     { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
//   ],
// })

const router = new VueRouter({
  linkExactActiveClass: "active",
  mode: "history",
  routes,
})

router.beforeEach(async (to, from, next) => {
  store.dispatch("fetchCurrentUser")

  next()
})

export default router
