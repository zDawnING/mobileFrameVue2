// 域名
var DOMAIN = 'www.tongxueq.com/' 
if (process.env.NODE_ENV === 'development') {  // 开发环境下，引入本地地址，上线就不需要
  DOMAIN = 'http://127.0.0.1/jasp2.0/'
}else if( process.env.NODE_ENV === 'test' ){
	DOMAIN = 'http://test.tongxueq.cn/'
}
export default DOMAIN
