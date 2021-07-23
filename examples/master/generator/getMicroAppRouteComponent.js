import MicroApp from './MicroApp';

export function getMicroAppRouteComponent(opts) {
  const { base, history, appName, routeProps } = opts;

  const RouteComponent = {
    render(h) {
      // base是必须要设置的，由于vue-router没法拿到实际的path
      const { path } = this.$route;
      console.log('getMicroAppRouteComponent === path', path);

      // 默认取静态配置的 base
      const umiConfigBase = base ? (base === '/' ? '' : base) : '';
      console.log('getMicroAppRouteComponent === umiConfigBase', umiConfigBase);

      const extraPath = path.includes(umiConfigBase) ? path.split(umiConfigBase)[1] : path;
      console.log('getMicroAppRouteComponent === extraPath', extraPath);
      const runtimeMatchedBase =
        umiConfigBase +
        (extraPath.endsWith('/') ? extraPath.substr(0, extraPath.length - 1) : extraPath);
      const componentProps = {
        name: appName,
        base: base || runtimeMatchedBase,
        history,
        routeProps
      };

      console.log('getMicroAppRouteComponent === RouteComponent', componentProps);
      return h(MicroApp, { props: componentProps });
    }
  };

  return RouteComponent;
}
