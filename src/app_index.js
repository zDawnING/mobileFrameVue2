import Vue from 'vue'
import store from './store/index'
import router from './router/index'
import app from './app_index.vue'
import VueResource from 'vue-resource'
import URLs from './store/index/urls'
import FastClick from 'fastclick'
import RemConfig from './vendor/static/rem_config'

// 开发环境下，引入mockjs调试数据模块
if (process.env.NODE_ENV === 'development') {  
  require('./vendor/list/mocktest')
}

require('./less/list/common.less')
require('./less/static/bootstrap/dist/css/bootstrap.css')
require('./less/static/layer.css')

//由于使用vue-touch有使用上的缺点，这里则使用该插件
window.FastClick = FastClick

Vue.use(VueResource)

// Set default values using the global configuration.
// Vue.http.options.root = '/'
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk'
// send the request as application/x-www-form-urlencoded MIME type
Vue.http.options.emulateJSON = true

import * as Weixin from 'c_vendor/weixin.js'
import * as Toast from 'c_vendor/Toast.js'

// 检测当前环境配置是否生产环境，生产环境不启用微信授权
if (process.env.NODE_ENV === 'development') {  // 开发环境下，引入mockjs调试数据模块
  new Vue({
    router,
    store,
    render: h => h(app)
  }).$mount('#app')
} else {
  var loadIndex = Toast.load()
  Weixin.WXconfig(URLs.getApiWxConf, function () {
    Toast.close(loadIndex)
    new Vue({
      router,
      store,
      render: h => h(app)
    }).$mount('#app')
    // 一次绑定
    Weixin.weixinShareBind(store.state.weixin)
  })
}