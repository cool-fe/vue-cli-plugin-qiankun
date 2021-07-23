import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import {
  render,
  modifyClientRenderOpts,
  genMount as qiankun_genMount,
  genBootstrap as qiankun_genBootstrap,
  genUnmount as qiankun_genUnmount,
  genUpdate as qiankun_genUpdate
} from '@winfe/vue-cli-plugin-qiankun/es/slave/generator';

import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(antd);

Vue.config.productionTip = false;

const microRender = () => {
  const options = modifyClientRenderOpts({
    router,
    store,
    render: (h) => h(App)
  });
  new Vue(options).$mount(options.el);
};

// 首次渲染
render(microRender);

export const bootstrap = qiankun_genBootstrap(microRender);
export const mount = qiankun_genMount('app');
export const unmount = qiankun_genUnmount('app');
export const update = qiankun_genUpdate();

if (!window.__POWERED_BY_QIANKUN__) {
  bootstrap().then(mount);
}
