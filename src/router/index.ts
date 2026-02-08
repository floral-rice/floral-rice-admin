import {createRouter, createWebHistory} from "vue-router";
import routes from 'virtual:generated-pages'
import { setupLayouts } from "virtual:generated-layouts";


export const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes)
})