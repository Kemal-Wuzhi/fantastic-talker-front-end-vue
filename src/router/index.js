import { createRouter, createWebHistory } from "vue-router"
// 每次載入時都會看到

import NotFound from "../views/NotFound.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound }],
})

export default router
