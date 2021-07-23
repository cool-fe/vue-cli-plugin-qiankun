const pkg = require('./package.json');

module.exports = {
  pluginOptions: {
    qiankun: {
      slave: {}
    }
  },
  chainWebpack(config) {
    config.output.libraryTarget('umd').library(`${pkg.name}-[name]`);
    config.output.jsonpFunction(`webpackJsonp_${pkg.name}`);
  },
  devServer: {
    compress: true,
    disableHostCheck: true,
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
};
