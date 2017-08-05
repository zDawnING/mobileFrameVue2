import Vue from 'vue'
import Router from 'vue-router'
import store from 'l_store/index'
import * as Toast from 'c_vendor/toast.js'
// import STATUS from 'c_store/status'

Vue.use(Router)

import index from 'l_views/index.vue'


// import ui from 'l_views/ui.vue'
// import base from 'l_com/ui/base.vue'
// import control from 'l_com/ui/control.vue'
// import components from 'l_com/ui/components.vue'
// import componentsModal from 'l_com/ui/components/modal.vue'
// import componentsTab from 'l_com/ui/components/tab.vue'
// import componentsLayer from 'l_com/ui/components/layer.vue'
// import componentsImgbox from 'l_com/ui/components/imgbox.vue'

import * as Common from 'c_vendor/common.js'
import * as Weixin from 'c_vendor/weixin.js'

var commonNoInitPageBeforeEnter = function (to, from, next) {
  // 禁止微信分享
  Weixin.weixinShareForbid()
  var loadIndex = Toast.load()
  // 初始化页面数据，如果是新进来的页面，就需要初始化数据
  Common.isBack(to, from, store)
  Toast.close(loadIndex)
  next()
}

// var releaseRankBeforeEnter = function (to, from, next, isUpdate) {
//   // 禁止微信分享
//   Weixin.weixinShareForbid()
//   // 先判断页面权限
//   // 根据对应逻辑对页面状态信息进行修改
//   var loadIndex = Toast.load()
//   store.commit('AUTH_IS_LOGIN', {
//     successCallback () {
//       // 初始化页面数据，如果是新进来的页面，就需要初始化数据
//       if (Common.isBack(to, from, store) === false) {
//         // 接收页面参数
//         store.commit('PAGE_PARAM_RELEASE_RANK', {
//           id: to.params.id,
//           isCopy: to.params.isCopy
//         })
//         // 执行初始化数据操作
//         store.commit('PAGE_INIT_DATA_RELEASE_RANK', {
//           successCallback () {
//             var isUpdate = false
//             var isCopy = false
//             if (to.params.isCopy === 'copy') {
//               isCopy = true
//             }
//             if (to.params.id && isCopy === false) {
//               isUpdate = true
//             }
//             // 接着判断页面状态
//             store.commit('PAGE_STATE_RELEASE_RANK', {
//               isUpdate: isUpdate,
//               isCopy: isCopy
//             })
//             // 重新进来就设置滚动条为0
//             store.commit('PAGE_STATE_RELEASE_RANK', {
//               scrollTop: 0,
//               url: to.fullPath
//             })
//             Toast.close(loadIndex)
//             next()
//             store.state.inputContent.promise.action(to.fullPath)()
//             store.state.inputContent.promise.destroy()
//             store.state.selectChallenge.promise.action(to.fullPath)()
//             store.state.selectChallenge.promise.destroy()
//           },
//           failureCallback () {
//             Toast.close(loadIndex)
//             next()
//           }
//         })
//         store.dispatch('PAGE_INIT_DATA_RELEASE_RANK')
//       } else {
//         Toast.close(loadIndex)
//         next()
//         // // 执行承诺
//         store.state.inputContent.promise.action(to.fullPath)()
//         store.state.inputContent.promise.destroy()
//         store.state.selectChallenge.promise.action(to.fullPath)()
//         store.state.selectChallenge.promise.destroy()
//       }
//     },
//     failureCallback () {
//       // 跳转到注册页面进行处理
//       store.commit('REGISTER_ACTIVE', {
//         successCallback () {
//           // 执行成功之后再进入页面
//           router.replace(to.fullPath)
//         },
//         failureCallback () {
//           window.alert('failure')
//         }
//       })
//       Toast.close(loadIndex)
//       router.push('/register')
//     }
//   })
//   store.dispatch('AUTH_IS_LOGIN')
// }

var listPageBeforeEnter = function (to, from, next, pageName) {
  // 禁止微信分享
  Weixin.weixinShareForbid()
  var loadIndex = Toast.load()
  // 初始化页面数据，如果是新进来的页面，就需要初始化数据
  if (Common.isBack(to, from, store) === false) {
    // 执行初始化数据操作
    store.commit('PAGE_INIT_DATA_LIST', {
      successCallback () {
        store.commit('PAGE_STATE_LIST', {
          scrollTop: 0,
          url: to.fullPath
        })
        Toast.close(loadIndex)
        next()
      },
      failureCallback () {
        Toast.close(loadIndex)
        next()
      }
    })
    store.dispatch('PAGE_INIT_DATA_LIST')
  } else {
    Toast.close(loadIndex)
    next()
  }
}

const router = new Router({
  // mode: 'history',
  routes: [
    { path: '/login', component: login },
    {
      path: '/register',
      component: register,
      beforeEnter: (to, from, next) => {
        commonNoInitPageBeforeEnter(to, from, next)
      }
    },
    {
      path: '/list',
      component: list,
      beforeEnter: (to, from, next) => {
        listPageBeforeEnter(to, from, next)
      }
    },
    {
      path: '/',
      component: list,
      beforeEnter: (to, from, next) => {
        listPageBeforeEnter(to, from, next)
      }
    },
    {
      path: '/ui',
      component: ui,
      children: [
        {
          path: 'base',
          component: base
        },
        {
          path: 'control',
          component: control
        },
        {
          path: 'components',
          component: components,
          children: [
            {
              path: 'modal',
              component: componentsModal
            },
            {
              path: 'tab',
              component: componentsTab
            },
            {
              path: 'layer',
              component: componentsLayer
            },
            {
              path: 'imgbox',
              component: componentsImgbox
            }
          ]
        }
      ]
    }
  ]
})

export default router
