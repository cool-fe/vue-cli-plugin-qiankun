import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { render } from '@winfe/vue-cli-plugin-qiankun/es/master/generator';

import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(antd);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: render((h) => h(App))
}).$mount('#app');
