<template>
	<view class="jz-container">
		<jz-navbar :issy="false">
			<view class="jz-navbar-title">俊哲</view>
		</jz-navbar>
		<view class="jz-notice">
			<u-notice-bar mode="vertical" :list="list"></u-notice-bar>
		</view>
		<view>
			<jz-banner :type="1"></jz-banner>
		</view>
		<jz-sy-list title="山河令" label="山河令"></jz-sy-list>
		<jz-sy-list title="双人综艺" label="双人综艺"></jz-sy-list>
		<jz-sy-list title="双人直播" label="双人直播"></jz-sy-list>
		<jz-sy-list title="双人采访" label="双人采访"></jz-sy-list>
		<jz-sy-list title="双人图片" label="双人图片"></jz-sy-list>
		<jz-tabbar></jz-tabbar>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [
					'上辈子积大德，这辈子磕俊哲',
					'开开心心浪浪钉，长长久久走花路'
				]
			}
		}
	}
</script>
<style scoped lang="scss">
	
	.jz-sy-list{
		padding: 10rpx 0px;
	}
	.jz-notice{
		padding: 10rpx 0px;
	}
</style>
