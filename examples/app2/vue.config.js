module.exports = {
  devServer: {
    compress: true,
    disableHostCheck: true,
    proxy: {
      '/api/app1/users': {
        target: 'http://localhost:8001',
        changeOrigin: true,
      },
    },
  },
};
