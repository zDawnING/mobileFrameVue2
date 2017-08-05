import * as Toast from 'c_vendor/toast.js'
import Vue from 'vue'
/**
 * 注册微信jssdk
 * @param {[type]}   getApiWxConf [description]
 * @param {Function} callback     [description]
 */
export function WXconfig (getApiWxConf, callback) {
  var url = window.location.href.split('#')[0]
  Vue.http.post(getApiWxConf, {
    signature_url: url
  }).then(function (res) {
    var data = res.data
    Toast.response(data, false, function () {
      var appid = data.data.appid
      var time = data.data.timestamp
      var nonceStr = data.data.nonceStr
      var signature = data.data.signature
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appid, // 必填，公众号的唯一标识
        timestamp: time, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          // 'onMenuShareQQ',
          // 'onMenuShareWeibo',
          // 'onMenuShareQZone',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'hideOptionMenu',
          'showOptionMenu',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      wx.ready(function () {
        callback()
      })
    }, true, function () {

    })
  }, function (error) {
    // errorCallback
    console.log(error)
    Toast.netError()
  }).then(function () {
    // callback()
  })
//   Vue.http.post(getApiWxConf, {
//     signature_url: url
//   }).then(function (response) {
//     if (typeof response.data === 'string') {
//       response.data = JSON.parse(response.data)
//     }
//     if (response.data.status === '100') {
//       var appid = response.data.data.appid
//       var time = response.data.data.timestamp
//       var nonceStr = response.data.data.nonceStr
//       var signature = response.data.data.signature
//       wx.config({
//         debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//         appId: appid, // 必填，公众号的唯一标识
//         timestamp: time, // 必填，生成签名的时间戳
//         nonceStr: nonceStr, // 必填，生成签名的随机串
//         signature: signature, // 必填，签名，见附录1
//         jsApiList: [
//           'checkJsApi',
//           'onMenuShareTimeline',
//           'onMenuShareAppMessage',
//           // 'onMenuShareQQ',
//           // 'onMenuShareWeibo',
//           // 'onMenuShareQZone',
//           'hideMenuItems',
//           'showMenuItems',
//           'hideAllNonBaseMenuItem',
//           'showAllNonBaseMenuItem',
//           'hideOptionMenu',
//           'showOptionMenu'
//         ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//       })
//     } else {
// // console.log(response.data);
//     }
//   }).then(function () {
//     callback()
//   })
};
export function weixinShareForbid () {
  try {
    wx.hideOptionMenu()
  } catch (e) {
    console.error('wx对象不存在，导致禁止失败')
  }

  // wx.hideMenuItems({
  //   menuList: [
  //     'menuItem:share:appMessage',
  //     'menuItem:share:timeline'
  //   ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
  // })
}
export function weixinShareOpen () {
  try {
    wx.showOptionMenu()
  } catch (e) {
    console.error('wx对象不存在，导致开启失败')
  }
}
/**
 * 这个函数只能执行一次，之后都是用commit('WEIXIN_SHARE_OBJ',{})来修改分享内容，现在又调用多次了
 * @param  {[type]} weixinObj [description]
 * @return {[type]}           [description]
 */
export function weixinShareBind (weixinObj) {
  console.log('weixin_share_fun')
  console.log(arguments)
  // wx.showOptionMenu()
  var sharObj = weixinObj
  // 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareAppMessage(sharObj)
  // 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareTimeline(sharObj)
  // wx.onMenuShareQQ(sharObj)
  // wx.onMenuShareWeibo(sharObj)
  // wx.onMenuShareQZone(sharObj)
}
/**
 * 进行支付动作
 * @param  {[type]} jsApiParameters [description] 微信支付配置
 * @param  {[type]} successCallback [description] 支付成功回调
 * @param  {[type]} failureCallback [description] 取消支付回调
 * @return {[type]}                 [description]
 */
export function wxPay (jsApiParameters, successCallback, failureCallback) {
  console.log('jsApiParameters', jsApiParameters)
  try {
    console.log('jsApiParameters.appId', jsApiParameters.appId)
  } catch (e) {
    console.error('传入的jsApiParameters不是一个对象')
  }
  var isCanPay = false
  function jsApiCall () {
    // Toast.show('jsApiCall begin')
    isCanPay = true
    try {
      WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      jsApiParameters,
        // {
        //   appId: 'wx9de7a5c12ebc3a13',
        //   nonceStr: 'curhj0zwkdb449vu49lzs4ti6crpz0hd',
        //   package: 'prepay_id=wx201704261102280707f1928c0029476692',
        //   paySign: '5CCEFE9B2F1C6FC3E7765D50EA0CAB02',
        //   signType: 'MD5',
        //   timeStamp: '1493175748'
        // },
      function (res) {
        // Toast.show('pay callback')
        WeixinJSBridge.log(res.err_msg)
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          successCallback()
        } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
          failureCallback()
        } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
          failureCallback()
        }
      }
    )
    } catch (e) {
      Toast.show(e)
      console.error(e)
      failureCallback()
    }
    // Toast.show('jsApiCall end')
  }
  try {
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', jsApiCall)
        document.attachEvent('onWeixinJSBridgeReady', jsApiCall)
      }
      setTimeout(function () {
        if (isCanPay === false) {
          failureCallback()
        }
      }, 2000)
    // 测试调用
    // jsApiCall()
    } else {
      jsApiCall()
    }
  } catch (e) {
    Toast.show(e)
    console.error(e)
    failureCallback()
  }
}
/**
 * 获取微信支付配置
 * @param  {[type]} wxPayUrl        [description] 配置请求地址
 * @param  {[type]} notifyUrl        [description] 支付成功回调地址
 * @param  {[type]} money           [description] 请求金额
 * @param  {[type]} orderNumber     [description] 订单号
 * @param  {[type]} successCallback [description] jsApiParameters会自动回传到该回调函数
 * @param  {[type]} failureCallback [description]
 * @return {[type]}                 [description]
 */
export function getWxPayConfig (wxPayUrl, notifyUrl, money, orderNumber, successCallback, failureCallback) {
  Vue.http.post(wxPayUrl, {
    order_number: orderNumber,
    order_amount: money,
    notify_url: notifyUrl
  }).then(function (res) {
    var data = res.data
    Toast.response(data, false, function () {
      successCallback(data.data.jsApiParameters)
    }, true, function () {
      failureCallback()
    })
  }, function (error) {
    // errorCallback
    console.log(error)
    Toast.netError()
  }).then(function () {

  })
}
/**
 * 获取微信支付订单号码
 * @param  {[type]} getPayOrderUrl  [description] 请求地址
 * @param  {[type]} param           [description] 请求参数
 * @param  {[type]} successCallback [description] 成功回调 orderNumber会自动回传到该回调函数
 * @param  {[type]} failureCallback [description]
 * @return {[type]}                 [description]
 */
export function getWxPayOrderNumber (getPayOrderUrl, param, successCallback, failureCallback) {
  Vue.http.post(getPayOrderUrl, param).then(function (res) {
    var data = res.data
    Toast.response(data, false, function () {
      successCallback(data.data.order_number)
    }, true, function () {
      failureCallback()
    })
  }, function (error) {
    // errorCallback
    console.log(error)
    Toast.netError()
  }).then(function () {

  })
}
