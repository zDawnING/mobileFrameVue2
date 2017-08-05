import * as types from '../types'
import Vue from 'vue'
import urls from '../urls'
import * as Toast from 'c_vendor/toast.js'
import * as Common from 'c_vendor/common.js'

var getDefaultPageState = function () {
  return {
    scrollTop: 0,
    url: '',
    
    list: [],
    curPage: 1,
    count: 0,
    pageSize: 10
  }
}

const moduleIndex = {
  // 保存 vue 中的状态，在模块里面，这里的状态相对于其他模块是局部的。
  state: {
    // 页面状态
    pageState: getDefaultPageState(),
    // 回调函数
    callback: {
      initSuccessCallback: function () {},
      initFailureCallback: function () {}
    },
    // 页面参数
    param: {
      showState: ''
    },
    // 页面承诺
    promise: {
      // 实现承诺对象
      url: '',
      // 承诺的动作
      action: function (url) {
        // console.log('action', this)
        if (this.url === url) {
          return this.bindAction(this.actionParam)
        } else {
          return function () {}
        }
      },
      // 被绑定的动作
      bindAction: function () {},
      // 动作参数
      actionParam: '',
      // 销毁promise的action
      destroy: function () {
        this.bindAction = function () {
          return function () {}
        }
        this.actionParam = ''
      }
    }
  },
  // 为了使得我们可以方便地跟踪每一个状态的变化，你不能直接改变 store 中的状态。
  // 改变 store 中的状态的唯一途径就是显式地提交(commit) mutations。
  mutations: {
    [types.PAGE_STATE_INDEX] (state, pageState) {
      console.log('PAGE_STATE_INDEX', pageState)
      for (var pro in pageState) {
        state.pageState[pro] = pageState[pro]
      }
    },
    [types.PAGE_PARAM_INDEX] (state, param) {
      console.log('PAGE_PARAM_INDEX', param)
      for (var pro in param) {
        state.param[pro] = param[pro]
      }
    },
    [types.PAGE_INIT_DATA_INDEX] (state, callback) {
      console.log('PAGE_INIT_DATA_INDEX', callback)
      state.callback.initSuccessCallback = callback.successCallback
      state.callback.initFailureCallback = callback.failureCallback
    },
    [types.PAGE_PROMISE_INDEX] (state, promiseObj) {
      console.log('PAGE_PROMISE_INDEX', promiseObj)
      for (var pro in promiseObj) {
        state.promise[pro] = promiseObj[pro]
      }
    }
  },
  actions: {
    // 查询函数
    [types.PAGE_QUERY_LIST_HALL_INDEX] (context) {
      if (context.state.pageState.hallIsLoad === true) {
        return
      }
      context.commit(types.PAGE_STATE_INDEX, {
        hallIsLoad: true,
        hallIsEnd: false
      })
      Vue.http.post(urls.myMilitaryHallList, {
        'cur_page': context.state.pageState.hallCurPage,
        'page_size': context.state.pageState.hallPageSize
      }).then(function (res) {
        var data = res.data
        Toast.response(data, false, function () {
          var page = 0
          if (data.data.list.length <= 0) {
            // Toast.show('没有更多数据了~')
            context.commit(types.PAGE_STATE_INDEX, {
              hallIsEnd: true
            })
            // 维持页数
            page = context.state.pageState.hallCurPage
          } else {
            page = context.state.pageState.hallCurPage + 1
          }
          context.commit(types.PAGE_STATE_INDEX, {
            hallCount: data.data.count,
            hallList: Common.mergeList(context.state.pageState.hallList, data.data.list),
            hallCurPage: page
          })
        }, true, function () {

        })
      }, function (error) {
          // errorCallback
        console.log(error)
        Toast.netError()
      }).then(function () {
        context.commit(types.PAGE_STATE_INDEX, {
          hallIsLoad: false
        })
      })
    },
    [types.PAGE_INIT_DATA_INDEX] (context) {
      console.log('action_index_init')
      context.commit(types.PAGE_STATE_INDEX, getDefaultPageState())
      context.state.callback.initSuccessCallback()
    }
  }
}

export default moduleIndex
