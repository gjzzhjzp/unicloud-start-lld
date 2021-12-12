<template>
	<view class="jz-container">
		<u-navbar :is-back="true" title=""></u-navbar>
		<u-parse :html="content"></u-parse>
	</view>
</template>
<script>
	export default{
		name:"disclaimers",
		data(){
			return {
				content:""
			}
		},
		created(){
			var config=getApp().globalData.config;
			if(config["800016"]){
				this.content=config["800016"];
			}
		}
	}
</script>

<style>
</style>
