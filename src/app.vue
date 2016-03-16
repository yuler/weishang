<template>
	<appbar></appbar>
	<div class="container">
		<router-view></router-view>
	</div>
	<div class="mask" v-if="loading">
		<div>
			<span><i class="fa fa-spinner fa-spin"></i>&nbsp;&nbsp;加载中...</span>
		</div>
	</div>
	<div class="snackbar snackbar-{{snackbar.type}}" transition="fade" v-show="snackbar.msg" v-text="snackbar.msg"></div>
</template>

<style lang="stylus" scoped>
div.container
	padding-top 44px
	height: calc(100% - 44px)
div.mask
	width 100%
	height 100%
	position fixed
	top 44px
	bottom 0
	left 0
	right 0
	color white
	text-align center
	display: table
	>div
		font-size 18px
		display: table-cell
		vertical-align: middle
		>span
			padding 1em 2em
			background rgba(0,0,0,0.3)
			border-radius 3px;
div.snackbar
	position: fixed;
	bottom: 20px;
	width: 100%;
	text-align: center;
	height: 44px;
	color: white;
	line-height: 44px;
	font-size: 15px;
div.snackbar-error
	background #FF4444
div.snackbar-success
	background #42B983
div.snackbar-warning
	background #FFDC00

// transition
.fade-transition {
  transition: all .3s ease;
  overflow: hidden;
  opacity: 1
}
.fade-enter, .fade-leave {
  height: 0;
  opacity: 0;
}
</style>

<script>
import Vue from 'vue'
import Appbar from './components/appbar.vue'

// 拦截器
export default {
	data () {
		return {
			loading: false,
			snackbar: {}
		}
	},
  ready () {
  	// 拦截器
  	var _this = this;
    Vue.http.interceptors.push({
      request(req){
      		_this.loading = true
          // console.log('Intercepted REQ:', req)
          return req
      },
      response(res){
      		setTimeout(function () {
      			_this.loading = false
      		}, 500)
          // console.log('Intercepted RES:', res)
          return res
      }
    })
  },
	components: {
		'appbar': Appbar
	},
	methods : {
		showSnackbar (type, msg) {
			var _this = this;
			_this.snackbar = { 'type': type, 'msg': msg }
			setTimeout(function () {
				_this.snackbar = { }
			}, 3000)
		}
	}
}
</script>