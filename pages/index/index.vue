<template>
	<view class="jz-container">
		<view>
			<jz-navbar>
				<u-search border-color="#7275D3" bg-color="#fff" height="60" placeholder="" @search="tosearch" @custom="tosearch"
					:show-action="true"></u-search>
			</jz-navbar>
		</view>
		<view>
			<jz-banner></jz-banner>
		</view>
		<view>
			<jz-grid></jz-grid>
		</view>
		<view>
			<u-section line-color="#7275D3" title="热门内容" :right="true" sub-title="查看更多>>" :arrow="false"></u-section>
			<view class="jz-sy-list">
				<jz-sy-list></jz-sy-list>
			</view>
		</view>
		<view>
			<u-section line-color="#7275D3" title="最新内容" :right="true" sub-title="查看更多>>" :arrow="false"></u-section>
			<view class="jz-sy-list">
				<jz-sy-list></jz-sy-list>
			</view>
		</view>
		
		<jz-tabbar></jz-tabbar>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
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
	.jz-sy-list{
		padding: 10rpx 0px;
	}
</style>
