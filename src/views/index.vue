<template>
	<div class="viewports">
		<div class="container home-pannel">
			<div class="floor-item">
				<div class="title-container">
					<i class="weishang-icon "></i>
					<span class="all-icon" v-link="{ name: 'category' }">全部商品</span>
				</div>
				<!-- <div class="home-bg">
					<a href="{{ b.targetUrl }}" v-for="b in banner" v-if="$index == 0">
						<img v-bind:src="b.imagePath | banner">
					</a>
				</div> -->
			</div>
			<carousel :imgs="banner[0]"></carousel>
			<div class="floor-item">
				<div class="activity-container">
					<div class="activity-left" v-for="p in banner[2]" track-by="$index" v-link="{ path: p.targetUrl}" v-if="$index == 0">
						<div class="img-container">
							<img v-bind:src="p.imagePath | getImagePoster">
						</div>
					</div>
					<div class="activity-right">
						<div class="activity-right-item" 
							v-for="p in banner[1]" 
							track-by="$index" 
							v-link="{ path: p.targetUrl}">
						   	<div class="activity-right-item-img">
								<img v-bind:src="p.imagePath | getImagePoster" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="floor-item">
				<div class="list-container">
					<ul class="list-data">
						<li v-for="p in productions" track-by="$index" v-link="{ name: 'productionShow', params: { id: p.id }}">
							<div class="list-item">
								<img v-bind:src="p.photoIds | getImagePoster">
								<div class="product-name">{{ p.name }}</div>
								<div class="product-price red">￥ {{ p.price }}</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import api from '../api.js'
import Carousel from '../components/Carousel.vue'

export default {
	data () {
		return {
			banner: [],
			productions: [],
			pagination: {
				page: 1,
				limit: 9
			}
		}
	},
	route: {
		data ({ to }) {
			api.banner()
				.then(res => {
					this.banner = res.data
				}, err => {
					console.log(err)
				})
			api.productions.index(this.pagination.page, this.pagination.limit)
				.then(res => {
					this.productions = res.data.rows
				}, err => {
					console.log(err)
					alert('接口错误')
				})
		}
	},
	components: {
		Carousel
	}
}

</script>

<style>
	.home-pannel .home-menu{
		height:44px;
		width:100%;
	}
	.title-container{
		height: 36px;
		line-height: 36px;
		position: relative;
		    font-size: 15px;
		    color: #dfbd98;
	}
	.title-container i{
		display: inline-block;
		width: 23px;
		height: 16px;
		margin-left: 10px;
		background-position: 0 -116px;
	}
	.title-container .all-icon{
		position: absolute;
		right: 30px;
	}
	.title-container .all-icon:after{
		background: url(/static/i/weishang-icon.png) no-repeat;
 		background-size: 200px 200px;
		display: inline-block;
		content: " ";
		width: 20px;
		height:20px;
		background-position: -60px -116px;
		position: absolute;
    	top: 7px;
    	margin-left: 2px;
	}
	.home-pannel .home-bg{
		width: 100%;
	}
	.home-pannel .home-bg img{
		width: 100%;
		height: auto;
	}
	.home-pannel .activity-container{
		width: 100%;
	}
	.home-pannel .activity-container .activity-left{
		display: inline-block;
		width: 43.75%;
	}
	.home-pannel .activity-container img{
		width: 100%;
		height: 100%;
	}
	.activity-container{
		border-bottom: 1px solid #cbcbcb;
	}
	.list-container .list-data{
		width: 100%;
	}
	.list-container .list-data li{
		width: 33.33%;
		float: left;
		overflow: hidden;
		font-size: 12px;
	
		/*margin-right: -1px;*/
	}
	.list-container .list-data .li:after{
		content: " ";
		display:inline-block;
		width: 1px;
		height: 100%;
		background-color: #cbcbcb;
	}
	.list-container .list-data .list-item{
		border-bottom: 1px solid #cbcbcb;
		border-right: 1px solid #cbcbcb;
		padding-bottom: 10px;
	}
	.list-container .list-data .list-item:last-child{
		/*border-right: none;*/
	}
	.home-pannel .list-container img{
		width: 100%;
		/*height: 100%;*/
		max-height: 106px;
	}
	.list-container .list-data .product-name{
		height: 30px;
		margin:0 10px;
		overflow: hidden;
		line-height: 15px;
	}
	.list-container .list-data .product-price{
		margin-top: 3px;
		margin:0 10px;
	}
	.list-container .list-data li:nth-child(3n) .list-item{
		border-right: none;
	}
	.red{
		color: #b51d1a;
	}
	.grey{
		color: #cbcbcb;
	}
	.home-pannel .floor-item{
		margin-bottom: 8px;
		border-top: 1px solid #cbcbcb;
	}
	.home-pannel .activity-left .img-container{
		border-right: 1px solid #cbcbcb;
	}
	.activity-right-item{
		border-bottom: 1px solid #cbcbcb;
	}
	.activity-right-item:last-child{
		border-bottom: none;
	}

	.home-pannel .activity-container .activity-right{		
		width: 56%;display:block;
	}
	.home-pannel .activity-container{position:relative;}

	.activity-right{
		width:44%;float:right;position:relative;
	}
	.activity-right-item{
		position:absolute;width:100%;padding-top:40%;overflow:hidden;
	}
	.activity-right-item:last-child{
		margin-top:38%;
	}
	.activity-right-item:before{
		
	}
	.activity-right-item-img{position:absolute;top:0;}
	.activity-right-item img{width:100%;height:auto;}
</style>