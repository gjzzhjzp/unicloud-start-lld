<template>
	<view class="jz-container">
		<view>
			<u-navbar :is-back="false">
				<template>
					<view style="margin: 10px;">
						<u-image width="200rpx" height="60rpx" src="/static/head/logo.png"></u-image>
					</view>
					<view class="sy-u-search">
						<u-search border-color="#7275D3" bg-color="#fff" height="60" placeholder="" @search="tosearch" @custom="tosearch"
							:show-action="true"></u-search>
					</view>
					<view style="margin: 10px;" @click="tousercenter">
						<u-image width="50rpx" height="50rpx" src="/static/head/user.png"></u-image>
						<!-- <u-icon name="photo"></u-icon> -->
					</view>
				</template>
			</u-navbar>
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

			}
		},
		methods: {
			tosearch() {
				uni.navigateTo({
					url: "/pages/list/search/search"
				})
			},
			tousercenter(){
				uni.navigateTo({
					url: "/pages/ucenter/ucenter"
				})
			}
		}
	}
</script>
<style>
	.jz-sy-list{
		padding: 10rpx 0px;
	}
</style>
