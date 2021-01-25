import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Step1 from '../views/signup/Step1.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/signup/Step1',
    name: 'SignupStep1',
    component: () => import('../views/signup/Step1.vue'),
  },
  {
    path: '/signup/Step2',
    name: 'SignupStep2',
    component: () => import('../views/signup/Step2.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
