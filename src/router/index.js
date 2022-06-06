import { createRouter, createWebHistory } from "vue-router"
// 每次載入時都會看到
import SignIn from "../views/SignIn.vue"
import NotFound from "../views/NotFound.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
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
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
})

export default router
