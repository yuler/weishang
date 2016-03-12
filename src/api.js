import xhr from 'xhr'
import { Promise } from 'es6-promise'

// 常量
const host = 'http://123.56.235.156/vs/front';
const productIndex = host + '/product';
const productShow = host + '/'

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
				xhr(`${productShow}`, (err, res) => {
					if(err) return reject(err)
					resolve(JSON.parse(res.body))
				})
			})
		}
	}

} 


