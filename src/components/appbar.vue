<template>
<header>
		<a href="javascript:history.go(-1)"><i class="fa fa-3x fa-angle-left"></i></a>
		<h1>主页</h1>
		<a v-link="{ name: 'me' }"><i class="fa fa-2x fa-user"></i></a>
</header>
</template>

<style lang="stylus" scoped>
@import "../assets/_variables.styl"

header
	display -webkit-flex
	display -ms-flexbox
	display flex
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
	h1
		text-align center
		line-height $appbarHeight
		font-size 20px
		width 100%
		color white
		display inline-block
		margin-left 34px
		margin-right 34px
</style>

<script>

</script>
