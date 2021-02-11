import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import firebase from 'firebase';
import 'firebase/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../views/signin/SignIn.vue'),
  },
  {
    path: '/profiles',
    name: 'Profiles',
    component: () => import('../views/Profiles.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/ManageProfiles',
    name: 'ManageProfiles',
    component: () => import('../views/ManageProfiles.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/browse',
    name: 'Browse',
    component: () => import('../views/Browse.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next('/signin');
  } else {
    next();
  }
});

export default router;
