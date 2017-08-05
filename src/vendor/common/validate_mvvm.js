
var validate = function (map) {
/**
* 默认的正则表达式集合
*/
  var defaultRegexs = {
// 整数
    'int': /^\-?\d+$/,
// 小数
    'decimal': /^\-?\d*\.?\d+$/,
// 字母
    'alpha': /^[a-z]+$/i,
// 字母或数字
    'alpha_numeric': /^[a-z0-9]+$/i,
// 字母或数字及下划线等特殊字符
    'alpha_dash': /^[a-z0-9_\-]+$/i,
// 中文字符
    'chs': /^[\u4e00-\u9fa5]+$/,
// 中文字符或数字及下划线等特殊字符
    'chs_numeric': /^[\\u4E00-\\u9FFF0-9_\-]+$/i,
// qq
    'qq': /^[1-9]\d{4,10}$/,
// 电子邮件
    'email': /^([A-Z0-9]+[_|\_|\.]?)*[A-Z0-9]+@([A-Z0-9]+[_|\_|\.]?)*[A-Z0-9]+\.[A-Z]{2,3}$/i,
// 超链接
    'url': /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
// 护照
    'passport': /^[a-zA-Z0-9]{4,20}$/i,
// ip地址4
    'ipv4': /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i,
// ip地址6
    'ipv6': /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i,
// 金额，金额都是非负浮点数的
    'money': /^\d+(\.\d+)?$/,
// 手机号码验证
    'phone': {
// 中国移动
      cm: /^(?:0?1)((?:3[56789]|5[0124789]|8[278])\d|34[0-8]|47\d)\d{7}$/,
// 中国联通
      cu: /^(?:0?1)(?:3[012]|4[5]|5[356]|8[356]\d|349)\d{7}$/,
// 中国电信
      ce: /^(?:0?1)(?:33|53|8[079])\d{8}$/,
// 中国大陆
      cn: /^(?:0?1)[3458]\d{9}$/,
// 追加验证177，电信4G新段的号码
      new_ce: /^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/
// 中国香港
//   hk: /^(?:0?[1569])(?:\d{7}|\d{8}|\d{12})$/,
// 澳门
// macao: /^6\d{7}$/,
// 台湾
//  tw: /^(?:0?[679])(?:\d{7}|\d{8}|\d{10})$//*,
// 韩国
//  kr:/^(?:0?[17])(?:\d{9}|\d{8})$/,
// 日本
// jp:/^(?:0?[789])(?:\d{9}|\d{8})$/*/
    }
  }
/**
* 默认的反馈信息
*/
  var defaultMessages = {
    'required': '必须填写',
    'norequired': '可以不写',
    'int': '必须是整数',
    'phone': '手机号码不合法',
    'decimal': '必须是小数',
    'alpha': '必须是字母',
    'alpha_numeric': '必须为字母或数字',
    'alpha_dash': '必须为字母或数字及下划线等特殊字符',
    'chs': '必须是中文字符',
    'chs_numeric': '必须是中文字符或数字及下划线等特殊字符',
    'qq': '腾讯QQ号从10000开始',
    'id': '身份证格式错误',
    'ipv4': 'ip地址不正确',
    'ipv6': 'ip地址不正确',
    'email': '邮件地址错误',
    'url': 'URL格式错误',
    'date': '必须符合日期格式 YYYY-MM-DD',
    'datetime': '必须符合日期格式 YYYY-MM-DD hh:mm:ss',
    'datetime-s': '必须符合日期格式 YYYY-MM-DD hh:mm',
    'passport': '护照格式错误或过长',
    'money': '金额格式不正确'
  }

/**
* 存放默认的验证规则
*/
  var defaultRules = {
    'int': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['int']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return defaultRegexs['int'].test(value)
      }
    },
    'phone': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['phone']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        var ok = false
        for (var i in defaultRegexs['phone']) {
          if (defaultRegexs['phone'][i].test(value)) {
            ok = true
            break
          }
        }
        return ok
      }
    },
    'decimal': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['decimal']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return defaultRegexs['decimal'].test(value)
      }
    },
    'alpha': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['alpha']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return defaultRegexs['alpha'].test(value)
      }
    },
    'alpha_numeric': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['alpha_numeric']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return defaultRegexs['alpha_numeric'].test(value)
      }
    },
    'alpha_dash': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['alpha_dash']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return defaultRegexs['alpha_dash'].test(value)
      }
    },
    'chs': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['chs']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return defaultRegexs['chs'].test(value)
      }
    },
    'chs_numeric': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['chs_numeric']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return defaultRegexs['chs_numeric'].test(value)
      }
    },
    'qq': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['qq']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return defaultRegexs['qq'].test(value)
      }
    },
    'ipv4': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['ipv4']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return defaultRegexs['ipv4'].test(value)
      }
    },
    'ipv6': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['ipv6']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return defaultRegexs['ipv6'].test(value)
      }
    },
    'email': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['email']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return defaultRegexs['email'].test(value)
      }
    },
    'url': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['url']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return defaultRegexs['url'].test(value)
      }
    },
    'passport': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['passport']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return defaultRegexs['passport'].test(value)
      }
    },
    'required': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['required']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return value !== ''
      }
    },
    'norequired': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['norequired']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return true
      }
    },
    'date': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['date']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
// 如果包含_字符的就一律不过
        if (value.indexOf('_') != -1) {
          return false
        }
        if (typeof value === 'string' && value) { // 是字符串但不能是空字符
          var arr = value.split('-') // 可以被-切成3份，并且第1个是4个字符
          if (arr.length === 3 && arr[0].length === 4) {
            var year = ~~arr[0] // 全部转换为非负整数
            var month = ~~arr[1] + 1
            var date = ~~arr[2]
            var d = new Date(year, month, date)
            return d.getFullYear() === year && d.getMonth() === month && d.getDate() === date
          }
        }
        return false
      }
    },
    'datetime': {
// 提醒消息
      get_message: function (value) {
        return defaultMessages['date']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
// 如果包含_字符的就一律不过
        if (value.indexOf('_') != -1) {
          return false
        }
        if (typeof value === 'string' && value) { // 是字符串但不能是空字符
// 2012-09-09 12:12:00
          var array = value.split(' ')
          if (array.length == 2) {
            var dateStr = array[0], time = array[1]
            var dateArr = dateStr.split('-') // 可以被-切成3份，并且第1个是4个字符 这里先判断日期
            if (dateArr.length === 3 && dateArr[0].length === 4) {
              var year = ~~dateArr[0] // 全部转换为非负整数
              var month = ~~dateArr[1] + 1
              var date = ~~dateArr[2]
// 追加判断时间
              var timeArr = time.split(':')
              if (timeArr.length === 3) {
                var hours = ~~timeArr[0]
                var minutes = ~~timeArr[1]
                var seconds = ~~timeArr[2]
                var d = new Date(year, month, date, hours, minutes, seconds)
                return d.getFullYear() === year && d.getMonth() === month && d.getDate() === date
&& d.getHours() === hours && d.getMinutes() === minutes && d.getSeconds() === seconds
              }
            }
          }
        }
        return false
      }
    },
    'datetime-s': {
// 提醒消息
      get_message: function (value) {
        return defaultMessages['datetime-s']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
// 如果包含_字符的就一律不过
        if (value.indexOf('_') != -1) {
          return false
        }
        if (typeof value === 'string' && value) { // 是字符串但不能是空字符
// 2012-09-09 12:12
          var array = value.split(' ')
          if (array.length == 2) {
            var dateStr = array[0], time = array[1]
            var dateArr = dateStr.split('-') // 可以被-切成3份，并且第1个是4个字符 这里先判断日期
            if (dateArr.length === 3 && dateArr[0].length === 4) {
              var year = ~~dateArr[0] // 全部转换为非负整数
              var month = ~~dateArr[1] - 1
              var date = ~~dateArr[2]
// 追加判断时间
              var timeArr = time.split(':')
              if (timeArr.length === 2) {
                var hours = ~~timeArr[0]
                var minutes = ~~timeArr[1]
                var d = new Date(year, month, date, hours, minutes)
                return d.getFullYear() === year && d.getMonth() === month && d.getDate() === date
&& d.getHours() === hours && d.getMinutes() === minutes
              }
            }
          }
        }
        return false
      }
    },
    'id': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['id']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (val) {
        if ((/^\d{15}$/).test(val)) {
          return true
        } else if ((/^\d{17}[0-9xX]$/).test(val)) {
          var vs = '1,0,x,9,8,7,6,5,4,3,2'.split(','),
            ps = '7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2'.split(','),
            ss = val.toLowerCase().split(''),
            r = 0
          for (var i = 0; i < 17; i++) {
            r += ps[i] * ss[i]
          }
          return (vs[r % 11] == ss[17])
        }
        return false
      }
    },
    'money': {
// 提醒信息
      get_message: function (value) {
        return defaultMessages['money']
      },
/**
* @param {Object} value 要对比的值
* 将规则操作抽象为函数
*/
      rule: function (value) {
        return defaultRegexs['money'].test(value)
      }
    }
  }
/**
* 创建一个实例
* 一个实例管理自己的配置文件，事件，验证和回调
* @param {Object} map 配置文件
*/
  var factory = function (map_) {
/**
* 定义一个验证类
* 考虑用Prototype模式重写
* http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html
*/
    function ValidateInner () {
/**
* 初始化
* 加载配置文件，生成对应的事件、验证和回调
*/
      this.init = function () {
        if (map_) {
          map = map_
        }
      }

/**
* 配置文件
*/
      this.map = {}

/**
* 验证管理者
*/
      this.v_manager = {
/**
* 对外开放的一个验证单项的接口
* @param {Object} name 验证项的name
*/
        v: function (name) {
          var item = this.get_item(name)
          return this.v_item(item)
        },

/**
* 调用重置的单项
*/
        reset: function (name) {
          var item = this.get_item(name)
          item.onReset ? item.onReset() : false
        },

/**
* 调用全局的重置
*/
        resetAll: function () {
          map.onReset ? map.onReset() : false
        },

/**
* @param item的name
* 根据name获取某项
*/
        get_item: function (name) {
// 配置项里面的单项
          var item = {}
// 根据name查询到对应的验证项
          for (var i = 0; i < map.items.length; i++) {
            if (name === map.items[i].name) {
              item = map.items[i]
              break
            }
          }
          return item
        },

/**
* 验证单项，同时支持异步和同步
* 支持同步的方式：
* 如果pattern定义是同步的，那么v_item就会返回执行结果
* 支持异步的方式：
* 如果pattern定义是异步的，那么v_item就会传入validate_mvvm定义给pattern的successCallback和errorCallback，操作支持的成功
* 和失败需要让异步方法里面自行调用
* pattern里面定义的
* @param {Object} item 验证项
* @param {Function} successCallback 	成功时的回调函数（validate_mvvm框架自行定义的，不需要开发者处理，增加对异步的支持）
* @param {Function} errorCallback 	错误时的回调函数（validate_mvvm框架自行定义的，不需要开发者处理，增加对异步的支持）
* @param {Function} completeCallback 	完成时的回调函数（validate_mvvm框架自行定义的，不需要开发者处理，增加对异步的支持）
*/
        v_item: function (item, successCallback, errorCallback, completeCallback) {
// 标记是否验证成功 true 成功 false失败
          var result = false
// 提醒消息
          var message = null
// 要验证的数据
          var value = null
// 是否有值才验证
          var doValue = item.doValue
// 判断是否异步模式
          var isAysn = false
// 简化callback调用
          var allSuccessCallback = function () {
            item.onSuccess ? item.onSuccess() : false
            successCallback ? successCallback() : false
          }
          var allErrorCallback = function () {
            item.onError ? item.onError(message) : false
            errorCallback ? errorCallback() : false
          }
          var allCompleteCallback = function () {
            item.onComplete ? item.onComplete() : false
            completeCallback ? completeCallback() : false
          }
// 如果pattern是函数同时定义了两个参数的话，就判断为异步模式
          if (typeof item.pattern === 'function' && item.pattern.length > 0) {
            isAysn = true
          }
// 获取要验证的数据
          value = map.data[item.name]
// 判断是否要覆盖message的值
          message = item.message ? item.message : defaultRules[item.ruleName].get_message()

          if (isAysn == false) {
// 没值同时指定了有值才验证，所以直接跳过验证
            if (doValue && value == '') {
              result = true
            } else {  // 其它情况都执行验证
// 执行验证
// 如果用户有自己的正则表达式，就优先处理
              if (typeof item.pattern === 'function') { // 函数处理
// 直接执行函数
                if (isAysn == false) {
                  result = item.pattern()
                }
              } else if (item.pattern && typeof item.pattern === 'object') { // 正则表达式
// 执行验证
                result = item.pattern.test(value)
              } else { // 根据规则名称来执行对应的规则
                result = defaultRules[item.ruleName].rule(value)
              }
            }

// 同步的就直接执行回调
            if (result === true) {
              allSuccessCallback()
            } else {
              allErrorCallback()
            }

// 执行已完成验证的回调
            allCompleteCallback()

// 返回结果继续流程
            return result
          } else {
// 没值同时指定了有值才验证，所以直接跳过验证
            if (doValue && value == '') {
              allSuccessCallback()

              allCompleteCallback()
            } else {
// 异步的回调要在回调里面执行
              item.pattern(function () {
                allSuccessCallback()

                allCompleteCallback()
              }, function () {
                allErrorCallback()

                allCompleteCallback()
              })
            }
          }
        },

/**
* 执行该实例所有的验证流程
*/
        v_all: function () {
// 标记是否全部验证都通过了
          var allResult = true
// 单项的结果
          var result = false
// 已执行的item数量
          var doneCount = 0
// 获取this的引用，避免在recursionFun里面失去引用
          var $this = this
          var recursionFun = function () {
            if (doneCount < map.items.length) {
              $this.v_item(map.items[doneCount], function () {
// 不处理
              }, function () {
// 有一项不过
                allResult = false
              }, function () {
// 继续下一项的处理
                doneCount++
                recursionFun()
              })
            } else {
// 已经执行完所有的item了
// 执行回调
              if (allResult === true) {
                map.onSuccess ? map.onSuccess() : false
              } else {
                map.onError ? map.onError() : false
              }

// 执行最后回调
              map.onComplete ? map.onComplete() : false
            }
          }
          recursionFun()
        }
      }

/**
* 追加开放接口
* @param {Object} name 验证项name 如果没有name就是执行全部验证 有name就是执行单项验证
*/
      this.v = function (name) {
        if (name) {
          this.v_manager.v(name)
        } else {
          this.v_manager.v_all()
        }
      }

/**
* 追加开放接口
* @param {Object} name 验证项name 如果没有name就是全局重置 有name就是执行单项重置
*/
      this.reset = function (name) {
        if (name) {
          this.v_manager.reset(name)
        } else {
          this.v_manager.resetAll()
        }
      }

/**
* 追加开放接口，可以让用户调用validte自带的验证规则
* @param ruleName 验证规则名称
* @param value	要验证的值
*/
      this.d = function (ruleName, value) {
        return defaultRules[ruleName].rule(value)
      }

      return this
    };

// 实例化对象
    var obj = new ValidateInner()
    obj.init()
    return obj
  }
// 返回一个实例
  return factory(map)
}
export default validate

