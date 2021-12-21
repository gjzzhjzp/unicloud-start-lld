<template>
	<view class="jz-navbar">
		<u-navbar :title="title">
			<template slot="right">
				<view class="jz-navbar-left" @click="toback()" v-if="isBack">
					<u-icon size="20" name="arrow-left"></u-icon>
				</view>
				<view v-show="showlogo" style="margin-left: 4px;">
					<u-image width="200rpx" height="60rpx" src="/static/head/logo.png"></u-image>
				</view>
				<view class="sy-u-search">
					<slot></slot>
				</view>
				<view v-show="!issy"  @click="$notMoreTap(tosearch,'notTap')">
					<u-image width="50rpx" height="50rpx" src="/static/head/search.png"></u-image>
				</view>
				<view style="margin-left: 4px;margin-right: 4px;"  @click="$notMoreTap(tousercenter,'notTap')">
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
			title:{
				type:String,
				default(){
					return ""
				}
			},
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
			},
			toback(){
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.jz-navbar-left{
		margin-left: 6px;
	}
</style>
