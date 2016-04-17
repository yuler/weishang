<template>
<div class="viewports">
	<div class="container info-pannel">
		<div class="floor-item split-line">
			<div class="user-bg"><img src='/static/i/user-bg.png' /></div>
			<div class="user-info margin-space">
				<span class="user-pic">
					<img v-bind:src="user.photo | getImagePoster">
				</span>
				<span class="info-text">
					<div class="user-address"><i class="fa fa-map-marker"></i>{{user.address}}</div>
					<div class="user-phone">
						<span class="phone"><i class="fa fa-mobile"></i> {{user.mobile}}</span>
					</div>
				</span>
				<div class="user-pannel"><i class="icon user"></i><span class="user-name">{{user.loginName}}</span></div>
				<div class="control-pannel" v-link="{ name: 'editUser' }"><i class="fa fa-conf"></i> <span>编辑</span></div>
			</div>
		</div>
		<div class="floor-item floor-space">
			<div class="detail-box margin-space-s">
				<div class="box-item split-line">
					<span class="cash-tag">认证状态:</span>
					<span class="cash-number">{{ user.valid | userStatus }}</span>
					<span class="btn btn-info" @click="payAuth" v-if="user.valid === 0">认证</span>
				</div>
				<div class="box-item split-line">
					<span class="cash-tag">账上余额:</span>
					<span class="cash-number">￥{{ user.balance }}</span>
					<span class="btn btn-info" v-link="{ name: 'getCash', params: {status: 'apply' }}">提现</span>
				</div>
				<div class="box-item split-line">
					<span class="cash-tag">未完成订单:</span>
					<span class="cash-number">{{ user.uncompleteCount }}个</span>
					<span class="btn btn-info" v-link="{ name: 'order', params: {status: 'wait' }}">查看</span>
				</div>
				<div class="box-item ">
					<span class="cash-tag">推荐注册地址:</span>
					<input id="shareUrl" type="text" value="{{ shareRegisterUrl }}">
					<span class="btn btn-info" @click="copyShareUrl">复制</span>
				</div>
			</div>
		</div>
		<div class="floor-item">
			<div class="detail-box margin-space-s">
				<div class="box-item split-line">
					<span class="blank-tag">银行卡信息</span>
					<span class="add-card" @click="showAddBankFrom">
						<i class="icon add"></i>添加
					</span>
				</div>
				<div class="box-item" v-for="bank in user.banks">
					<span class="bank-name">{{ bank.name }}</span>
					<span class="card-number">{{ bank.cardNum }}</span>
					<span class="card-remove" @click="destroyBank(bank.id)"><i class="fa fa-trash-o"></i></span>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="mask" v-show="addBankForm" transition="fade" @click="closeAddBankForm">
	<form class="buyFrom" @click="stopEvent" transition="fade" @submit.prevent="saveBank">
	<div class="floor-item">
    	<div class="detail-box margin-space-s">
          <div class="box-item split-line">
	  				<label for="">银行名称：</label>
	                  			<input type="text" placeholder="银行名称" v-model="bank.name">
	  				</div>

           <div class="box-item split-line">
           	<label for="">银行卡号：</label>
            			<input type="number" placeholder="银行卡号" v-model="bank.cardNum">
           </div>
           <div class="box-item split-line">
           <label for="">开户银行：</label>
           			<input type="text" placeholder="开户银行" v-model="bank.bankAdd">
           </div>
           <button class="btn" type="submit">保存</button>
        </div>

    </div>

	</form>
</div>
</template>

<script>
import api from '../api.js'

export default {
	data () {
		return {
			user: {},
			bank: {},
			addBankForm: false
		}
	},
	route: {
		data () {
			api.user.me()
				.then( res => {
					this.user = res.data
				}, err => {
					if( err.status !== 401) this.$router.app.snackbar('error', '服务器异常')
				})
		}
	},
	computed: {
		shareRegisterUrl () {
			var host = window.location.host
			var pathname = window.location.pathname
			var userId = this.user.id
      return `http://${host}/register/${userId}`
    }
	},
	methods: {
		init () {
			console.log('init');
			api.user.me()
				.then( res => {
					this.user = res.data
				}, err => {
					if( err.status !== 401) this.$router.app.snackbar('error', '服务器异常')
				})
		},
		showAddBankFrom () {
			this.addBankForm = true
		},
		closeAddBankForm () {
			this.addBankForm = false
		},
		stopEvent (e) {
			e.stopPropagation();
		},
		saveBank () {
			api.user.saveBank(this.bank)
				.then( res => {
					if( res.data.success !== true) return this.$router.app.snackbar('warning', res.data.msg)
					this.init()
					this.addBankForm = false
					this.$router.app.snackbar('success', '保存银行卡成功')
				}, err => {
					if( err.status !== 401) this.$router.app.snackbar('error', '服务器异常')
				})
		},
		destroyBank (id) {
			api.user.destroyBank(id)
				.then( res => {
					if( res.data.success !== true) return this.$router.app.snackbar('warning', res.data.msg)
					this.init()
					this.addBankForm = false
					this.$router.app.snackbar('success', '删除银行卡成功')
				}, err => {
					if( err.status !== 401) this.$router.app.snackbar('error', '服务器异常')
				})
		},
		copyShareUrl () {
			try {
			  var el = document.getElementById('shareUrl')
			  el.select()
			  var successful = document.execCommand('copy')
			  if (successful)
			  	this.$router.app.snackbar('success', '复制成功')
			} catch (e) {
				this.$router.app.snackbar('error', '复制失败')
			}
		},
		payAuth () {
			var host = window.location.host
			var pathname = window.location.pathname
			var return_url = `http://${host}${pathname}/me`
			console.log(return_url);
			api.pay.userPay()
				.then(res => {
					BC.click({
						out_trade_no: res.data.out_trade_no,
						title: res.data.title,
						amount: res.data.amount,
						sign: res.data.sign,
						return_url: return_url,
						optional: {
							type:'USER_PAY',
							out_trade_no:res.data.out_trade_no
						},
						need_ali_guide:"true"
					}, {
						dataError:function(msg){
							console.log(msg);
						},wxJsapiFinish:function(msg){
							alert(msg);
						},wxJsapiSuccess:function(msg){
							alert(msg);
						},wxJsapiFail:function(msg){
							alert(msg);
						}
					});
				})
		},
		logout () {
			api.user.logout()
				.then( res => {

				})
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '../assets/_variables.styl'

/*.info-v{background-color: #E2E2E2}*/
.info-pannel .floor-item{position:relative;}
.info-pannel .user-bg{position:absolute;left:0;width:100%;height:100%;overflow:hidden;}
.info-pannel .user-bg img{width:100%;height:100%;}
.info-pannel .user-info{padding-top: 18px;position: relative;}
.info-pannel .user-info .user-pic{width: 70px;height: 70px;overflow: hidden;line-height: 70px;text-align: center;display: inline-block;position: absolute;}
.info-pannel .user-pic img{max-width: 100%;max-height: 100%;}
.info-pannel .user-info{}
.info-pannel .info-text{width: 100%;overflow: hidden;height: 38px;margin-left:88px;}
.info-pannel .user-info .user-address{    margin-left: 85px;font-size: 16px;color: #666666;}

.info-pannel .user-phone i{list-style: none;font-style: normal;}
.info-pannel .user-phone{font-size: 15px;color: #666666; padding-left: 85px;margin-top: 10px;}
.info-pannel .control-pannel{position: absolute;right: 32px;font-size: 14px;color: #A0A0A0;bottom: 5px;}
.info-pannel .control-pannel i{font-style: normal}
.info-pannel .detail-box{}
.info-pannel .box-item{font-size: 16px;color: #666666;padding: 16px 0 16px 0;}
.info-pannel .box-item .cash-number{font-size: 15px;}
.info-pannel .box-item .btn-info{float: right;padding:4px 15px;}
.info-pannel .box-item .add-card,.card-remove{float: right;}
.info-pannel .box-item .bank-name{display: inline-block;width: 75px;}
.mask .floor-item{
	margin:0;
}
.mask .floor-item .box-item{
	padding:6px 0;
}
.mask .floor-item .box-item input{
	    font-size: 14px;
        display: inline-block;
        padding: 4px 12px;
        width: calc(100% - 44px);
        height: 40px;
        border-radius:4px;
        border: 1px solid #dfbd98;
        box-sizing: border-box;
        width:100%;
}
div.mask
	position fixed
	top 100%
	left 0
	bottom 0px
	right 0
	background rgba(0,0,0,0.3)
	form
		padding .5em 0
		position absolute
		bottom 0px
		background white
		width 100%
		font-size 18px
		border-top 1px solid $themeColor
		>div
			margin 0 15px
		.btn
			text-decoration none
			display block
			background $themeColor
			width 100%
			color white
			height 40px
			line-height 40px
			text-align center
			font-size 20px
			letter-spacing .5em
			border 1px;
// transition
div.mask.fade-transition
	transition: all .3s ease
	top 0
div.mask.fade-enter, div.mask.fade-leave
	top 100%
form.fade-transition
	transition: all .3s ease
	bottom 0px
form.fade-enter, div.fade-leave
	bottom 0px
	

input#shareUrl {
	width 100px
}
</style>