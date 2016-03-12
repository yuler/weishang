<template>
<div id="productions">
	<ul class="productions">
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
</div>
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
						productions: res.rows,
					}
				}, err => {
					console.log(err);
					alert('接口错误');
				})
		}
	},
	methods: {
		productionShow: function (id) {
			alert('msg');
		}
	}
}
</script>

<style>
#productions .productions li {
	padding: 10px 10px;
	border-bottom: 1px solid #ccc;
}
#productions .productions li a {
	display: block;
}
#productions .productions li a img {
	float: left;
	width: 50px;
	height: 50px;
}
#productions .productions li a div {
	width: -webkit-calc(100% - 120px);
	display: inline-block;
	margin-left: 10px;
}
#productions .productions li a div p {
	overflow: hidden;
  white-space: nowrap;
	text-overflow:ellipsis;
	margin: 0;
}
#productions .productions li a > p {
	margin: -10px 0;
  display: inline-block;
  line-height: 100px;
  float: right;
}
</style>
