import concat from 'lodash/concat';
import mergeWith from 'lodash/mergeWith';
import noop from 'lodash/noop';
import { loadMicroApp, prefetchApps } from 'qiankun';
import MicroAppLoader from './MicroAppLoader';
import { getMasterOptions } from './masterOptions';

const qiankunStateForSlaveModelNamespace = '@@qiankunStateForSlave';

function unmountMicroApp(microApp) {
  if (microApp) {
    microApp.mountPromise.then(() => microApp.unmount());
  }
}

let noneMounted = true;

export default {
  data() {
    return {
      containerRef: 'app1',
      microAppRef: null,
      updatingPromise: null,
      loading: true,
      updatingTimestamp: Date.now(),
      stateForSlave: noop(qiankunStateForSlaveModelNamespace) || {}
    };
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    base: {
      type: String,
      default: ''
    },
    history: {
      type: String,
      default: ''
    },
    routeProps: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {
    this.init();
  },
  camputed: {
    propsValue() {
      return Object.values({ ...this.stateForSlave, ...this.$props });
    }
  },
  watch: {
    name: 'init',
    propsValue: 'statChange'
  },
  methods: {
    getAppConfig() {
      const {
        apps = [],
        lifeCycles: globalLifeCycles,
        prefetch = true,
        globalSettings
      } = getMasterOptions();

      const appConfig = apps.find((app) => app.name === this.name);
      if (!appConfig) {
        throw new Error(`Can not find the configuration of ${name} app!`);
      }
      return { ...appConfig, globalSettings, globalLifeCycles, prefetch };
    },
    setLoading(value) {
      this.loading = value;
    },
    init() {
      const { settings: settingsFromProps = {}, lifeCycles, ...propsFromParams } = this.routeProps;

      const {
        entry,
        props: propsFromConfig = {},
        globalSettings,
        globalLifeCycles,
        prefetch
      } = this.getAppConfig();

      const configuration = {
        ...globalSettings,
        ...settingsFromProps
      };

      console.log('microProps===props==propsFromConfig', propsFromConfig);
      console.log('microProps===props==stateForSlave', this.stateForSlave);
      console.log('microProps===props==propsFromParams', propsFromParams);

      console.log('microProps===props', {
        ...propsFromConfig,
        ...this.stateForSlave,
        base: this.base,
        history: this.history,
        ...propsFromParams,
        setLoading: this.setLoading
      });
      console.log('microProps===configuration', configuration);
      console.log(
        'microProps===other',
        mergeWith({}, globalLifeCycles, lifeCycles, (v1, v2) => concat(v1 ?? [], v2 ?? []))
      );

      this.microAppRef = loadMicroApp(
        {
          name: this.name,
          entry,
          container: this.$refs[this.containerRef],
          props: {
            ...propsFromConfig,
            ...this.stateForSlave,
            base: this.base,
            history: this.history,
            ...propsFromParams,
            setLoading: this.setLoading
          }
        },
        configuration,
        mergeWith({}, globalLifeCycles, lifeCycles, (v1, v2) => concat(v1 ?? [], v2 ?? []))
      );

      // 当配置了 prefetch true 时，在第一个应用 mount 完成之后，再去预加载其他应用
      if (prefetch && prefetch !== 'all' && noneMounted) {
        this.microAppRef?.mountPromise.then(() => {
          if (noneMounted) {
            const { apps = [] } = getMasterOptions();
            const otherNotMountedApps = apps.filter((app) => app.name !== name);
            prefetchApps(otherNotMountedApps, configuration);
            noneMounted = false;
          }
        });
      }

      return () => unmountMicroApp(this.microAppRef);
    },
    statChange() {
      const { props: propsFromConfig = {} } = this.getAppConfig();
      const stateForSlave = noop(qiankunStateForSlaveModelNamespace);

      const { name, ...propsFromParams } = this.props;

      const microApp = this.microAppRef;
      if (microApp) {
        if (!this.updatingPromise) {
          // 初始化 updatingPromise 为 microApp.mountPromise，从而确保后续更新是在应用 mount 完成之后
          this.updatingPromise = microApp.mountPromise;
        } else {
          // 确保 microApp.update 调用是跟组件状态变更顺序一致的，且后一个微应用更新必须等待前一个更新完成
          this.updatingPromise = this.updatingPromise.then(() => {
            const canUpdate = (microApp) => microApp?.update && microApp.getStatus() === 'MOUNTED';
            if (canUpdate(microApp)) {
              const props = {
                ...propsFromConfig,
                ...stateForSlave,
                ...propsFromParams,
                setLoading: this.setLoading
              };

              if (process.env.NODE_ENV === 'development') {
                if (Date.now() - this.updatingTimestamp < 200) {
                  console.warn(
                    `It seems like microApp ${name} is updating too many times in a short time(200ms), you may need to do some optimization to avoid the unnecessary re-rendering.`
                  );
                }

                console.info(`MicroApp ${name} is updating with props: `, props);
                this.updatingTimestamp = Date.now();
              }

              // 返回 microApp.update 形成链式调用
              // @ts-ignore
              return microApp.update(props);
            }
          });
        }
      }

      return () => {};
    }
  },
  render(h) {
    debugger;
    // 未配置自定义 loader 且开启了 autoSetLoading 场景下，使用插件默认的 loader，否则使用自定义 loader
    const { loader, autoSetLoading, wrapperClassName, className } = this.routeProps;
    const microAppLoader = loader || (autoSetLoading ? MicroAppLoader : null);
    return microAppLoader
      ? h(
          'div',
          {
            style: { position: 'relative' },
            class: wrapperClassName
          },
          [
            h(microAppLoader(this.loading)),
            h('div', {
              ref: this.containerRef,
              class: className
            })
          ]
        )
      : h('div', {
          ref: this.containerRef,
          class: className
        });
  }
};
