<template>
	<view class="jz-container">
		<view>
			<u-navbar :is-back="false">
				<template>
					<view style="margin: 10px;">俊哲宇宙</view>
					<u-search bg-color="#000" placeholder="搜索..." @search="tosearch" @custom="tosearch"
						:show-action="true"></u-search>
					<view style="margin: 10px;" @click="tousercenter">
						<u-icon name="photo"></u-icon>
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
			<u-section title="热门内容" :right="true"></u-section>
			<view>
				<jz-sy-list></jz-sy-list>
			</view>
		</view>
		<view>
			<u-section title="最新内容" :right="true"></u-section>
			<view>
				<jz-sy-list></jz-sy-list>
			</view>
		</view>
		<view>
			<u-section title="山河令" :right="true"></u-section>
			<view>
				<jz-sy-list></jz-sy-list>
			</view>
		</view>
		<view>
			<u-section title="双人综艺" :right="true"></u-section>
			<view>
				<jz-sy-list></jz-sy-list>
			</view>
		</view>
		<view>
			<u-section title="双人直播" :right="true"></u-section>
			<view>
				<jz-sy-list></jz-sy-list>
			</view>
		</view>
		<view>
			<u-section title="双人采访" :right="true"></u-section>
			<view>
				<jz-sy-list></jz-sy-list>
			</view>
		</view>
		<view>
			<u-section title="双人图片" :right="true"></u-section>
			<view>
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
</style>
