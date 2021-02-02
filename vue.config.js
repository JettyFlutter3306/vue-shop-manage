module.exports = {
  lintOnSave: false,
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
