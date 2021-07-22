import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {
  render,
  modifyClientRenderOpts,
  genMount as qiankun_genMount,
  genBootstrap as qiankun_genBootstrap,
  genUnmount as qiankun_genUnmount,
  genUpdate as qiankun_genUpdate,
} from "@winfe/vue-cli-plugin-qiankun/lib/slave/generator";

import antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

Vue.use(antd);

Vue.config.productionTip = false;

const clientRender = render(() => {
  new Vue(
    modifyClientRenderOpts({
      router,
      store,
      render: (h) => h(App),
    })
  ).$mount("#app");
});

export const bootstrap = qiankun_genBootstrap(clientRender);
export const mount = qiankun_genMount("app1");
export const unmount = qiankun_genUnmount("app1");
export const update = qiankun_genUpdate();

if (!window.__POWERED_BY_QIANKUN__) {
  bootstrap().then(mount);
}
