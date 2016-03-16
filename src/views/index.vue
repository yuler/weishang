<template>
<ul class="productions items" id="productions" @scroll="scrollFunc">
		<li v-for="p in productions" v-link="{ name: 'productionShow', params: { id: p.id }}">
			<!-- <a > -->
				<img v-bind:src="p.photoIds | getImagePoster">
				<div>
					<p>{{p.name}}</p>
					<p>{{p.summary}}</p>
					<p>{{p.productType.name}}</p>
					<p></p>
				</div>
				<span>￥{{ p.price }}</span>
		</li>
</ul>
</template>

<style lang="stylus" scoped>
ul
	-webkit-overflow-scrolling: touch;
	box-sizing: border-box;
	height: 100%;
	position: relative;
	overflow-y auto
	width 100%
	li
		padding 10px
		border-bottom: 1px solid #ccc
		display -webkit-flex
		display -moz-flex
		display -ms-flex
		display -o-flex
		display flex
		img
			width 60px
			height 60px
		div
			width 100%
			margin: 0 5px
			overflow: hidden;
			p
				overflow: hidden;
				white-space: nowrap;
				text-overflow:ellipsis;
				margin: 0;
		>span
			line-height 60px
			width 50px
			text-align center
</style>

<script>
import api from '../api.js'

export default {
	data () {
		return {
			productions: [],
			pagination: {
				page: 1,
				limit: 10
			}
		}
	},
	route: {
		data ({ to }) {
			return api.productions.index(this.pagination.page, this.pagination.limit)
				.then(res => {
					console.log(res);
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
			// console.log(e.target.scrollTop, e.target.offsetHeight, e.target.scrollHeight);
			if ((e.target.scrollTop + e.target.offsetHeight) >= e.target.scrollHeight) {
				this.pagination.page++
				console.log(this.pagination.page);
				api.productions.index(this.pagination.page, this.pagination.limit)
					.then(res => {
						this.productions = this.productions.concat(res.data.rows);
					}, err => {
						console.log(err);
						alert('接口错误');
					})
			}
		}
	}
}
</script>


