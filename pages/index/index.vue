<template>
	<view>
		<jz-navbar>
			<u-search border-color="#7275D3" bg-color="#fff" height="60" placeholder="" @focus="tosearch"
				@search="tosearch" @custom="tosearch" :show-action="true"></u-search>
		</jz-navbar>
		<view class="jz-container">
			<view>
				<jz-banner></jz-banner>
			</view>
			<view>
				<jz-grid></jz-grid>
			</view>
			<jz-sy-list ref="sylist1" type="rm" title="热门内容"></jz-sy-list>
			<jz-sy-list ref="sylist2" type="zx" title="最新内容"></jz-sy-list>
			<jz-sy-list ref="sylist3" title="山河令" label="山河令"></jz-sy-list>
			<jz-sy-list ref="sylist4" title="夺笋" label="夺笋"></jz-sy-list>
			<jz-tabbar></jz-tabbar>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.$refs.sylist1.getList();
			this.$refs.sylist2.getList();
			this.$refs.sylist3.getList();
			this.$refs.sylist4.getList();
			uni.stopPullDownRefresh()
		},
		methods: {
			tosearch() {
				uni.navigateTo({
					url: "/pages/list/search/search"
				})
			},
		}
	}
</script>
<style>
	.jz-sy-list {
		padding: 10rpx 0px;
	}
</style>
