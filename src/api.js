import xhr from 'xhr'
import { Promise } from 'es6-promise'

import Vue from 'vue'
// import 
// 常量
const HOST = 'http://123.56.235.156/vs';
const API_PRODUCT_INDEX_API = `${HOST}/front/product`
const API_PRODUCT_SHOW_API = `${HOST}/front/product/info`
const API_USER_PAY_URL = `${HOST}/vs/front/pay/userPay`
const API_USER_REGISTER_URL = `${HOST}/front/user/register`
const API_SEND_SMS_CODE_URL = `${HOST}/front/user/phoneCode`
const API_GET_USER_URL = `${HOST}/front/user/info`

Vue.http.options.emulateJSON = true

export default {
	productions: {
		index: () => {
			return new Promise((resolve, reject) => {
				xhr(`${API_PRODUCT_INDEX_API}`, (err, res) => {
					if(err) return reject(err)
					resolve(JSON.parse(res.body))
				})
			})
		},
		get: (id) => {
			return new Promise((resolve, reject) => {
				xhr(`${API_PRODUCT_SHOW_API}?id=${id}`, (err, res) => {
					if(err) return reject(err)
					resolve(JSON.parse(res.body))
				})
			})
  	},
  },
	pay: {
		userPay: (out_trade_no) => {
			return new Promise((resolve, reject) => {
				xhr(`${API_USER_PAY_URL}?out_trade_no=${out_trade_no}`, (err, res) => {
					if(err) return reject(err)
					resolve(JSON.parse(res.body))
				})
			})
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
		login: () => {
			return new Promise((resolve, reject) => {
				xhr(`${userPay}?out_trade_no=${out_trade_no}`, (err, res) => {
					if(err) return reject(err)
					resolve(JSON.parse(res.body))
				})
			})
		},
		info: () => {
			return new Promise((resolve, reject) => {
				xhr(`${userPay}?out_trade_no=${out_trade_no}`, (err, res) => {
					if(err) return reject(err)
					resolve(JSON.parse(res.body))
				})
			})
		}
	}
} 


