import { createRouter, createWebHistory } from "vue-router"
// 每次載入時都會看到
import HomeView from "../views/HomeView.vue"
import NotFound from "../views/NotFound.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
})

export default router
