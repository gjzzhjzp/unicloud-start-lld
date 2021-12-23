<template>
	<view class="jz-navbar">
		<u-navbar :is-back="isBack">
			<template>
				<view v-show="showlogo" style="margin: 10px;">
					<u-image width="200rpx" height="60rpx" src="/static/head/logo.png" mode="widthFix"></u-image>
				</view>
				<view class="sy-u-search">
					<slot></slot>
				</view>
				<view v-show="!issy" style="margin: 10px;" @click="$notMoreTap(tosearch,'notTap')">
					<u-image width="50rpx" height="50rpx" src="/static/head/search.png"></u-image>
				</view>
				<view style="margin: 10px;" @click="$notMoreTap(tousercenter,'notTap')">
					<u-image width="50rpx" height="50rpx" src="/static/head/user.png"></u-image>
				</view>
			</template>
		</u-navbar>
	</view>
	
</template>
<script>
	export default{
		name:"jz-navbar",
		data(){
			return {
				notTap:true//一定要设置为true
			}
		},
		props:{
			showlogo:{
				type:Boolean,
				default(){
					return true
				}
			},
			isBack:{
				type:Boolean,
				default(){
					return false
				}
			},
			issy:{
				type:Boolean,
				default(){
					return true
				}
			}
		},
		methods:{
			tousercenter(){
				uni.navigateTo({
					url: "/pages/ucenter/ucenter"
				})
			},
			tosearch(){
				uni.navigateTo({
					url: "/pages/list/search/search"
				})
			}
		}
	}
</script>

<style>
</style>
