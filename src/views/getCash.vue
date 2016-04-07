<template>
<div class="view-port">
	<div class="container cash-pannel">
		<div class="floor-item">
			<ul class="title-pannel">
				<li class="cash-item" v-link="{ name: 'getCash', replace: true, params: { status: 'apply' }}">申请提现</li>
				<li class="cash-item" v-link="{ name: 'getCash', replace: true,  params: { status: 'record' }}">提现记录</li>
			</ul>
		</div>
		<div v-if="status == 'apply'">
			<div class="floor-item">
				<div class=" margin-space">
				<div class="user-pannel "><i class="fa fa-user"></i><span class="user-name">{{ user.name}}</span></div>
					<div class="account-info">
						
						<span class="account-tag">账户余额</span>
						<span class="account-number">￥{{ user.balance}}</span>
					</div>
				</div>
			</div>
			<div class="floor-item">
				<div class="bank-info">
					<div class="bank-item" v-for="bank in user.banks">
						<div class="bank-account">
							<span class="bank-name">{{ bank.name }}</span>
							<span class="bank-number">{{ bank.cardNum }}</span>
							<input class="bank-control" type="radio" name="bankCard" @click="chooseBankCard(bank)">
						</div>
						<div class="bank-userinfo margin-l margin-r">
							<div class="user-name">
								<span>姓名:</span>
								<span>{{ user.name }}</span>
							</div>
							<div class="user-mobile">
								<span>手机号:</span>
								<span>{{ user.mobile }}</span>
							</div>
							<div class="bank-addr">
								<span>开户行:</span>
								<span>{{ bank.bankAdd }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class='floor-item' style="height:60px;"></div>
			<div class="floor-item cash-bar split-line-up">
				<div class="bar-pannel">
					<input type="number" placeholder="输入提现金额"  class="cash-input" />
					<span class="btn cash-btn" id="getCode" @click="withdrawCash">确定</span>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="bank-info">
				<div class="bank-item" v-for="record in withdrawRecord">
					<div class="bank-account">
						<span class="bank-name">{{ record.bankName }}</span>
						<span class="bank-number">{{ record.createDate }}</span>
						<span class="bank-control" style="line-height:12px;">￥{{ record.price }}</span>
					</div>
					<div class="bank-userinfo margin-l">
						<div class="user-name">
							<span>姓名:</span>
							<span>{{ record.recivName }}</span>
						</div>
						<div class="bank-addr">
							<span>银行卡号:</span>
							<span>{{ record.bankCode }}</span>
						</div>
					</div>
					<hr>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import api from '../api.js'

export default {
	data () {
		return {
			user: {},
			bankCard: null,
			withdraw: {},
			status: 'apply',
			withdrawRecord: []
		}
	},
	route: {
		data ({to: {params}}) {
			this.status = params.status
			if(this.status === 'apply') {
				api.user.me()
					.then( res => {
						this.user = res.data
					}, err => {
						if( err.status !== 401) this.$router.app.snackbar('error', '服务器异常')
					})
			} else if (this.status === 'record'){
				api.user.getWithdraw()
					.then( res => {
						this.withdrawRecord = res.data.list
					}, err => {
						if( err.status !== 401) this.$router.app.snackbar('error', '服务器异常')
					})
			}
		}
	},
	methods: {
		chooseBankCard (bank) {
			this.bankCard = bank
		},
		withdrawCash () {
			if(!this.bankCard)
				return this.$router.app.snackbar('warning', '请选择银行卡')
			if(!this.withdraw.price)
				return this.$router.app.snackbar('warning', '请选择金额')
			this.withdraw.bankName = this.bankCard.name
			this.withdraw.bankCode = this.bankCard.cardNum
			this.withdraw.recivName = this.user.name
			this.withdraw.bankAdd = this.bankCard.bankAdd
			api.user.withdrawCash(this.withdraw)
				.then( res => {
					if( res.data.success !== true)
						return this.$router.app.snackbar('warning', res.data.msg)
					this.$router.go({ name: 'getCash', replace: true, params: {status: 'record'} })
				}, err => {
					if( err.status !== 401) this.$router.app.snackbar('error', '服务器异常')
				})
		}
	}
}
</script>

<style scoped>
.cash-pannel .v-link-active{
	background-color: #ffffff!important;
	border-bottom: solid 2px #dfbd98;
	color: #dfbd98;
}
.cash-pannel .title-pannel .cash-item{
	width: 50%;
	float: left;
	height: 100%;
	text-align: center;
	background-color: #DADADA;
		box-sizing: border-box;
}

.cash-pannel .account-info{
	width:100%;
	margin-top: -4px;
}
.cash-pannel .account-info .account-tag{
	font-size: 14px;
	color: #8A8A8A;
	margin-left: 21px;
}

.cash-pannel .account-info .account-number{
	font-size: 17px;
	color: #b51d1a;
	font-weight: 500;
	float: right;
	margin-right: 50px;
}
.cash-pannel .bank-info{
	font-size: 14px;
	color: #333333;
}
.cash-pannel .bank-item{
	width: 100%;
}
.cash-pannel .bank-account{
	height: 45px;
	background-color: #EDEDED;
	line-height: 45px;
}
.cash-pannel .bank-account .bank-name{
	margin-left: 18px;
}
.cash-pannel .bank-account .bank-number{
	margin-left: 18px;
}
.cash-pannel .bank-account .bank-control{
	float: right;
	margin:15px 10px;
}
.cash-pannel .bank-userinfo{
	/* margin-top: 5px; */
	/* margin-bottom: 5px; */
}
.cash-pannel .bank-userinfo div{
	border-bottom:1px dashed #626262;
}
.cash-pannel .user-name,.cash-pannel .user-mobile,.cash-pannel .bank-addr{
	height: 30px;
	line-height: 30px;
	color: #666666;
}
.cash-pannel .cash-bar{
	position: fixed;
	bottom: 0px;
	height: 60px;
}
.cash-pannel .cash-input{
	margin-top: 9px;
	background-color: #F7F7F7 !important;
	width: 85%;
		height: 36px;
	border:solid 1px #E4E2E2;
	padding-left: 5px;
}
.cash-pannel .bar-pannel{
	height: 100%;
	margin-right: 100px;
	margin-left: 13px;
}
.cash-pannel .cash-btn{
	position: absolute;
	right: 10px;
	width: 80px;
	height: 38px;
	line-height: 38px;
	top: 10px;
}

</style>