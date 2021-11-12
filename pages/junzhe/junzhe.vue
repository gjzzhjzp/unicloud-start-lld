<template>
	<view >
		<jz-navbar :issy="false">
			<view class="jz-navbar-title">俊哲</view>
		</jz-navbar>
		<jz-notice :type="0"></jz-notice>
		<view class="jz-container">
		<view>
			<jz-banner :type="1"></jz-banner>
		</view>
		<jz-sy-list title="山河令" label="山河令"></jz-sy-list>
		<jz-sy-list title="双人综艺" label="双人综艺"></jz-sy-list>
		<jz-sy-list title="双人直播" label="双人直播"></jz-sy-list>
		<jz-sy-list title="双人采访" label="双人采访"></jz-sy-list>
		<jz-sy-list title="双人图片" label="双人图片"></jz-sy-list>
		</view>
		<jz-tabbar></jz-tabbar>
	</view>
</template>
<script>
	export default {
		data() {
			return {}
		}
	}
</script>
<style scoped lang="scss">
	.jz-sy-list {
		padding: 10rpx 0px;
	}
</style>
