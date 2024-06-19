import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import TipManagement from '../views/TipManagement.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'TipManagement',
    component: TipManagement
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), 
  routes
});

export default router;
