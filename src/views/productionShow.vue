<template>
<div id="productionShow">
	<img v-bind:src="production.photoIds | getImagePoster">
	<h1>{{production.name}}</h1>
	<p class="addrs"></p>
	<p class="intro">{{production.summary}}</p>
	<a class="btn" @click="buy()" v-if="state.buy && !state.pay">购买</a>
	<a class="btn" @click="pay()" v-if="state.pay">支付</a>
</div>
<form class="buyFrom" v-if="state.pay">
	<div>
		<label for="">购买数量</label>
		<input type="number" placeholder="购买数量">
	</div>
	<div>
		<label for="">收货人地址</label>
		<input type="text" placeholder="收货人地址">
	</div>
	<div>
		<label for="">收货人联系电话</label>
		<input type="text" placeholder="收货人联系电话">
	</div>
	<div>
		<label for="">收货地址</label>
		<input type="text" placeholder="收货地址">
	</div>
</form>
  </template>
  
<script>
import api from '../api.js'

export default {
	data () {
		return {
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
		buy: function () {
			this.state.pay = true;
		},
		pay: function () {
			api.pay.userPay('7f9a2222627343dc8217ee4aed392a2a')
				.then(res => {
					BC.click({
						out_trade_no: res.out_trade_no,
						title: res.title,
						amount: res.amount,
						sign: res.sign,
						return_url:"http://www.baidu.com",
						debug:true,
						optional:{
							type:'USER_PAY',
							out_trade_no:res.out_trade_no
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
				})
		}
	}
}

</script>

<style scoped>
#productionShow img { width: 100%; }
#productionShow h1 {font-size: 20px;}
#productionShow .intro {}
a.btn { display: block;width: 100%;background: blue;color: white;height: 40px;line-height: 40px;text-align: center;font-size: 20px;letter-spacing: .5em;position: fixed; bottom: 0px;}
form {
	position: fixed;
	bottom: 40px;
	background: white;
	width: 100%;
}
</style> 