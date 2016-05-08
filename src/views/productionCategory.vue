<template>
<div class="viewports">
	<div class="container product-pannel">
		<div class="floor-item">
			<ul class="product-list" @scroll="scrollFunc" id="productList">
				<li class="split-line" v-for="p in productions" v-link="{ name: 'productionShow', params: { id: p.id }}">
					<div class="product-content ">
						<span class="product-pic">
							<img v-bind:src="p.photoIds | getImagePoster">
						</span>
						<div class="product-info">
							<div class="product-name">{{p.name}}</div>
							<div class="product-detail"><p v-html="p.remarks"></p></div>
							<div class="product-attr"></div>
							<div class="product-receiver"><p v-if="p.productType">{{p.productType.name}}</p></div>
							
						</div>
						<span class="product-num">￥{{ p.price }}</span>
					</div>
				</li>
			</ul>
		</div>
		<div report-eventid="MHome_BacktoTop" @click='backClick' page_name="index" class="bottom-to-top J_ping" id="indexToTop">
            <img src="/static/i/scroll-to-top-icon.png" style="width: 100%;">
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
				limit: 10
			},
			noMoreData: false
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
	},
	methods: {
		scrollFunc: function (e) {
			var oUP = document.querySelector('#indexToTop');
			if (!this.noMoreData && (e.target.scrollTop + e.target.offsetHeight) >= e.target.scrollHeight) {
				this.pagination.page++
				api.productions.index(this.pagination.page, this.pagination.limit)
					.then(res => {
						if (res.data.rows < this.pagination.limit){
							this.noMoreData = true
							return this.$router.app.snackbar('warning', '没有数据了')
						}
						this.productions = this.productions.concat(res.data.rows);
					}, err => {
						console.log(err);
						// alert('接口错误');
					})
			}
			var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			var scrollTop = e.target.scrollTop;
			if(scrollTop>clientHeight*2){
				                oUP.style.display='block';
				            }else{
				                oUP.style.display='none';
				            }
		},
		backClick:function(e){
			var oUP = document.querySelector('#indexToTop');
			var ulO=document.querySelector('#productList');
			ulO.scrollTop=0;	
			oUP.style.display='none';
		}
	}
}


</script>


<style lang="stylus" scoped>
.floor-item {
	height 100%
}
ul
	-webkit-overflow-scrolling: touch;
	box-sizing: bproduct-box;
	height: 100%;
	position: relative;
	overflow-y auto
	overflow-x hidden
	width 100%
	li
		padding 10px
		bproduct-bottom: 1px solid #ccc
		display -webkit-flex
		display -moz-flex
		display -ms-flex
		display -o-flex
		display flex
		div.poster img
				width 60px
				height 60px
				bproduct-radius 3px
		div.content
			width 100%
			margin: 0 5px 0 10px
			overflow: hidden;
			p
				overflow: hidden;
				white-space: nowrap;
				text-overflow:ellipsis;
				margin: 0;
		>span
			color red
			line-height 60px
			width 50px
			text-align center
.product-pannel{
		font-size:16px
	}
	.product-pannel .title-item{
		width:33.3%;
		bproduct-right:solid 1px #C8C8C8;
		box-sizing: bproduct-box;
	}
	.product-pannel .product-list{
		font-size:14px;
		color:#7C7C7C;
	}
	.product-pannel .product-list li{
		overflow:hidden;
	}
	.product-pannel .product-number{
		bproduct-bottom:dashed 1px #e1e1e1;
		padding:7px 7px 7px 7px;
	}
	.product-pannel .product-content{
		position:relative;
		    width: 100%;
	}
	.product-pannel .product-pic{
		width:80px;
		height:80px;
		display:inline-block;
		float:left;
		overflow:hidden;
	}
	.product-pannel .product-pic img{
		width:100%;
		height:auto;
	}
	.product-pannel .product-info{
		margin-left:85px;
		margin-right:45px;
	}
	.product-pannel .product-info div{
		margin-top:3px;
	}
	.product-pannel .product-info .product-name{
		color:#333333;
		white-space:nowrap;
		text-overflow:ellipsis;
		overflow:hidden;
		font-size:15px;
	}
	.product-pannel .product-info .product-detail{
		 color:#767676;
		     display: -webkit-box;
		         -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    	overflow: hidden;
    	font-size: 13px;
    	text-align: left;
    	height: 30px;
    	margin-top:3px;
	}
	.product-pannel .product-info .product-receiver{
		color:#767676;
		font-size: 13px;
		margin-top:3px;
	}
	.product-pannel .product-info .product-attr{
		color:#767676;
		height:13px;
		font-size: 13px;
		margin-top:3px;
	}
	.product-pannel .product-num{
		display:inline-block;
		position:absolute;
		    right: 3px;
			top: 35px;
			font-size:14px;
			color:#b51d1a;
	}
	.product-pannel .product-sp{

	}
	.product-pannel .product-sp .product-status{
		margin-left:26px;
		font-size:12px;
		color:#BCBCBC;
	}
	.product-pannel .product-sp .product-price{
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
   bproduct-bottom: solid 2px #155882;
   color: #155882;
 }
.bottom-to-top {
    position: fixed;
    bottom: 56px;
    right: 8px;
    width: 35px;
    height: 35px;
    z-index: 20;
    display: none;
    transform-origin: 0;
    opacity: 1;
    transform: scale(1,1);
}
</style>


