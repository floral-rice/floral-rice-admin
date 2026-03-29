import { createRouter, createWebHistory } from "vue-router";
import generatedRoutes from "virtual:generated-pages";
import { setupLayouts } from "virtual:generated-layouts";
import { TOKEN } from "../constant";
import { getToken } from "@/utils";

export const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(generatedRoutes),
});

const WHITE_LIST = ["/login"];

router.beforeEach((to, from, next) => {
  if (WHITE_LIST.includes(to.path)) {
    next();
    return;
  }
  const token = getToken();

  if (!token) {
    next("/login");
    return;
  }
  if (to.path === "/") {
    next("/home");
    return;
  }
  next();
});
