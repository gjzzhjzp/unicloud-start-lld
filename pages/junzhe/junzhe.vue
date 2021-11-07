<template>
	<view class="jz-container">
		<jz-navbar :issy="false">
			<view class="jz-navbar-title">俊哲</view>
		</jz-navbar>
		<view>
			<jz-banner :type="1"></jz-banner>
		</view>
		<view class="jz-notice">
			<u-notice-bar mode="vertical" :list="list"></u-notice-bar>
		</view>
		<view>
			<u-section line-color="#7275D3" title="山河令" :right="true" sub-title="查看更多>>" :arrow="false"></u-section>
			<view class="jz-sy-list">
				<jz-sy-list></jz-sy-list>
			</view>
		</view>
		<view>
			<u-section line-color="#7275D3" title="双人综艺" :right="true" sub-title="查看更多>>" :arrow="false"></u-section>
			<view class="jz-sy-list">
				<jz-sy-list></jz-sy-list>
			</view>
		</view>
		<view>
			<u-section line-color="#7275D3" title="双人直播" :right="true" sub-title="查看更多>>" :arrow="false"></u-section>
			<view class="jz-sy-list">
				<jz-sy-list></jz-sy-list>
			</view>
		</view>
		<view>
			<u-section line-color="#7275D3" title="双人采访" :right="true" sub-title="查看更多>>" :arrow="false"></u-section>
			<view class="jz-sy-list">
				<jz-sy-list></jz-sy-list>
			</view>
		</view>
		<view>
			<u-section line-color="#7275D3" title="双人图片" :right="true" sub-title="查看更多>>" :arrow="false"></u-section>
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
