import { createRouter, createWebHistory } from 'vue-router';
import MainContent from '@/components/MainContent.vue';
import SignUp from '@/components/SignUp.vue';
import AddPostComponent from '@/components/AddPostComponent.vue';
import PostPage from '@/components/PostPage.vue';
import CreateUser from '@/components/CreateUser.vue';
import auth from './auth';

const routes = [
  {
    path: '/',
    name: 'MainContent',
    component: MainContent,
    meta: { requiresAuth: true }, 
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/post',
    name: 'Post',
    component: AddPostComponent,
    meta: { requiresAuth: true },
  },
  {
    path: '/post/:id',
    name: 'PostPage',
    component: PostPage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/register',
    name: 'Registration',
    component: CreateUser,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = await auth.authenticated();

  if (requiresAuth && !isAuthenticated) {
    next('/signup'); 
  } else {
    next(); 
  }
});

export default router;