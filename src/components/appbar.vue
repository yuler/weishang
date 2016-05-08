<template>
<header>
		<a v-link="{ name: 'index' }" v-if="isRegisterView"><i class="fa fa-3x fa-angle-left"></i></a>
		<a href="javascript:history.go(-1)" v-if="!isRegisterView"><i class="fa fa-3x fa-angle-left"></i></a>
		<h1>{{ title }}</h1>
		<a v-link="{ name: 'me' }"><i class="fa fa-2x fa-user"></i></a>
</header>
</template>

<script>
export default {
	props: ['title'],
	computed: {
		isRegisterView() {
			return this.$route.name === 'register' || this.$route.name === 'productionShow' ? true : false
		}
	}
}
</script>

<style lang="stylus" scoped>
@import "../assets/_variables.styl"

header
	padding 5px
	height 34px
	background $themeColor
	position fixed
	top 0
	left 0
	right 0
	z-index 100
	box-shadow 0 1px 3px rgba(0,0,0,0.3)
	a
		color white
		position absolute
		i
			line-height $appbarHeight
			width $appbarHeight
			text-align center
		&:last-child
			position absolute
			right 0
			top 5px;
		&:first-child
			left 0
	h1
		text-align center
		line-height $appbarHeight
		font-size 20px
		width 100%
		color white
		display block
</style>
