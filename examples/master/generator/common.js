export const defaultMountContainerId = 'root-subapp';

// @formatter:off
export const noop = () => {};
// @formatter:on

//@ts-ignore
export function toArray(source) {
  return Array.isArray(source) ? source : [source];
}

//@ts-ignore
export function patchMicroAppRoute(route, getMicroAppRouteComponent, masterOptions) {
  const { base, masterHistoryType, routeBindingAlias } = masterOptions;
  // 当配置了 routeBindingAlias 时，优先从 routeBindingAlias 里取配置，但同时也兼容使用了默认的 microApp 方式
  const microAppName = route[routeBindingAlias] || route.microApp;
  const microAppProps = route[`${routeBindingAlias}Props`] || route.microAppProps || {};
  if (microAppName) {
    if (route.routes?.length) {
      //@ts-ignore
      const childrenRouteHasComponent = route.routes.some((r) => r.component);
      if (childrenRouteHasComponent) {
        throw new Error(
          `You can not attach micro app ${microAppName} to route ${route.path} whose children has own component!`
        );
      }
    }

    route.exact = false;

    const { settings = {}, ...componentProps } = microAppProps;
    const routeProps = {
      // 兼容以前的 settings 配置
      settings: route.settings || settings || {},
      ...componentProps
    };
    const opts = {
      appName: microAppName,
      base,
      masterHistoryType,
      routeProps
    };
    route.component = getMicroAppRouteComponent(opts);
  }
}
