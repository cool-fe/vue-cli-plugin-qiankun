module.exports = function PluginQiankun(api: any, options: any) {
  const master = require('./master');
  const slave = require('./slave');
  master.default(api, options);
  slave.default(api, options);
};
