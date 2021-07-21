module.exports = {
  pluginOptions: {
    qiankun: {
      master: {
        apps: [
          {
            name: "app1",
            entry: "http://localhost:8001/app1",
            props: {
              test1: "app1-test1",
            },
          },
          {
            name: "app2",
            entry: "http://localhost:8002/app2",
          },
          {
            name: "app3",
            entry: "http://localhost:8003/app3",
          },
        ],
      },
    },
  },
  devServer: {
    compress: true,
    disableHostCheck: true,
    proxy: {
      "/api/app1/users": {
        target: "http://localhost:8001",
        changeOrigin: true,
      },
    },
  },
};
