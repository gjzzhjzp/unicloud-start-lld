<template>
	<u-navbar :is-back="isBack">
		<template>
			<view style="margin: 10px;">
				<u-image width="200rpx" height="60rpx" src="/static/head/logo.png"></u-image>
			</view>
			<view class="sy-u-search">
				<slot></slot>
			</view>
			<view style="margin: 10px;" @click="tousercenter">
				<u-image width="50rpx" height="50rpx" src="/static/head/user.png"></u-image>
			</view>
		</template>
	</u-navbar>
</template>
<script>
	export default{
		name:"jz-navbar",
		data(){
			return {
				
			}
		},
		props:{
			isBack:{
				type:Boolean,
				default(){
					return false
				}
			}
		},
		methods:{
			tousercenter(){
				uni.navigateTo({
					url: "/pages/ucenter/ucenter"
				})
			}
		}
	}
</script>

<style>
</style>
