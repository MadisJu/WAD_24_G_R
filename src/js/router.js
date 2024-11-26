import { createRouter, createWebHistory } from 'vue-router';
import MainContent from '../components/MainContent.vue';
import SignUp from '../components/SignUp.vue';

const routes = [
  {
    path: '/',
    name: 'MainContent',
    component: MainContent,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;