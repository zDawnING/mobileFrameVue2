import DOMAIN from '../common/domain'
const domain = DOMAIN  // 请求链接路径的统一设置，主要是为了减少发布目录对请求的影响。
const urls = {
  // 获取当前用户权限
  isLogin: 'com_jeekup_txq/wap.Login/isLogin',
}
for (var i in urls) {
  urls[i] = domain + urls[i]
}
export default urls
