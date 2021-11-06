<template>
	<view >
		<jz-navbar>
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
				<u-section line-color="#7275D3" title="夺笋视频" :right="true" sub-title="查看更多>>" :arrow="false"></u-section>
				<view class="jz-sy-list">
					<jz-sy-list></jz-sy-list>
				</view>
			</view>
			<view >
				<u-section line-color="#7275D3" title="二创图片" :right="true" sub-title="查看更多>>" :arrow="false"></u-section>
				<view class="jz-sy-list">
					<jz-sy-list></jz-sy-list>
				</view>
			</view>
			<view >
				<u-section line-color="#7275D3" title="表情包" :right="true" sub-title="查看更多>>" :arrow="false"></u-section>
				<view class="jz-sy-list">
					<jz-sy-list></jz-sy-list>
				</view>
			</view>
			<view>
				<u-section line-color="#7275D3" title="同人文" :right="true" sub-title="查看更多>>" :arrow="false"></u-section>
				<view class="jz-sy-list">
					<jz-sy-list></jz-sy-list>
				</view>
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
