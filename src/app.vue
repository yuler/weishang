<template>
	<appbar></appbar>
	<router-view></router-view>
</template>
<style>

</style>
<script>
	import Appbar from './components/appbar.vue'

	export default {
		components: {
			'appbar': Appbar
		}
	}
</script>