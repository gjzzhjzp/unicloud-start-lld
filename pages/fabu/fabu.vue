<template>
	<view class="jz-container">
		<u-navbar :is-back="false" title="选择类型"></u-navbar>
		<view class="jz-container-button">
			<view>
				<u-button @click="totougao()">我要投稿</u-button>
			</view>
			<view style="margin-top: 40px;">
				<u-button @click="tofatie()">我要发帖</u-button>
			</view>
			<view style="margin-top: 40px;">
				<u-button @click="tougaojc()">投稿教程</u-button>
			</view>
			<view style="margin-top: 40px;">
				<u-button @click="tougaogz()">投稿规则</u-button>
			</view>
			<view style="margin-top: 40px;">
				<u-button>发帖教程</u-button>
			</view>
			<view style="margin-top: 40px;">
				<u-button>发帖规则</u-button>
			</view>

		</view>
		<jz-tabbar></jz-tabbar>
		<jz-gonggao ref="gonggao"></jz-gonggao>
	</view>
</template>

<script>
	import gonggao from "@/common/gonggao.js"
	export default {
		data() {
			return {

			}
		},
		mixins: [gonggao],
		methods: {
			totougao() {
				uni.navigateTo({
					url: "/pages/jz-opendb-resources/add"
				});
			},
			tofatie() {
				uni.navigateTo({
					url: "/pages/jz-opendb-taolun/add"
				});
			},
			tougaojc() {
				uni.navigateTo({
					url: "/pages/detail/detail?id=61aee1840d111e00012bf162"
				});
			},
			tougaogz() {
				uni.navigateTo({
					url: "/pages/detail/detail?id=61ca6e97344587000187e9b2"
				});
			}
		}
	}
</script>

<style>
	.jz-container-button {
		padding: 0px 20px;
		height: 100vh;
		display: flex;
		flex-direction: column;
		margin-top: 50px;
		/* align-items: center; */
		/* justify-content: center; */
	}
</style>
