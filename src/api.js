import Vue from 'vue'

// 分页
const PAGE_NO = 1
const PAGE_SIZE = 10
// 常量 API 接口地址
const HOST = '/vs'
// proudctions
const API_PRODUCT_INDEX_API = `${HOST}/front/product`
const API_PRODUCT_SHOW_API = `${HOST}/front/product/info`
// user
const API_SEND_SMS_CODE_URL = `${HOST}/front/user/phoneCode`
const API_USER_REGISTER_URL = `${HOST}/front/user/register`
const API_USER_LOGIN_URL = `${HOST}/front/user/login`
const API_GET_USER_URL = `${HOST}/front/user/info`
const API_USER_PAY_URL = `${HOST}/front/pay/userPay`

// 设置为请求头为 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true

export default {
	productions: {
		index: (pageNo = PAGE_NO, pageSize = PAGE_SIZE) => {
			return Vue.http.get(`${API_PRODUCT_INDEX_API}`, { pageNo: pageNo, pageSize: pageSize })
		},
		get: (id) => {
			return Vue.http.get(`${API_PRODUCT_SHOW_API}`, { id: id })
  	},
  },
	pay: {
		userPay: (id) => {
			return Vue.http.get(`${API_PRODUCT_SHOW_API}`, { out_trade_no: id })
		}
	},
	user: {
		get: (id) => {
			return Vue.http.get(`${API_GET_USER_URL}`, {id: id} )
		},
		regsiter: (user) => {
			return Vue.http.post(`${API_USER_REGISTER_URL}`, user )
		},
		sendSMSCode: (mobile) => {
			return Vue.http.get(`${API_SEND_SMS_CODE_URL}`, {mobile: mobile} )
		},
		login: (user) => {
			return Vue.http.post(`${API_USER_LOGIN_URL}`, user )
		},
		info: () => {
			return Vue.http.get(`${API_GET_USER_URL}`)
		}
	}
} 


