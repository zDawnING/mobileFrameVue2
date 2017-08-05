!(function (W, D) {
  W.En = W.En || {
    wxShare: false,
    domain: '',
    debug: true,
    windowWidth: 0
  }
  W.En.getUrl = function (item) {
    var svalue = location.search.match(new RegExp('[\?\&]' + item + '=([^\&]*)(\&?)', 'i'))
    return svalue ? svalue[1] : svalue
  }
    ;(function () {
      En.ua = navigator.userAgent.toLowerCase()
      En.isAndroid = En.ua.match(/android/i) == 'android'
      En.isIOS = En.ua.match(/iphone os/i) == 'iphone os'
      En.isIpad = En.ua.match(/ipad/i) == 'ipad'
      En.isWM = En.ua.match(/windows ce/i) == 'windows ce' || En.ua.match(/windows mobile/i) == 'windows mobile'
      var isMidp = En.ua.match(/midp/i) == 'midp'
      var isUc7 = En.ua.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
      var isUc = En.ua.match(/ucweb/i) == 'ucweb'
      En.isMobile = En.isAndroid || En.isIOS || En.isIpad || En.isWM || isMidp || isUc7 || isUc
      En.isWeiXin = En.ua.match(/MicroMessenger/i) == 'micromessenger'
      En.isWebKit = En.ua.match(/webkit/i) == 'webkit'
      En.isChrome = En.ua.match(/Chrome/i) == 'chrome'
      if (En.ua.indexOf('ucbrowser') > -1) {
        var control = navigator.control || {}
        if (control.gesture) {
          control.gesture(false)
        }
      }
    })()
  var config = {}
  var src = document.getElementsByTagName('script'),
    html = document.documentElement,
    body,
    dataset = src[0].dataset,
    config_width = +dataset.width || 0,
    config_height = +dataset.height || 0,
    delay, setSize = function () {
      config.windowWidth = html.clientWidth || window.innerWidth || html.getBoundingClientRect().width
      config.windowHeight = html.clientHeight || window.innerHeight || html.getBoundingClientRect().height
      config.aspectRatio = config.windowWidth / config.windowHeight

      if (!config_width || config.aspectRatio > config_width / config_height) {
        config.windowScale = config_height / config.windowHeight
        html.style.cssText += 'font-size:' + config.windowHeight * 100 / config_height + 'px!important;'
      } else {
        config.windowScale = config_width / config.windowWidth
        html.style.cssText += 'font-size:' + config.windowWidth * 100 / config_width + 'px!important;'
      }
      html.offsetWidth
      if (En.ua.isAndroid && En.ua.isUc && !!body) {
        body.style.visibility = 'hidden'
        body.offsetHeight
        body.style.visibility = 'visible'
      }
    }
  if (!config_height && !config_width) {
    config_width = 750
    console.log(config_width)
  }
  setSize()
  document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('resize', function () {
      clearTimeout(delay)
      delay = setTimeout(setSize, 50)
    }, false)
  }, false)
})(window, document)

