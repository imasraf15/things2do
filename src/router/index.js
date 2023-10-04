import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "stickywall",
    component: () =>
      import("../pages/StickyWall.vue"),
  }  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
