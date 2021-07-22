import React from "react";
import qiankunRender, { clientRenderOptsStack } from "./lifecycles";
import { Context } from "@@/plugin-qiankun/qiankunContext";

export { genMount, genBootstrap, genUnmount, genUpdate } from "./lifecycles";

export const render = (oldRender: any) => {
  return qiankunRender().then(oldRender);
};

export function modifyClientRenderOpts(memo: any) {
  // 每次应用 render 的时候会调 modifyClientRenderOpts，这时尝试从队列中取 render 的配置
  const clientRenderOpts = clientRenderOptsStack.shift();

  return {
    ...memo,
    ...clientRenderOpts,
  };
}

export default (api) => {
  api.render("./lifecycles.ts");
  api.render("./qiankunModel.ts");
  api.render("./slaveOptions.js");

  api.injectImports(
    api.entryFile,
    `import {genMount as qiankun_genMount,genBootstrap as qiankun_genBootstrap,genUnmount as qiankun_genUnmount,genUpdate as qiankun_genUpdate} from "./lifecycles"`
  );
  api.afterInvoke(() => {
    const fs = require("fs");
    const { EOL } = require("os");
    let contentMain = fs.readFileSync(api.resolve(api.entryFile), {
      encoding: "utf-8",
    });
    contentMain += `
    export const bootstrap = qiankun_genBootstrap(clientRender);
    export const mount = qiankun_genMount('${api.config.mountElementId}');
    export const unmount = qiankun_genUnmount('${api.config.mountElementId}');
    export const update = qiankun_genUpdate();

    if (!window.__POWERED_BY_QIANKUN__) {
      bootstrap().then(mount);
    }`;
    fs.writeFileSync(api.entryFile, contentMain.join(EOL), {
      encoding: "utf-8",
    });
  });
};
