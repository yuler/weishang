import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './app.vue'
import routers from './routers.js'

Vue.filter('getImagePoster', function (string) {
	return 'http://123.56.235.156/' + string.split('|')[1];
})

Vue.config.debug = true
Vue.use(VueRouter)

var router = new VueRouter({
  // hashbang: true,
  // history: true,
  // saveScorllPostion: true,
})

routers(router)
router.start(App,'#app')