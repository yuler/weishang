<template>
<div id="register-view">
	<div class="reg-png"><img src="/static/i/LOGO2.png"></div>
	
	<form @submit.prevent="register">
		<div class="form-group">
			<span><i class="fa fa-mobile"></i></span>
			<input v-model="user.mobile" type="tel" maxlength="11" placeholder="手机号码">
		</div>
		<div class="form-group">
			<span><i class="fa fa-code"></i></span>
			<input v-model="user.code" type="text" placeholder="验证码">
			<a class="send-sms-btn" @click="sendSMSVerify">获取验证码</a>
		</div>
		<div class="form-group">
			<span><i class="fa fa-user"></i></span>
			<input v-model="user.name" type="text" placeholder="姓名">
		</div>
		<div class="form-group">
			<span><i class="fa fa-key"></i></span>
			<input v-model="user.password" type="password" placeholder="密码">
		</div class="form-group">
		<br>
		<div class="tuijian-container">
			<img src="/static/i/user-pic.png"/>
			<span class="tuijian-info">
			李老大
			</span>
		</div>
		<br>	
		<div class="form-group">
			<button type="submit">注册</button>
		</div>
	</form>
	<div>
		
	</div>
</div>
</template>

<script>
import api from '../api.js'

export default {
	data () {
		return {
			user: {
				mobile: ''
			},
		}
	},
	route: {
		data ({ to }) {
			this.user.tjr = this.$route.params.userId;
		}
	},
	methods: {
		sendSMSVerify: function (e) {
			if(!this.user.mobile) return;
			api.user.sendSMSCode(this.user.mobile)
				.then( res => {
					console.log(res);
				}, error => {

				})
			e.preventDefault()
			event.stopPropagation()
		},
		register: function () {
			api.user.regsiter(this.user)
				.then(res => {
					if (res.data.success === false)
						return this.$router.app.snackbar('warning', res.data.msg)
					this.$router.go({name: 'login', replace: true})
					this.$router.app.snackbar('success', '注册成功')
				}, err => {
					if( err.status !== 401) this.$router.app.snackbar('error', '服务器异常')
				})
		}
	}
}
</script>

<style lang="stylus" scoped>
@import "../assets/_variables.styl"

div#register-view
	width 100%
	padding-top 20px
	color #dfbd98
	h1
		font-size 20px
		text-align center
		margin 10px 0px
	form
		width 100%
		div.form-group
			margin-bottom: 15px;
			white-space: nowrap;
			font-size: 0;
			padding: 0 10px;
			span
				font-size 14px
				display: inline-block;
				margin-right: -1px;
				padding 4px 5px
				width: 34px;
				height: 34px;
				line-height 34px;
				text-align center
				border: 1px solid #cccccc;
				border-radius: 4px 0 0 4px;
				background-color:white;
				position:absolute;
			input
				font-size 14px
				display: block;
				padding 4px 12px
				width: 100%;
				padding-left:44px;
				height 44px
				border-radius: 0 4px 4px 0;
				border: 1px solid #cccccc;
				box-sizing: border-box;
				&:focus
					outline:none;
					border: 1px solid $themeColor;
			a.send-sms-btn
				text-decoration none
				background $themeColor
				line-height 44px
				color white
				font-size 14px
				border-radius: 0 4px 4px 0;
				position: absolute;
				margin-top: 0;
				height: 44px;
				right: 9px;
				width: auto;
				padding 0 10px
			button
				color white
				height 44px
				width 100%
				font-size 14px
				border: 1px solid $themeColor;
				border-radius: 4px;
				background $themeColor
				&:focus
					outline:none;
.reg-png{
	width:100%;
	text-align:center;
	margin-bottom:10px;
}
.reg-png img{
	width:80px;
	height:auto;
}
.tuijian-container{
	height:50px;
	width:100%;
	text-align:center;
	line-height:50px;
	    font-size: 0;
}
.tuijian-container img{
	width:40px;
	height:auto;
	border-radius:20px 20px;
}
.tuijian-container .tuijian-info{
	font-size:18px;
	color: #333333;
}
</style>