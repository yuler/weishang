<template>
<div class="viewports">
	<div class="container info-pannel">
		<div class="floor-item split-line">
			<div class="user-info margin-space">
				<span class="user-pic">
					<img src="/src/assets/i/user-pic.png">
				</span>
				<span class="info-text">
					<div class="user-address">北京市朝阳区山博水攻D503北京市朝阳区山博水攻D503</div>
					<div class="user-phone">
						<i class="icon phone"></i><span class="phone">{{user.mobile}}</span>
					</div>
				</span>
				<div class="user-pannel"><i class="icon user"></i><span class="user-name">{{user.loginName}}</span></div>
				<div class="control-pannel"><i class="icon settings"></i> <span>编辑</span></div>
			</div>
		</div>
		<div class="floor-item floor-space">
			<div class="detail-box margin-space">
				<div class="box-item split-line">
					<span class="cash-tag">账上余额:</span>
					<span class="cash-number">￥1532</span>
					<span class="btn btn-info">提现</span>
				</div>
				<div class="box-item ">
					<span class="cash-tag">未完成订单:</span>
					<span class="cash-number">3 个</span>
					<span class="btn btn-info" v-link="{ name: 'order', replace: true, params: {status: 'wait' }}">查看</span>
				</div>
			</div>
		</div>
		<div class="floor-item">
			<div class="detail-box margin-space">
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
		<div>
			<label for="">银行名称：</label>
			<input type="text" placeholder="购买数量" v-model="bank.name">
		</div>
		<hr>
		<div>
			<label for="">银行卡号：</label>
			<input type="number" placeholder="收货人地址" v-model="bank.cardNum">
		</div>
		<hr>
		<div>
			<label for="">开户行：</label>
			<input type="text" placeholder="收货人联系电话" v-model="bank.bankAdd">
		</div>
		<hr>
		<button class="btn" type="submit">保存</button>
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
			this.init()
		}
	},
	methods: {
		init () {
			api.user.me()
				.then( res => {
					return {
						user : res.data
					}
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
					this.$router.app.snackbar('success', '删除银行卡成功')
				}, err => {
					if( err.status !== 401) this.$router.app.snackbar('error', '服务器异常')
				})
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '../assets/variables.styl'

/*.info-v{background-color: #E2E2E2}*/
.info-pannel .user-info{margin-top: 18px;position: relative;}
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
</style>