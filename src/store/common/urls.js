import DOMAIN from './domain'
const domain = DOMAIN  // 请求链接路径的统一设置，主要是为了减少发布目录对请求的影响。
const urls = {
  // 绑定手机号码
  getWxBinding: 'com_jeekup_txq/wap.Login/getWxBinding',
  // 短信发送
  getMsgSmscode: 'com_jeekup_txq/wap.Login/getMsgSmscode',
  // 获取当前用户权限
  isLogin: 'com_jeekup_txq/wap.Login/isLogin'
}
for (var i in urls) {
  urls[i] = domain + urls[i]
}
export default urls
