import Mock from 'mockjs'
import URLs from 'l_store/urls'
import CURLs from 'c_store/urls'

const DEBUG = true // debug 总开关
const mockData = {
  query: {
    debug: true,
    data: {
      'status|1': ['100', '404'],
      'message': '操作成功'
    }
  }
}

const mockTest = function (urls) {
  if (!DEBUG) {
    return false
  }
  for (const key in mockData) {
    mockData[key].data.status = parseInt(mockData[key].data.status)
    if (mockData[key].debug === true && urls[key] !== undefined) {
      Mock.mock(urls[key], mockData[key].data)
    }
  }
}

mockTest(URLs)
mockTest(CURLs)
