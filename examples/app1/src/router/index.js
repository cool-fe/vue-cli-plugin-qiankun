import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/app2',
    name: 'App2',
    component: () => import(/* webpackChunkName: "about" */ '../views/App2.vue')
  },
  {
    path: '/app3',
    microApp: 'app3',
    settings: {
      singular: false
    },
    microAppProps: {
      autoSetLoading: true,
      className: 'appClassName',
      wrapperClassName: 'wrapperClass'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
