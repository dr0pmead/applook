import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import TwentyFortyEight from '@/views/TwentyFortyEight.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/2048',
    name: 'TwentyFortyEight',
    component: TwentyFortyEight,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
