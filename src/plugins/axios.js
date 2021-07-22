import Vue from 'vue'
import axios from 'axios'
import NProgress from 'nprogress'//导入nprogress
import 'nprogress/nprogress.css'
import {Message, Notification} from 'element-ui'
import errorCode from '@/util/error-code'
import router from "@/router";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
axios.defaults.headers['Authorization'] = "";
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 30 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control  重要!!!
  baseURL: process.env.VUE_APP_BASE_URL,
}

const request = axios.create(config)

let loadingInstance;

// if(config.method === "post"){
//   config.data = qs.stringify(config.data);
//   config.headers["Content-Type"] = "application/x-www-form-urlencoded";
// }
request.interceptors.request.use((config) => {
    NProgress.start();//开启进度条

    // loadingInstance = Loading.service({
    //   text: '加载中...',
    // });

    config.headers['Authorization'] = window.localStorage.getItem('Authorization');

    return config // Do something before request is sent
  }, (error) => {

    return Promise.reject(error) // Do something with request error
  }
);

request.interceptors.response.use((response) => {

  console.log(response.data)

  // setTimeout(() => {
  //   loadingInstance.close();
  // },350);

  setTimeout(() => {
    NProgress.done();
  },350);

  const code = response.data.code || 200;  //未设置状态码则默认是成功状态

  const msg = errorCode[code] || response.data.msg || errorCode['default'];  //获取错误信息

  if(code === 500){
    Message({
      message: msg,
      type: 'error'
    })

    return Promise.reject(new Error(msg))
  }else if (code !== 200){
    Notification.error({
      title: msg
    })

    return Promise.reject('error')
  }else{
    return response.data
  }

  }, (error) => {

  const status = error.response.status;
  const msg = error.response.data.msg;

  Notification.error({
    title: msg
  })

  if(status === 401){
    window.localStorage.clear();

    return router.push("/");
  }

  return Promise.reject(error) // Do something with response error
})

Plugin.install =  (Vue, options) => {
  Vue.axios = request
  window.axios = request

  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return request
      }
    },
    $ajax: {
      get () {
        return request
      }
    }
  })
}

Vue.use(Plugin)

export default request
