<template>
	<view >
		<jz-navbar :issy="false">
			<view class="jz-navbar-title">山总</view>
		</jz-navbar>
		<jz-notice :type="1"></jz-notice>
		<view class="jz-container">
			<view>
				<jz-banner :type="2"></jz-banner>
			</view>
			<view class="jz-sy-section">
			</view>
			<jz-sy-list title="夺笋" label="夺笋"></jz-sy-list>
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
			return {}
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
</style>
