export default (router) => {
	router.map({
		'/': {
			name: 'index',
			component: require('./views/index.vue')
		},
		'/login': {
			name: 'login',
			component: require('./views/login.vue')
		},
		'/me': {
			name: 'me',
			component: require('./views/me.vue')
		},
		'/me_t': {
			name: 'me_t',
			component: require('./views/me_temp.vue')
		},
		'/p/:id': {
			name: 'productionShow',
			component: require('./views/productionShow.vue')
		},
		'/success': {
			name:'success',
			component:require('./views/authorized-success.vue')
		},
		'/success1': {
			name:'success',
			component:require('./views/register-success.vue')
		},
		'/register/:userId': {
			name:'register',
			component:require('./views/register.vue')
		},
		// wait processing completed
		'/order/:status': {
			name: 'order',
			component:require('./views/order.vue')
		},
		// apply 
		'/getCash/:status': {
			name: 'getCash',
			component:require('./views/getCash.vue')
		},
		'*': {
			component: require('./views/404.vue')			
		}
	})
}
