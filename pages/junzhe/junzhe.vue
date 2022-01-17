<template>
	<view >
		<!-- <jz-navbar :issy="false" ref="navbar">
			<view class="jz-navbar-title">俊哲</view>
		</jz-navbar> -->
		<u-navbar :is-back="true" title="俊哲"></u-navbar>
		<jz-notice :type="0"></jz-notice>
		<view class="jz-container">
		<view>
			<jz-banner ref="banner" :type="1"></jz-banner>
		</view>
		<jz-sy-list ref="sylist1" title="山河令" label="山河令"></jz-sy-list>
		<jz-sy-list ref="sylist2" title="双人综艺" label="双人综艺"></jz-sy-list>
		<jz-sy-list ref="sylist3" title="双人直播" label="双人直播"></jz-sy-list>
		<jz-sy-list ref="sylist4" title="双人采访" label="双人采访"></jz-sy-list>
		<jz-sy-list ref="sylist5" title="双人图片" label="双人图片"></jz-sy-list>
		</view>
		<!-- <jz-tabbar></jz-tabbar>
		<jz-gonggao ref="gonggao"></jz-gonggao> -->
	</view>
</template>
<script>
	// import gonggao from "@/common/gonggao.js"
	export default {
		data() {
			return {}
		},
		// mixins: [gonggao],
		// 下拉刷新
		onPullDownRefresh(){
			this.$refs.banner.getList();
			this.$refs.sylist1.getList();
			this.$refs.sylist2.getList();
			this.$refs.sylist3.getList();
			this.$refs.sylist4.getList();
			this.$refs.sylist5.getList();
			uni.stopPullDownRefresh();
		},
		onShow: function() {
			if(this.$refs.navbar){
				this.$refs.navbar.checknewinfo();
			}
		},
	}
</script>
<style scoped lang="scss">
	.jz-sy-list {
		padding: 10rpx 0px;
	}
</style>
