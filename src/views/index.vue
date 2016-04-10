<template>
	<div class="viewports">
		<div class="container home-pannel">
			<div class="floor-item">
				<div class="title-container">
					<i class="weishang-icon "></i>
					<span class="all-icon">全部商品</span>
				</div>
				<div class="home-bg"><img src="/static/i/home-banner.png"></div>

			</div>
			<div class="floor-item">
				<div class="activity-container">
					<div class="activity-left">
						{{productions[0].photoIds | json}}
						<!-- <img v-bind:src="productions[0].photoIds | getImagePoster"> -->
					</div>
					<div class="activity-right">
						<div class="activity-right-item">
							<img src="/static/i/floor-right01.png">
						</div>
						<div class="activity-right-item">
							<img src="/static/i/floor-right01.png">
						</div>
					</div>
				</div>
			</div>
			<div class="floor-item">
				<div class="list-container">
					<ul class="list-data">
						<li class="">
							<div class="list-item">
								<img src="/static/i/data-pic01.png">
								<div class="product-name">金盛(Kingshare)T1系列64GB-B1便携式固态</div>
								<div class="product-price red">￥329.00</div>
							</div>
						</li>
						<li >
								<div class="list-item">
								<img src="/static/i/data-pic01.png">
								<div class="product-name">金盛(Kingshare)T1系列64GB-B1便携式固态</div>
								<div class="product-price red">￥329.00</div>
							</div>
						</li>
						<li>
									<div class="list-item">
								<img src="/static/i/data-pic01.png">
								<div class="product-name">金盛(Kingshare)T1系列64GB-B1便携式固态</div>
								<div class="product-price red">￥329.00</div>
							</div>
						</li>
						<li class="">
							<div class="list-item">
								<img src="/static/i/data-pic01.png">
								<div class="product-name">金盛(Kingshare)T1系列64GB-B1便携式固态</div>
								<div class="product-price red">￥329.00</div>
							</div>
						</li>
						<li >
								<div class="list-item">
								<img src="/static/i/data-pic01.png">
								<div class="product-name">金盛(Kingshare)T1系列64GB-B1便携式固态</div>
								<div class="product-price red">￥329.00</div>
							</div>
						</li>
						<li>
									<div class="list-item">
								<img src="/static/i/data-pic01.png">
								<div class="product-name">金盛(Kingshare)T1系列64GB-B1便携式固态</div>
								<div class="product-price red">￥329.00</div>
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

export default {
	data () {
		return {
			productions: [],
			pagination: {
				page: 1,
				limit: 9
			}
		}
	},
	route: {
		data ({ to }) {
			return api.productions.index(this.pagination.page, this.pagination.limit)
				.then(res => {
					return {
						productions: res.data.rows,
					}
				}, err => {
					console.log(err);
					alert('接口错误');
				})
		}
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
	.home-pannel .activity-container .activity-right{
		display: inline-block;
		width: 56.25%;
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
		height: 100%;
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
	.red{
		color: #b51d1a;
	}
	.grey{
		color: #cbcbcb;
	}
</style>