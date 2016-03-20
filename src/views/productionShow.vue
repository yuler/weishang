<template>
<div id="productionShow">
	<img v-bind:src="production.photoIds | getImagePoster">
	<h1>{{production.name}}</h1>
	<p class="addrs">商品产地</p>
	<hr>
	<p class="intro" v-html="production.summary"></p>
	<a class="btn" @click="buy()" v-if="state.buy && !state.pay">购买</a>
	<a class="btn" @click="pay()" v-if="state.pay">支付</a>
</div>
<div class="mask" v-show="state.pay" transition="fade" @click="closeForm">
	<form class="buyFrom" @click="stopEvent" transition="fade">
		<div>
			<label for="">购买数量：</label>
			<input type="number" placeholder="购买数量" v-model="order['products[0].sum']">
		</div>
		<hr>
		<div>
			<label for="">收货人姓名：</label>
			<input type="text" placeholder="收货人地址" v-model="order.reciver">
		</div>
		<hr>
		<div>
			<label for="">收货人联系电话：</label>
			<input type="text" placeholder="收货人联系电话" v-model="order.reciverMobile">
		</div>
		<hr>
		<div>
			<label for="">收货地址：</label>
			<input type="text" placeholder="收货地址" v-model="order.reciverAddress">
		</div>
	</form>
</div>

</template>
  
<script>
import api from '../api.js'

export default {
	data () {
		return {
			order: {
				'products[0].id': null,
				'products[0].sum': null,
			},
			production: {},
			state: {
				buy: true,
				pay: false
			}
		}
	},
	route: {
		data ({ to : { params: { id }}}) {
			return api.productions.get(id)
				.then(res => {
					console.log(res);
					return {
						production: res.data,
					}
				}, err => {
					console.log(err);
					alert('接口错误');
				})
		}
	},
	methods: {
		buy () {
			this.state.pay = true
		},
		pay () {
			this.order['products[0].id'] = this.production.id;
			api.pay.orderPay(this.order)
				.then(res => {
					if( res.data.success === false) return this.$router.app.snackbar('warning', res.data.msg)
					this.$router.app.showIndicator();
					BC.click({
						out_trade_no: res.data.out_trade_no,
						title: res.data.title,
						amount: res.data.amount,
						sign: res.data.sign,
						return_url:"http://www.baidu.com",
						optional:{
							type: res.data.pay_type,
							out_trade_no:res.data.out_trade_no,
							order_id: res.data.order_id
						},
						instant_channel:"ali",
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
				}, err => {
					console.log(err);
				})
			// api.pay.userPay('7f9a2222627343dc8217ee4aed392a2a')
			// 	.then(res => {
			// 		BC.click({
			// 			out_trade_no: res.out_trade_no,
			// 			title: res.title,
			// 			amount: res.amount,
			// 			sign: res.sign,
			// 			return_url:"http://www.baidu.com",
			// 			debug:true,
			// 			optional:{
			// 				type:'USER_PAY',
			// 				out_trade_no:res.out_trade_no
			// 			},
			// 			instant_channel:"ali",
			// 			need_ali_guide:"true"
						
			// 		}, {
			// 			dataError:function(msg){
			// 				console.log(msg);
			// 			},wxJsapiFinish:function(msg){
			// 				alert(msg);
			// 			},wxJsapiSuccess:function(msg){
			// 				alert(msg);
			// 			},wxJsapiFail:function(msg){
			// 				alert(msg);
			// 			}
			// 		});
			// 	})
		},
		closeForm () {
			this.state.pay = false
		},
		stopEvent (e) {
			e.stopPropagation()
		}
	}
}

</script>

<style lang="stylus" scoped>
@import '../assets/variables.styl'

#productionShow
	padding 10px 15px 50px 15px
	img
		width 100%
		margin-bottom 10px
	h1
		font-size 20px
		margin-bottom 10px
	p
		&.addrs
			font-size 18px
			color #777
			margin-bottom 10px
		&.intro
			font-size 16px
	a.btn
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
		position fixed
		left 0
		bottom 0px
div.mask
	position fixed
	top 100%
	left 0
	bottom 40px
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