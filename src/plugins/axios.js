'use strict'

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'//导入nprogress
import 'nprogress/nprogress.css'
import {Loading} from 'element-ui'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
axios.defaults.headers['Authorization'] = "";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 30 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control  重要!!!
  baseURL: process.env.VUE_APP_BASE_URL,
}

const _axios = axios.create(config)

let loadingInstance;

_axios.interceptors.request.use(
  function (config) {
    NProgress.start();//开启进度条
    loadingInstance = Loading.service({
      text: '加载中...',
    });

    config.headers['Authorization'] = window.localStorage.getItem('Authorization');

    if(config.method === "post"){
      config.data = qs.stringify(config.data);
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }


    return config // Do something before request is sent
  },
  function (error) {

    return Promise.reject(error) // Do something with request error
  }
);

_axios.interceptors.response.use( // Add a response interceptor
  function (response) {

    setTimeout(() => {
      loadingInstance.close();
    },350);

    setTimeout(() => {
      NProgress.done();
    },350);



    return response // Do something with response data
  },
  function (error) {

    return Promise.reject(error) // Do something with response error
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $ajax: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
