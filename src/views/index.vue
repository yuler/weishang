<template>
<ul class="productions items" id="productions" @scroll="scrollFunc">
    <li v-for="p in productions">
    	<a v-link="{ name: 'productionShow', params: { id: p.id }}">
        <img v-bind:src="p.photoIds | getImagePoster">
        <div>
        	<p>{{p.name}}</p>
        	<p>{{p.summary}}</p>
        	<p>{{p.productType.name}}</p>
        	<p></p>
        </div>
        <p>{{ p.price }}</p>
      </a>
    </li>
</ul>
</template>

<script>
import api from '../api.js'

export default {
	data () {
		return {
			productions: [],
		}
	},
	route: {
		data ({ to }) {
			return api.productions.index()
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
			if ((e.target.scrollTop + e.target.offsetHeight) >= e.target.scrollHeight) {
        console.info('向下滚动');
      }
		}
	}
}
</script>

<style>
.items {
  position: fixed;
  top: 44px;
  bottom: 0;
  overflow-y: auto;
}
#productions li {
	padding: 10px 10px;
	border-bottom: 1px solid #ccc;
}
#productions li a {
	display: block;
}
#productions li a img {
	float: left;
	width: 50px;
	height: 50px;
}
#productions li a div {
	width: -webkit-calc(100% - 120px);
	display: inline-block;
	margin-left: 10px;
}
#productions li a div p {
	overflow: hidden;
  white-space: nowrap;
	text-overflow:ellipsis;
	margin: 0;
}
#productions li a > p {
	margin: -10px 0;
  display: inline-block;
  line-height: 100px;
  float: right;
}
</style>
