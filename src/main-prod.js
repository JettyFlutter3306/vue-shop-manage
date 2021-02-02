import Vue from 'vue'
import './plugins/axios.js'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css' // 导入全局样式表
import './assets/js/storage'  // 导入localstorage配置文件
import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from "vue-quill-editor/src"; //导入富文本编辑器
import 'quill/dist/quill.core.css'  //导入富文本编辑器对应的样式
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false
Vue.component('tree-table',TreeTable)
Vue.use(VueQuillEditor) //将富文本编辑器注册为全局可用的组件

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
