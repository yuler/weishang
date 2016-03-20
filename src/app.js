import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './app.vue'
import routers from './routers.js'

Vue.filter('getImagePoster', function (string) {
	return string ? 'http://123.56.235.156/' + string.split('|')[1] : '';
})

Vue.config.debug = true
Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter({
  hashbang: false,
  history: true,
  saveScrollPosition: true
  // root: '/home'
})

routers(router)
router.start(App,'#app')