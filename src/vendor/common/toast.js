import layer from '../../vendor/static/layer.js'

const OK = 100
const OK_TITLE = '操作成功'
const ERROR_TITLE = '操作失败'
// const LOGIN_ERROR = 300
// const NET_ERROR = -1

/**
 * 信息展示
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
export function show (message) {
  layer.open({
    content: message,
    skin: 'msg',
    time: 2 // 2秒后自动关闭
  })
}
/**
 * [response description]
 * @param  {[type]}  data            [description]
 * @param  {Boolean} isShowOk        [description]
 * @param  {[type]}  successCallback [description]
 * @param  {Boolean} isShowError     [description]
 * @param  {[type]}  errorCallback   [description]
 * @return {[type]}                  [description]
 */
export function response (data, isShowOk, successCallback, isShowError, errorCallback) {
  if (!data) {
    errorCallback ? errorCallback() : null
  }
  var status = data.status
  var message = data.message
  if (status === OK) {
    if (isShowOk) {
      if (!message) {
        message = OK_TITLE
      }
      show(message)
    }
    successCallback ? successCallback() : null
    return
  } else {
    if (isShowError) {
      if (!message) {
        message = ERROR_TITLE
      }
      show(message)
    }
    errorCallback ? errorCallback() : null
  }
}
/**
 * 获取layer对象
 * @return {[type]} [description]
 */
export function getLayer () {
  return layer
}
/**
 * 提示网络错误
 * @return {[type]} [description]
 */
export function netError () {
  show('网络错误')
}
/**
 * 展示一个加载的信息
 * @param  {[type]} content 展示的提醒信息，如果没有传入就没有提醒信息
 * @return {[type]}         [description]
 */
export function load (content) {
  if (content) {
    return layer.open({type: 2, shadeClose: false, content: content})
  } else {
    return layer.open({type: 2, shadeClose: false})
  }
}
/**
 * 清除所有layer层
 * @return {[type]} [description]
 */
export function closeAll () {
  return layer.closeAll()
}
/**
 * 用于关闭特定层，index为该特定层的索引
 * @param  {[type]} index [description]
 * @return {[type]}       [description]
 */
export function close (index) {
  return layer.close(index)
}
/**
 * 调用layer的open
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
export function open (options) {
  return layer.open(options)
}
