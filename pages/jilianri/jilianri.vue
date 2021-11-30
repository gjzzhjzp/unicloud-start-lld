<template>
	<view>
		<jz-navbar :issy="false">
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
		}
	}
</script>

<style>
</style>
