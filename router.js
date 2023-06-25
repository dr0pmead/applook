import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import TwentyFortyEight from '@/views/TwentyFortyEight.vue';
import TicTakToe from '@/views/TicTakToe.vue'
import SnakeGame from '@/views/SnakeGame.vue'

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
  {
    path: '/TicTakToe',
    name: 'TicTakToe',
    component: TicTakToe,
  },
  {
    path: '/snake',
    name: 'SnakeGame',
    component: SnakeGame,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
