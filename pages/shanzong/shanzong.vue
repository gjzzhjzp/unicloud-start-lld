<template>
	<view >
		<!-- <jz-navbar :issy="false" ref="navbar">
			<view class="jz-navbar-title">山总</view>
		</jz-navbar> -->
		<u-navbar :is-back="true" title="山总"></u-navbar>
		<jz-notice :type="1"></jz-notice>
		<view class="jz-container">
			<view>
				<jz-banner ref="banner" :type="2"></jz-banner>
			</view>
			<view class="jz-sy-section">
			</view>
			<jz-sy-list ref="sylist1" title="夺笋" label="夺笋"></jz-sy-list>
			<jz-sy-list ref="sylist2" title="二创" label="二创"></jz-sy-list>
			<jz-sy-list ref="sylist3" title="表情包" label="表情包"></jz-sy-list>
			<jz-sy-list ref="sylist5" title="原创" label="原创"></jz-sy-list>
			<jz-sy-list ref="sylist4" title="同人文" label="同人文"></jz-sy-list>
		</view>
		<!-- <jz-tabbar></jz-tabbar> -->
		<!-- <jz-gonggao ref="gonggao"></jz-gonggao> -->
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
			uni.stopPullDownRefresh()
		},
		onShow: function() {
			if(this.$refs.navbar){
				this.$refs.navbar.checknewinfo();
			}
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
