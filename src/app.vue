<template>
	<appbar></appbar>
	<div class="container">
		<router-view></router-view>
	</div>
</template>
<style lang="stylus" scoped>
div.container
	margin-top 44px
</style>
<script>
	import Appbar from './components/appbar.vue'

	export default {
		components: {
			'appbar': Appbar
		}
	}
</script>