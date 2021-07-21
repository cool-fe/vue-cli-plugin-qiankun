import { prefetchApps } from "qiankun";
import {
  getMasterRuntime,
  getMasterOptions,
  setMasterOptions,
} from "./masterOptions";
import { getMicroAppRouteComponent } from "./getMicroAppRouteComponent";

import { patchMicroAppRoute } from "./common";

let microAppRuntimeRoutes;

export function render(oldRender) {
  return (h) => {
    const runtimeOptions = getMasterRuntime();
    let masterOptions = {
      ...getMasterOptions(),
      ...runtimeOptions,
    };

    const credentialsApps = masterOptions.apps.filter((app) => app.credentials);
    if (credentialsApps.length) {
      const defaultFetch = masterOptions.fetch || window.fetch;
      const fetchWithCredentials = (url, init) => {
        // 如果当前 url 为 credentials 应用的 entry，则为其加上 cors 相关配置
        if (credentialsApps.some((app) => app.entry === url)) {
          return defaultFetch(url, {
            ...init,
            mode: "cors",
            credentials: "include",
          });
        }

        return defaultFetch(url, init);
      };

      // 设置新的 fetch
      masterOptions = { ...masterOptions, fetch: fetchWithCredentials };
    }

    // 更新 master options
    setMasterOptions(masterOptions);

    const { apps, routes, ...options } = masterOptions;
    microAppRuntimeRoutes = routes;

    Promise.resolve().then(() => {
      // 未使用 base 配置的可以认为是路由关联或者使用标签装载的应用
      const loadableApps = apps.filter((app) => !app.base);
      if (loadableApps.length) {
        const { prefetch, ...importEntryOpts } = options;
        if (prefetch === "all") {
          prefetchApps(loadableApps, importEntryOpts);
        } else if (Array.isArray(prefetch)) {
          const specialPrefetchApps = loadableApps.filter(
            (app) => prefetch.indexOf(app.name) !== -1
          );
          prefetchApps(specialPrefetchApps, importEntryOpts);
        }
      }
    });

    // 主应用相关的配置注册完毕后即可开启渲染
    return oldRender(h);
  };
}

export function patchRoutes(opts) {
  if (microAppRuntimeRoutes) {
    const getRootRoutes = (routes) => {
      const rootRoute = routes.find((route) => route.path === "/");
      if (rootRoute) {
        // 如果根路由是叶子节点，则直接返回其父节点
        if (!rootRoute.routes?.length) {
          return routes;
        }

        return getRootRoutes(rootRoute.routes);
      }

      return routes;
    };

    const { routes } = opts;
    const rootRoutes = getRootRoutes(routes);
    if (rootRoutes) {
      const { routeBindingAlias, base, masterHistoryType } = getMasterOptions();
      microAppRuntimeRoutes.reverse().forEach((microAppRoute) => {
        patchMicroAppRoute(microAppRoute, getMicroAppRouteComponent, {
          base,
          masterHistoryType,
          routeBindingAlias,
        });
        rootRoutes.unshift(microAppRoute);
      });
    }
  }
}
