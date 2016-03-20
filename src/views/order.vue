<template>
<div class="viewports">
	<div class="container order-pannel">
		<div class="floor-item">
			<ul class="title-pannel">
				<li class="title-item" v-link="{ name: 'order', replace: true, params: {status: 'wait' }}">求发货</li>
				<li class="title-item" v-link="{ name: 'order', replace: true,  params: {status: 'processing' }}">进行中</li>
				<li class="title-item" v-link="{ name: 'order', replace: true,  params: {status: 'completed' }}">已完成</li>
			</ul>
		</div>
		<div class="floor-item">
			<ul class="order-list">
				<li class="split-line" v-for="order in orders">
					<div class="order-number">
						<span>订单编号:</span>
						<span class="number">{{ order.code }}</span>
					</div>
					<div class="order-content margin-space-s">
						<span class="order-pic">
							<img src="/src/assets/i/order-pic.png" />
						</span>
						<div class="order-info">
							<div class="order-name">商品名称</div>
							<div class="order-attr">红色</div>
							<div class="order-receiver">{{ order.reciver }}</div>
							<div class="order-phone">{{ order.reciverMobile }}</div>
						</div>
						<span class="order-num">X1</span>
					</div>
					<div class="order-sp">
						<span class="order-status">未发货</span>
						<span class="order-price">￥36.5</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
	import api from '../api.js'

	export default {
		data () {
			return {
				orders: [],
				pagination: {
					page: 1,
					limit: 10
				},
			}
		},
		route: {
			data ({ to }) {
				let status 
				switch (to.params.status) {
					case 'wait':
						status = 1
						break;
					case 'processing':
						status = 2
						break;
					case 'completed':
						status = 3
						break;
					default: 
						status = 1
				}
				return api.user.order(this.pagination.page, this.pagination.limit, status)
					.then( ({data}) => {
						if( data.success !== true) return this.$router.app.snackbar('warning', data.msg)
						return {
							orders: data.rows,
						}
					}, err => {
						this.$router.app.snackbar('error', data.msg)
					})
			}
		}


	}
</script>

<style>
	.order-pannel{
		font-size:16px
	}
	.order-pannel .title-item{
		width:33.3%;
		border-right:solid 1px #C8C8C8;
		box-sizing: border-box;
	}
	.order-pannel .order-list{
		font-size:14px;
		color:#7C7C7C;
	}
	.order-pannel .order-list li{
		height:137px;
		overflow:hidden;
	}
	.order-pannel .order-number{
		border-bottom:dashed 1px #e1e1e1;
		padding:7px 7px 7px 7px;
	}
	.order-pannel .order-content{
		position:relative;
	}
	.order-pannel .order-pic{
		width:71px;
		height:71px;
		display:inline-block;
		float:left;
		overflow:hidden;
	}
	.order-pannel .order-pic img{
		width:100%;
		height:auto;
	}
	.order-pannel .order-info{
		margin-left:80px;
		margin-right:60px;
	}
	.order-pannel .order-info div{
		margin-top:3px;
	}
	.order-pannel .order-info .order-name{
	color:#979797;

	}
	.order-pannel .order-info .order-attr{
		font-size:11px;
		 color:#BCBCBC;
	}
	.order-pannel .order-info .order-receiver{
	color:#979797;
	}
	.order-pannel .order-info .order-phone{
	color:#979797;
	}
	.order-pannel .order-num{
		display:inline-block;
		position:absolute;
		right: 25px;
			top: 35px;
	}
	.order-pannel .order-sp{

	}
	.order-pannel .order-sp .order-status{
		margin-left:26px;
		font-size:12px;
		color:#BCBCBC;
	}
	.order-pannel .order-sp .order-price{
		float:right;
		font-size:15px;
		margin-right:10px;
		color:#F27115;
	}
	.title-pannel .title-item{
   float: left;
   height: 100%;
   text-align: center;
   background-color: #DADADA;
 }
 .v-link-active{
   background-color: #ffffff!important;
   border-bottom: solid 2px #155882;
   color: #155882;
 }
</style>