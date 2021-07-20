
const port = process.env.port || process.env.npm_config_port || 8080 // 端口

module.exports = {

  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    port: port,
    open: true,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:8081`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    disableHostCheck: true
  },
  chainWebpack: config => {//自定义打包入口
    config.when(process.env.NODE_ENV === 'production',config => {//发布模式
      config.entry('app').clear().add('./src/main-prod.js');

      config.set('externals',{
        vue: 'vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-quill-editor': 'VueQuillEditor'
      });
    });

    config.when(process.env.NODE_ENV === 'development',config => {
      config.entry('app').clear().add('./src/main-dev.js');
    })
  },
}
