import * as types from '../types'
const moduleRegister = {
  // 保存 vue 中的状态，在模块里面，这里的状态相对于其他模块是局部的。
  state: {
    // 记录表
    list: []
    // 当前下标
    // activeIndex: -1
  },
  // 为了使得我们可以方便地跟踪每一个状态的变化，你不能直接改变 store 中的状态。
  // 改变 store 中的状态的唯一途径就是显式地提交(commit) mutations。
  mutations: {
    /**
     * @param {object} state 默认接受的state对象
     */
    // 使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [types.ROUTER_MANAGER_PUSH] (state, fullPath) {
      state.list.push(fullPath)
      // state.activeIndex++
    },
    [types.ROUTER_MANAGER_POP] (state) {
      var result = state.list.pop()
      console.warn('删除的路由记录：', result)
    }
  },
  actions: {
    /**
     * 判断是否返回动作，这个函数是在beforeEnter调用的
     * @param {string} [toFullPath]   将要访问页面的全路径
     * @param {string} [fromFullPath] 上一个页面的全路径
     */
    // [types.ROUTER_MANAGER_IS_BACK] (context, path) {
    //   var toFullPath = path.toFullPath
    //   var fromFullPath = path.fromFullPath
    //   console.log(toFullPath)
    //   console.log(fromFullPath)
    //   // 添加记录
    //   // context.commit(types.ROUTER_MANAGER_PUSH, fromFullPath)
    //   // context.state
    //   var list = context.state.list
    //   var lastIndex = list.length - 1
    //   if (lastIndex > 0) {
    //     // 判断链路是否有发生过断层，有断层要进行通知
    //     if (list[lastIndex] !== fromFullPath) {
    //       console.warn('路由记录发生断层，路由记录如下：')
    //       console.warn(list)
    //       console.warn('当前的from为：' + fromFullPath + '，但是实际上的路由最新路径为：' + list[lastIndex])
    //       console.warn('请检测程序判断是否有发生bug的可能')
    //     }
    //     if (toFullPath === list[lastIndex - 1]) {
    //       // 如果是返回就需要删除记录
    //       context.commit(types.ROUTER_MANAGER_POP)
    //       return true
    //     } else {
    //       context.commit(types.ROUTER_MANAGER_PUSH, toFullPath)
    //       return false
    //     }
    //   } else {
    //     // 如果原本只有0条或1条记录，那么一定是前进动作
    //     context.commit(types.ROUTER_MANAGER_PUSH, toFullPath)
    //     return false
    //   }
    // }
  }
}

export default moduleRegister
