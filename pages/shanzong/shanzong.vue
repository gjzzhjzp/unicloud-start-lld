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
			<jz-sy-list ref="sylist1" title="夺笋" label="夺笋"></jz-sy-list>
			<jz-sy-list ref="sylist2" title="二创图片" label="二创图片"></jz-sy-list>
			<jz-sy-list ref="sylist3" title="表情包" label="表情包"></jz-sy-list>
			<jz-sy-list ref="sylist4" title="同人文" label="同人文"></jz-sy-list>
		</view>
		<jz-tabbar></jz-tabbar>
	</view>
</template>
<script>
	export default {
		data() {
			return {}
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.$refs.sylist1.getList();
			this.$refs.sylist2.getList();
			this.$refs.sylist3.getList();
			this.$refs.sylist4.getList();
			uni.stopPullDownRefresh()
		},
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
