<template>
	<view >
		<jz-navbar :issy="false">
			<view class="jz-navbar-title">山总</view>
		</jz-navbar>
		<view class="jz-notice">
			<u-notice-bar mode="vertical" :list="list"></u-notice-bar>
		</view>
		<view class="jz-container">
			<view>
				<jz-banner :type="2"></jz-banner>
			</view>
			<view class="jz-sy-section">
			</view>
			<jz-sy-list title="夺笋视频" label="夺笋视频"></jz-sy-list>
			<jz-sy-list title="二创图片" label="二创图片"></jz-sy-list>
			<jz-sy-list title="表情包" label="表情包"></jz-sy-list>
			<jz-sy-list title="同人文" label="同人文"></jz-sy-list>
		</view>
		<jz-tabbar></jz-tabbar>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [
					'山河不足重，重在遇知己',
					'你身上有光，我抓来看看'
				]
			}
		}
	}
</script>
<style scoped lang="scss">
	.jz-sy-list{
		padding: 10rpx 0px;
	}
	.jz-sy-section{
		margin-top: 20rpx;
	}
	.jz-notice{
		padding: 10rpx;
	}
</style>
