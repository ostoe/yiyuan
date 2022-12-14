const { VantResolver } = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");

module.exports = {
  devServer: { 
    host: '172.20.10.3', // TODO 改为部署虚拟机的地址
    port: 8080,
    open: false,
    overlay: { 
      warnings: false,
      errors: true
    },
    proxy: { 
    // vue2.x版本为 proxyTable，vue3.x为proxy。
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '^/api': {
        target: 'http://localhost:8081', // 这里的端口是后端端口 改为后端uri
        changeOrigin: true,
        secure: false,  // 如果是https接口，需要配置这个参数为true
        pathRewrite: { 
     // 路径重写
          '^/api':'',
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
};
