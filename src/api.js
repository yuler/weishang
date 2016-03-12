import xhr from 'xhr'
import { Promise } from 'es6-promise'

// 常量
const host = 'http://123.56.235.156/vs/front'
const productIndex = host + '/product'
const productShow = host + '/productInfo'
const userPay = 'http://123.56.235.156/vs/pay/userPay'
const regsiter = `${host}/user/register`

export default {
	productions: {
		index: () => {
			return new Promise((resolve, reject) => {
				xhr(`${productIndex}`, (err, res) => {
					if(err) return reject(err)
					resolve(JSON.parse(res.body))
				})
			})
		},
		get: (id) => {
			return new Promise((resolve, reject) => {
				xhr(`${productShow}?id=${id}`, (err, res) => {
					if(err) return reject(err)
					resolve(JSON.parse(res.body))
				})
			})
		}
	},
	pay: {
		userPay: (out_trade_no) => {
			return new Promise((resolve, reject) => {
				xhr(`${userPay}?out_trade_no=${out_trade_no}`, (err, res) => {
					if(err) return reject(err)
					resolve(JSON.parse(res.body))
				})
			}) 
		}
	},
	user: {
		regsiter: () => {

		}
	}

} 


