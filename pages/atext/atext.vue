<template>
	<view>
		<u-button @click="text()">测试</u-button>
		<u-button @click="text1()">还原</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			text() {
				var pscreen = plus.webview.currentWebview().opener();
				mui.fire(pscreen, 'changescreen', {
					direction: "landscape-primary"
				});
			},
			text1(){
				var pscreen = plus.webview.currentWebview().opener();
				mui.fire(pscreen, 'changescreen', {
					direction: "portrait-primary"
				});
			}
		}
	}
</script>

<style>
</style>
