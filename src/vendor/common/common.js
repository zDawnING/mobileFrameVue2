export function setCookie (cName, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cName + '=' + escape(value) +
    ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
};
export function getCookie (cName) {
  if (document.cookie.length > 0) {
    var cStart = document.cookie.indexOf(cName + '=')
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1
      var cEnd = document.cookie.indexOf(';', cStart)
      if (cEnd === -1) cEnd = document.cookie.length
      return unescape(document.cookie.substring(cStart, cEnd))
    }
  }
  return ''
};
/**
 * 合并两个数组
 * @param  {[type]} originList  旧数组，也是目标数组
 * @param  {[type]} newList     新数组
 * @return {[type]}            [description]
 */
export function mergeList (originList, newList) {
  var resultList = []
  for (var i = 0; i < originList.length; i++) {
    resultList.push(originList[i])
  }
  for (var j = 0; j < newList.length; j++) {
    resultList.push(newList[j])
  }
  return resultList
};
/**
 * 判断用户是否点击了返回
 * @param {routerObj} [to]
 * @param {routerObj} [form]
 * @param {routerObj} [store]
 * @return {Boolean}      true是返回 false是前进
 */
export function isBack (to, from, store) {
  console.warn('isBack')
  // const toDepth = to.path.split('/').length
  // const fromDepth = from.path.split('/').length
  // if (toDepth < fromDepth) {
  //   return true
  // } else {
  //   return false
  // }
  // return store.dispatch('ROUTER_MANAGER_IS_BACK', {
  //   toFullPath: to.fullPath,
  //   fromFullPath: from.fullPath
  // })
  // var result = store.dispatch('ROUTER_MANAGER_IS_BACK', {
  //   toFullPath: to.fullPath,
  //   fromFullPath: from.fullPath
  // })
  // console.log(result)
  // return result
  var toFullPath = to.fullPath
  var fromFullPath = from.fullPath
  console.log('toFullPath', toFullPath)
  console.log('fromFullPath', fromFullPath)
  console.warn('路由记录1', store.state.routerManager.list)
  // 添加记录
  // store.commit(types.ROUTER_MANAGER_PUSH, fromFullPath)
  // store.state.router_manager
  var list = store.state.routerManager.list
  var lastIndex = list.length - 1
  if (lastIndex > 0) {
    // 判断链路是否有发生过断层，有断层要进行通知
    if (list[lastIndex] !== fromFullPath) {
      console.warn('路由记录发生断层，路由记录如下：')
      console.warn(list)
      console.warn('当前的from为：' + fromFullPath + '，但是实际上的路由最新路径为：' + list[lastIndex])
      console.warn('请检测程序判断是否有发生bug的可能')
      console.warn('如果是刻意跳过' + fromFullPath + '记录的话，接下来将忽略这条记录')
      store.commit('ROUTER_MANAGER_PUSH', toFullPath)
      return false
    }
    if (toFullPath === list[lastIndex - 1]) {
      console.warn('back')
      // 如果是返回就需要删除记录
      store.commit('ROUTER_MANAGER_POP')
      return true
    } else {
      console.warn('push')
      store.commit('ROUTER_MANAGER_PUSH', toFullPath)
      return false
    }
  } else {
    console.warn('0 or 1')
    // 如果原本只有0条或1条记录，那么一定是前进动作
    store.commit('ROUTER_MANAGER_PUSH', toFullPath)
    return false
  }
}
/**
 * 获取滚动值
 * @return {[type]} [description]
 */
export function getScrollTop () {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  return scrollTop
}
/**
 * 获取文档高度
 * @return {[type]} [description]
 */
export function getDocumentHeight () {
  // 现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}
var $timer = ''
/**
 * 绑定滚动加载
 * @param  {[type]} whenNoLoadCallback [description] 回调：什么时候不执行查询 true为不执行
 * @param  {[type]} loadCallback       [description] 回调：查询函数
 * @param  {[type]} doneHeight         [description] 滚动条与文档底部距离多少执行查询函数，默认50
 * @param  {[type]} delay              [description] 要隔多少时间间隔执行函数，默认50
 * @return {[type]}                    [description]
 */
export function bindScollLoad (whenNoLoadCallback, loadCallback, doneHeight, delay) {
  function windowHeight () {
    if (document.compatMode === 'CSS1Compat') {
      return document.documentElement.clientHeight
    }
    return document.body.clientHeight
  }
  window.onscroll = function () {
    if ($timer) {
      clearTimeout($timer)
    }
    $timer = setTimeout(function () {
      doneHeight = doneHeight > 0 ? doneHeight : 50
      // 判断什么时候不执行查询
      if (whenNoLoadCallback() === true) {
        return
      }
      /* 滚动响应区域高度取50px */
      if (getScrollTop() + windowHeight() >= (getDocumentHeight() - doneHeight)) {
        loadCallback()
      }
    }, delay > 0 ? delay : 50)
  }
}
/**
 * 根据时间字符串来创建Date对象 时间格式为2016-01-01 00:00:00
 * @param  {[type]} dateStr [description]
 * @return {[type]}         [description]
 */
export function createDateObj (dateStr) {
  var resultDate = new Date()
  var dateStrArr = dateStr.split(' ')
  var date = dateStrArr[0]
  var time = dateStrArr[1]
  var dateArr = date.split('-')
  var year = dateArr[0]
  var month = dateArr[1]
  var day = dateArr[2]
  var timeArr = time.split(':')
  var hour = timeArr[0]
  var minute = timeArr[1]
  var second = timeArr[2]
  resultDate.setFullYear(year)
  resultDate.setMonth(month - 1)
  resultDate.setDate(day)
  resultDate.setHours(hour)
  resultDate.setMinutes(minute)
  resultDate.setSeconds(second)
  return resultDate
}
/**
 * 加载日期插件
 * @param  {Function} callback 加载完之后的回调
 * @return {[type]}            [description]
 */
export function initDatePlus (callback) {
  require([ 'mobiscroll_core' ], function () {
    require([ 'mobiscroll_frame' ], function () {
      require([ 'mobiscroll_scroller' ], function () {
        require([ 'mobiscroll_util-datetime' ], function () {
          require([ 'mobiscroll_datetimebase' ], function () {
            require([ 'mobiscroll_datetime' ], function () {
              require([ 'mobiscroll_zh' ], function () {
                callback ? callback() : null
              })
            })
          })
        })
      })
    })
  })
}
/**
 * 根据毫秒差来得到竞猜时间差
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
export function createDisStr (time) {
      // console.log(time)
  var disObj = {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  }
  if (time <= 0) {
    return disObj
  }
  // 时间单位换算
  var secondUnit = 1000
  var minuteUnit = secondUnit * 60
  var hourUnit = minuteUnit * 60
  var dayUnit = hourUnit * 24

  disObj.day = parseInt(time / dayUnit)
  time = time - dayUnit * disObj.day

  disObj.hour = parseInt(time / hourUnit)
  time = time - hourUnit * disObj.hour

  disObj.minute = parseInt(time / minuteUnit)
  time = time - minuteUnit * disObj.minute

  disObj.second = parseInt(time / secondUnit)

  return disObj
}
export function createLink (isShare) {
  // window.alert(isShare)
  // var link = ''
  var href = window.location.href
  var strArr = href.split('#')
  var pureHref = strArr[0].split('?')[0]
  var routerArgs = strArr[1]
  if (isShare !== true) {
    routerArgs = routerArgs + '/share'
  }
  return pureHref + '?page_router=' + routerArgs + '#' + routerArgs
}
