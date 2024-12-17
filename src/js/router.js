import { createRouter, createWebHistory } from 'vue-router';
import MainContent from '@/components/MainContent.vue';
import SignUp from '@/components/SignUp.vue';
import AddPostComponent from '@/components/AddPostComponent.vue';
import PostPage from '@/components/PostPage.vue';

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
  {
    path: '/post',
    name: 'Post',
    component: AddPostComponent,
  },
  {
    path: '/post/:id',
    name: 'PostPage',
    component: PostPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;