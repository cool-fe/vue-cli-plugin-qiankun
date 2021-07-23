/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/extensions
const { isEqual } = require('lodash');

function isSlaveEnable(options: any) {
  return (
    !!options.pluginOptions?.qiankun?.slave ||
    isEqual(options.pluginOptions?.qiankun, {}) ||
    !!process.env.INITIAL_QIANKUN_SLAVE_OPTIONS
  );
}

exports.isSlaveEnable = isSlaveEnable;

//@ts-ignore
module.exports = function QiankunSlave(api: any, options: any) {
  if (isSlaveEnable(options)) {
    console.log('QiankunSlave');
    const initialSlaveOptions = {
      devSourceMap: true,
      ...JSON.parse(process.env.INITIAL_QIANKUN_SLAVE_OPTIONS || '{}'),
      ...(options.pluginOptions.qiankun || {}).slave
    };

    options.pluginOptions.qiankun.slave = initialSlaveOptions;

    // modify public
    const { publicPath } = options;
    const { shouldNotModifyRuntimePublicPath } = (options.pluginOptions.qiankun || {}).slave!;

    if (publicPath === true && !shouldNotModifyRuntimePublicPath) {
      return `window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || "${publicPath || '/'}"`;
    }

    api.chainWebpack((config: any) => {
      config.output.libraryTarget('umd').library(`${api.service.pkg.name}-[name]`);
      config.output.jsonpFunction(`webpackJsonp_${api.service.pkg.name}`);

      return config;
    });
  }
};
