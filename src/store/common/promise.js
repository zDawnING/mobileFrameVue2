const getPagePromise = function () {
  return {
    // 实现承诺对象
    url: '',
    // 承诺的动作
    action: function (url) {
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
}

export default getPagePromise
