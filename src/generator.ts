module.exports = (api: any) => {
  const master = require('./master/generator');
  const slave = require('./slave/generator');
  master.default(api);
  slave.default(api);
};
