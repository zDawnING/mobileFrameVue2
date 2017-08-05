import * as types from '../types'
import * as Toast from 'c_vendor/toast.js'
const moduleWeixin = {
  // 保存 vue 中的状态，在模块里面，这里的状态相对于其他模块是局部的。
  state: {
    title: '',
    desc: '',
    link: '',
    imgUrl: '',
    trigger: function (res) {
      // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
      // alert('用户点击发送给朋友');
    },
    success: function (res) {
      // Toast.show('已分享')
    },
    cancel: function (res) {
      Toast.show('已取消')
    },
    fail: function (res) {
      Toast.show(JSON.stringify(res))
    }
  },
  // 为了使得我们可以方便地跟踪每一个状态的变化，你不能直接改变 store 中的状态。
  // 改变 store 中的状态的唯一途径就是显式地提交(commit) mutations。
  mutations: {
    /**
     * @param {object} state 默认接受的state对象
     */
    // 使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [types.WEIXIN_SHARE_OBJ] (state, weixinObj) {
      console.log('WEIXIN_SHARE_OBJ', weixinObj)
      for (var pro in weixinObj) {
        state[pro] = weixinObj[pro]
      }
      if (!state.imgUrl) {
        state.imgUrl = 'http://oon8twf5t.bkt.clouddn.com/Icon-256x.png'
        weixinObj.imgUrl = 'http://oon8twf5t.bkt.clouddn.com/Icon-256x.png'
      }
    }
  },
  actions: {

  }
}

export default moduleWeixin
