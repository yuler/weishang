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
    '/p/:id': {
      name: 'productionShow',
      component: require('./views/productionShow.vue')
    },
    '/success':{
      name:'success',
      component:require('./views/authorized-success.vue')
    },
    '/success1':{
      name:'success',
      component:require('./views/register-success.vue')
    },
    '/register/:userId':{
      component:require('./views/register.vue')
    }
  })
}