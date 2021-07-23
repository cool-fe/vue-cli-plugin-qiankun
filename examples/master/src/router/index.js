import Vue from 'vue';
import VueRouter from 'vue-router';
import { patchRoutes } from '@winfe/vue-cli-plugin-qiankun/es/master/generator';
import { getMicroAppRouteComponent } from '@winfe/vue-cli-plugin-qiankun/es/master/generator/getMicroAppRouteComponent';
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
  },
  {
    path: '/app1*',
    microApp: 'app1',
    settings: {
      singular: false
    },
    microAppProps: {
      autoSetLoading: true,
      className: 'appClassName',
      wrapperClassName: 'wrapperClass'
    },
    component: (() => {
      return getMicroAppRouteComponent({
        appName: 'app1',
        base: '/app1',
        history: 'browser',
        routeProps: {
          settings: { singular: false },
          autoSetLoading: true,
          className: 'appClassName',
          wrapperClassName: 'wrapperClass'
        }
      });
    })()
  }
];

patchRoutes({ routes });

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
