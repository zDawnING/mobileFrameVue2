import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

import index from './modules/index'
import add from './modules/add'
import moreWait from './modules/more_wait'
import moreBegin from './modules/more_begin'
import upload from './modules/upload'

import register from '../common/modules/register'
import inputContent from '../common/modules/input_content'
import cropImg from '../common/modules/crop_img'
import routerManager from '../common/modules/router_manager'
import weixin from '../common/modules/weixin'

// import urls from 'm_store/urls'
// import * as Toast from 'c_vendor/toast.js'
// import status from 'c_store/status'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 开发环境下开启严格模式
  // strict: process.env.NODE_ENV !== 'production'
  modules: {
    index
  },
  state: {
    // user: {},
    // 页面状态
    pageState: {
      more: {
        // 暂时不用：该变量应付一种情况：如果用户访问的是未开始的链接但是实际上已经开始的话，就需要重定向，同时节省查询
        isLoadEnd: false
      }
    },
    // 回调函数
    callback: {

    },
    // 页面参数
    param: {
    }
  },
  // 根级别的mutations，如果过多，可以抽离成单独的文件
  mutations: {
    [types.PAGE_STATE_COMMON_MORE] (state, pageState) {
      for (var pro in pageState) {
        state.pageState.more[pro] = pageState[pro]
      }
    }
  },
  actions: {

  }
})

export default store
