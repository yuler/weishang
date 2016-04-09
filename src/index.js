import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './app.vue'
import routers from './routers.js'
import * as filters from './filters'

Object.keys(filters).forEach(function(k) {
  Vue.filter(k, filters[k]);
});

Vue.config.debug = true
Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter({
  hashbang: false,
  history: true,
  saveScrollPosition: true,
  // root: '/vs/weishang/'
})

routers(router)
router.start(App,'app')