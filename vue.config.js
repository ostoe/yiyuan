const { VantResolver } = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");
// let jsconfig=require("./public/config.js");
// /* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const UglifyPlugin = require('uglifyjs-webpack-plugin')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
/*需要npm或者yarn 安装两个第三方
	npm i -D  uglifyjs-webpack-plugin 或 npm yarn add -D  uglifyjs-webpack-plugin
	npm i -D  compression-webpack-plugin 或 yarn add -D  compression-webpack-plugin
*/

function resolve (dir) {
  return path.join(__dirname, dir)
}


module.exports = {
  publicPath: "./", // 基本路径
  outputDir: "dist", // 输出文件目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  assetsDir: "static", //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  pages: {
    index: {
    entry: 'src/main.js', // 入口文件
    title: '华山医院核酸标记查询'
  }}, // 以多页模式构建应用程序。
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require("os").cpus().length > 1,
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
  // webpack配置
  //对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    //修改文件引入自定义路径
    config.resolve.alias
      .set('@', resolve('src'))
  },
  //调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  configureWebpack: (config) => {
    config.plugins.push(   
            ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
      );

    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'

      // 利用splitChunks将每个依赖包单独打包，在生产环境下配置
      // 开启gzip压缩
      // config.plugins.push(new CompressionWebpackPlugin({
      //   algorithm: 'gzip',
      //   test: /\.ts$|\.html$|\.json$|\.css/,
      //   threshold: 10240,
      //   minRatio: 0.8
      // }));
      // 开启分离js
      // config.optimization = {
      //   runtimeChunk: 'single',
      //   splitChunks: {
      //     chunks: 'all',
      //     maxInitialRequests: Infinity,
      //     minSize: 20000, // 依赖包超过20000bit将被单独打包
      //     cacheGroups: {
      //       vendor: {
      //         test: /[\\/]node_modules[\\/]/,
      //         name (module) {
      //           // get the name. E.g. node_modules/packageName/not/this/part.js
      //           // or node_modules/packageName
      //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
      //           // npm package names are URL-safe, but some servers don't like @ symbols
      //           return `${packageName.replace('@', '')}`
      //         }
      //       }
      //     }
      //   },
      //   minimizer: [new UglifyPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         warnings: false,
      //         drop_console: true, // console
      //         drop_debugger: false,
      //         pure_funcs: ['console.log'] // 移除console
      //       }
      //     }
      //   })]
      // };
      // 取消webpack警告的性能提示
      // config.performance = {
      //   hints: 'warning',
      //   //入口起点的最大体积
      //   maxEntrypointSize: 50000000,
      //   //生成文件的最大体积
      //   maxAssetSize: 30000000,
      //   //只给出 ts 文件的性能提示
      //   assetFilter: function (assetFilename) {
      //     return assetFilename.endsWith('.ts');
      //   }
      // }
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'

      // config.optimization = {
      //   runtimeChunk: 'single',
      //   splitChunks: {
      //     chunks: 'all',
      //     maxInitialRequests: Infinity,
      //     minSize: 20000, // 依赖包超过20000bit将被单独打包
      //     cacheGroups: {
      //       vendor: {
      //         test: /[\\/]node_modules[\\/]/,
      //         name (module) {
      //           // get the name. E.g. node_modules/packageName/not/this/part.js
      //           // or node_modules/packageName
      //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
      //           // npm package names are URL-safe, but some servers don't like @ symbols
      //           return `${packageName.replace('@', '')}`
      //         }
      //       }
      //     }
      //   }
      // };
    }
  },
  // css: {
  //   // 启用 CSS modules
  //   requireModuleExtension: false,
  //   // 是否使用css分离插件
  //   extract: true,
  //   // 开启 CSS source maps，一般不建议开启
  //   sourceMap: false,
  //   // css预设器配置项
  //   loaderOptions: {
  //     sass: {
  //       prependData: `@import "@/styles/global.scss";`
  //     },
  //   }
  // },
  pwa: {
  }, // PWA 插件相关配置
  // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
  devServer: { 
    host: '192.168.1.4', // TODO 改为部署虚拟机的地址
    // host: 'localhost',
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
        // target: 'http://localhost:8081', // 这里的端口是后端端口 改为后端uri
        // target: 'http://patient.tools.ifufan.com:80',
        target: "http://124.223.49.85:1112/NucleicPatientMark/",
        changeOrigin: true,
        secure: false,  // 如果是https接口，需要配置这个参数为true
        //ws: true,//websocket支持
        pathRewrite: { 
     // 路径重写
          '^/api':'',
        }
      }
    }
  },
  // configureWebpack: {

  // },
};
