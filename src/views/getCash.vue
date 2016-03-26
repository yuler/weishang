<template>
<div class="view-port">
	<div class="container cash-pannel">
		<div class="floor-item">
			<ul class="title-pannel">
				<li class="cash-item" v-link="{ name: 'getCash', replace: true, params: {status: 'apply' }}">申请提现</li>
				<li class="cash-item" v-link="{ name: 'getCash', replace: true,  params: {status: 'record' }}">提货记录</li>
			</ul>
		</div>
		<div class="floor-item">
			<div class=" margin-space">
			<div class="user-pannel "><i class="icon user"></i><span class="user-name">用户名</span></div>
						<div class="account-info">
							<span class="account-tag">账户余额</span>
							<span class="account-number">￥2456.5</span>
						</div>
			</div>

		</div>
		<div class="floor-item">
			<div class="bank-info">
				<div class="bank-item">
					<div class="bank-account">
						<span class="bank-name">工商银行</span>
						<span class="bank-number">6228481125332650763</span>
						<span class="bank-control"><i class="btn-choose choosed"></i></span>
					</div>
					<div class="bank-userinfo margin-l">
						<div class="user-name">
							<span>姓名:</span>
							<span>李老大</span>
						</div>
						<div class="user-mobile">
							<span>手机号:</span>
							<span>18719312881</span>
						</div>
						<div class="bank-addr">
							<span>开户行:</span>
							<span>北京某条大家支行</span>
						</div>
					</div>

				</div>
				<div class="bank-item">
					<div class="bank-account">
						<span class="bank-name">工商银行</span>
						<span class="bank-number">6228481125332650763</span>
						<span class="bank-control"><i class="btn-choose"></i></span>
					</div>
					<div class="bank-userinfo margin-l">
						<div class="user-name">
							<span>姓名:</span>
							<span>李老大</span>
						</div>
						<div class="user-mobile">
							<span>手机号:</span>
							<span>18719312881</span>
						</div>
						<div class="bank-addr">
							<span>开户行:</span>
							<span>北京某条大家支行</span>
						</div>
					</div>

				</div>
			</div>
		</div>

		<div class="floor-item cash-bar split-line-up">
			<div class="bar-pannel">
				<input type="number" placeholder="输入提现金额"  class="cash-input" />
				<span class="btn cash-btn" id="getCode">确定</span>
			</div>


		</div>
	</div>
</div>
</template>

<style scoped>
.cash-pannel .v-link-active{
	background-color: #ffffff!important;
	border-bottom: solid 2px #155882;
	color: #155882;
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
	margin-top: -8px;
}
.cash-pannel .account-info .account-tag{
	font-size: 14px;
	color: #8A8A8A;
	margin-left: 18px;
}

.cash-pannel .account-info .account-number{
	font-size: 14px;
	color: #ED6E0D;
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
	margin-right: 18px;
}
.cash-pannel .bank-userinfo{
	/* margin-top: 5px; */
	/* margin-bottom: 5px; */
}
.cash-pannel .user-name,.cash-pannel .bank-mobile,.cash-pannel .bank-addr{
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