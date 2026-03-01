import { createRouter, createWebHistory } from 'vue-router';
import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';

export const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(generatedRoutes),
});

router.beforeEach((to, from, next) => {
  console.log(to, from);
  
  if (to.path === '/') {
    next('/home');
    return;
  }
  next()
})