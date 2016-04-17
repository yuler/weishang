export default (router) => {
	router.map({
		'/': {
			name: 'index',
			title: '主页',
			component: require('./views/index.vue')
		},
		'/category': {
			name: 'category',
			title: '全部商品',
			component: require('./views/productionCategory.vue')
		},
		'/login': {
			name: 'login',
			title: '登陆',
			component: require('./views/login.vue')
		},
		'/me': {
			name: 'me',
			title: '个人中心',
			component: require('./views/me.vue')
		},
		'/p/:id': {
			name: 'productionShow',
			title: '商品',
			component: require('./views/productionShow.vue')
		},
		'/edit/': {
			name: 'editUser',
			title: '个人设置',
			component: require('./views/editUser.vue')
		},
		// '/success': {
		// 	name:'success',
		// 	component:require('./views/authorized-success.vue')
		// },
		// '/success1': {
		// 	name:'success',
		// 	component:require('./views/register-success.vue')
		// },
		'/register/:userId': {
			name:'register',
			title: '注册',
			component:require('./views/register.vue')
		},
		// wait processing completed
		'/order/:status': {
			name: 'order',
			title: '订单',
			component:require('./views/order.vue')
		},
		// apply record
		'/getCash/:status': {
			name: 'getCash',
			title: '提现',
			component:require('./views/getCash.vue')
		},
		'*': {
			title: '404',
			component: require('./views/404.vue')			
		}
	})
}
