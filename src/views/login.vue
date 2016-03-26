<template>
<div id="login-view">
	<h1>用户登陆</h1><br>
	<form @submit.prevent="login">
		<input type="hidden" v-model="user.mobileLogin" value="true">
		<div class="form-group">
			<span><i class="fa fa-mobile"></i></span>
			<input v-model="user.username" type="tel" maxlength="11" placeholder="手机号码">
		</div>
		<div class="form-group">
			<span><i class="fa fa-key"></i></span>
			<input v-model="user.password" type="password" placeholder="密码">
		</div class="form-group">
		<div class="form-group" v-if="user.isValidateCodeLogin">
			<span><i class="fa fa-code"></i></span>
			<input v-model="user.validateCode" type="text" placeholder="验证码">
			<img src="/vs/servlet/validateCodeServlet" alt="验证码" @click="changeVerificationCode">
		</div>
		<br><br>	
		<div class="form-group">
			<button type="submit">登陆</button>
		</div>
	</form>
</div>
</template>

<script>
import api from '../api.js'

export default {
	data () {
		return {
			user: {
				username: '',
				isValidateCodeLogin: false
			}
		}
	},
	methods: {
		login () {
			api.user.login(this.user)
				.then( res => {
					this.user.isValidateCodeLogin = res.data.isValidateCodeLogin
					if(!res.data.success)
						return this.$router.app.snackbar('error', res.data.msg)
					this.$router.go({ name: 'me', replace: true })
					this.$router.app.snackbar('success', '登陆成功')
				}, err => {
					this.$router.app.snackbar('error', '服务器异常')
				})
		},
		changeVerificationCode: (e) => {
			e.target.src += '?' + Date.now()
		}
	}
} 
</script>

<style lang="stylus" scoped>
@import "../assets/variables.styl"

div#login-view
	padding-top 20px
	h1
		font-size 20px
		text-align center
		margin 10px 0px
	form
		margin 0 10px
		div.form-group
			width 100%
			margin-bottom: 15px;
			white-space: nowrap;
			font-size: 0;
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
			input
				font-size 14px
				display: inline-block;
				padding 4px 12px
				width: calc(100% - 44px);
				height 44px
				border-radius: 0 4px 4px 0;
				border: 1px solid #cccccc;
				box-sizing: border-box;
				&:focus
					outline:none;
					border: 1px solid $themeColor;
			img
				border-radius: 0 4px 4px 0;
				position: absolute;
				right: 10px;
				height: 42px;
				margin-top: 1px;
				width: 60px;
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
</style>

