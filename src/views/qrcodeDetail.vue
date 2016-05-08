<template>
	<img :src="qrcodeUrl">
</template>

<style lang="stylus" scoped>
img
	width 100%
	
</style>

<script>
	export default {
		data () {
			return {
				id: '',
				name: ''
			}
		},
		route: {
			data({to}) {
				this.id = to.params.id
				this.name = to.params.name
			}
		},
		computed: {
			qrcodeUrl () {
				var host = window.location.host
				this.name = encodeURIComponent(this.name)
	      var url = `http://${host}/register/${this.id}/${this.name}`
	      console.log(url);
				return url && qr.toDataURL(url)
			}
		}
	}
</script>