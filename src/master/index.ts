function isMasterEnable(options: any) {
  return !!options.pluginOptions?.qiankun?.master || !!process.env.INITIAL_QIANKUN_MASTER_OPTIONS;
}
module.exports = function QiankunMaster(api: any, options: any) {
  if (isMasterEnable(options)) {
    console.log('QiankunMaster');
  }
};
