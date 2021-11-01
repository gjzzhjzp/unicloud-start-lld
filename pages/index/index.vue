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
			<u-section title="热门" :right="false"></u-section>
			<view>
				<jz-sy-list></jz-sy-list>
			</view>
		</view>
		<view>
			<u-section title="最新" :right="false"></u-section>
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
