import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'

import VueQuillEditor from "vue-quill-editor/src"; //导入富文本编辑器
import SlideVerify from 'vue-monoplasty-slide-verify'
import router from './router'
import store from './store'

import './plugins/axios.js'
import './plugins/element.js'
import './assets/css/global.css' // 导入全局样式表
import 'quill/dist/quill.core.css'  //导入富文本编辑器对应的样式
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false
Vue.use(VueQuillEditor) //将富文本编辑器注册为全局可用的组件
Vue.use(SlideVerify);//注册验证码组件
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
