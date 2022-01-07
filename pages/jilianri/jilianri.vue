<template>
	<view>
		<jz-navbar :issy="false" ref="navbar">
			<view class="jz-navbar-title">纪念日</view>
		</jz-navbar>
		<d-rili></d-rili>
		<jz-tabbar></jz-tabbar>
		<jz-gonggao ref="gonggao"></jz-gonggao>
	</view>
</template>

<script>
	import gonggao from "@/common/gonggao.js"
	export default{
		name:"jilianri",
		mixins: [gonggao],
		data(){
			return {
				
			}
		},
		onShow: function() {
			if(this.$refs.navbar){
				this.$refs.navbar.checknewinfo();
			}
		},
	}
</script>

<style>
</style>
