import Vue from 'vue'

// 分页
const PAGE_NO = 1
const PAGE_SIZE = 10
// 常量 API 接口地址
const HOST = '/vs'
// banner 
const API_GET_BANNER = `${HOST}/front/ad`
// proudctions
const API_PRODUCT_INDEX_API = `${HOST}/front/product`
const API_PRODUCT_SHOW_API = `${HOST}/front/product/info`
// user
const API_SEND_SMS_CODE_URL = `${HOST}/front/user/phoneCode`
const API_USER_REGISTER_URL = `${HOST}/front/user/register`
const API_USER_LOGIN_URL = `${HOST}/front/user/login`
const API_USER_LOGOUT_URL = `${HOST}/front/user/logout`
const API_GET_USER_URL = `${HOST}/front/user/info`
const API_USER_AUTH_PAY_URL = `${HOST}/front/pay/userPay`
const API_USER_ORDER_PAY_URL = `${HOST}/front/pay/orderPay`

const API_USER_SAVE_BANK_URL = `${HOST}/front/bank/save`
const API_USER_DESTROY_BANK_URL = `${HOST}/front/bank/delete`

const API_USER_ORDER_URL = `${HOST}/front/order`

const API_GET_WITHDRAW_URL = `${HOST}/front/withdraw/save`
const API_GET_WITHDRAW_RECORD = `${HOST}/front/withdraw/list`
// 设置为请求头为 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true

export default {
	banner () {
		return Vue.http.post(API_GET_BANNER, { type: 0 })
	},
	productions: {
		index: (pageNo = PAGE_NO, pageSize = PAGE_SIZE) => {
			return Vue.http.get(API_PRODUCT_INDEX_API, { pageNo: pageNo, pageSize: pageSize })
		},
		get (id) {
			return Vue.http.get(API_PRODUCT_SHOW_API, { id: id })
  	},
  },
	pay: {
		userPay (id) {
			return Vue.http.get(API_USER_AUTH_PAY_URL, { out_trade_no: id })
		},
		orderPay (order) {
			return Vue.http.post(API_USER_ORDER_PAY_URL, order)
		}
	},
	user: {
		get (id) {
			return Vue.http.get(API_GET_USER_URL, { id: id} )
		},
		regsiter (user) {
			return Vue.http.post(API_USER_REGISTER_URL, user )
		},
		sendSMSCode (mobile) {
			return Vue.http.get(API_SEND_SMS_CODE_URL, { mobile: mobile} )
		},
		login (user) {
			return Vue.http.post(API_USER_LOGIN_URL, user )
		},
		logout () {
			return Vue.http.get(API_USER_LOGOUT_URL)
		},
		me () {
			return Vue.http.get(API_GET_USER_URL)
		},
		saveBank (bank) {
			return Vue.http.post(API_USER_SAVE_BANK_URL, bank)
		},
		destroyBank (id) {
			return Vue.http.post(API_USER_DESTROY_BANK_URL, { id: id})
		},
		order (pageNo = PAGE_NO, pageSize = PAGE_SIZE, status = 1) {
			return Vue.http.post(API_USER_ORDER_URL, { pageNo: pageNo, pageSize: pageSize, status: status })
		},
		withdrawCash (bankCard) {
			return Vue.http.post(API_GET_WITHDRAW_URL, bankCard)
		},
		getWithdraw () {
			return Vue.http.get(API_GET_WITHDRAW_RECORD)
		}
	},
	
} 


