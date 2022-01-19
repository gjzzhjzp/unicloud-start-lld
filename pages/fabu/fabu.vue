<template>
	<view class=" jz-fabu">
		<u-navbar :is-back="false" title="发布"></u-navbar>
		<view class="jz-fabu-con">
			<view style="margin-right: 4px;">
				<u-image width="100rpx" height="100rpx" src="/static/newpage/write.png"></u-image>
			</view>
			<view>
				<view class="jz-fabu-title">
					发贴/投稿
				</view>
				<view class="jz-fabu-content">
					用户发帖，审核成功的帖子会发布到广场；用户投稿，审核成功的稿子将会收录到俊哲资源站，用户可在首页或分类收看
				</view>
			</view>
			
		</view>
		<view class="jz-fabu-tab">
			<u-tabs ref="tabs" :bar-width="0" active-color="#777BCE" :font-size="36" :list="tablist" :current="current"
				@change="change"></u-tabs>
		</view>
		<view class="jz-fabu-tabcontent">
			<view v-if="current==0">
				<addresources :showtitle="false"></addresources>
			</view>
			<view v-else>
				<addtaolun :showtitle="false"></addtaolun>
			</view>
		</view>
		<!-- <view class="jz-container-button">
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
		</view>-->
		<jz-tabbar></jz-tabbar>
		<jz-gonggao ref="gonggao"></jz-gonggao>
	</view>
</template>

<script>
	import addresources from "../jz-opendb-resources/add.vue"
	import addtaolun from "../jz-opendb-taolun/add.vue"
	import gonggao from "@/common/gonggao.js"
	export default {
		data() {
			return {
				tablist: [{
					name: '发帖'
				}, {
					name: '投稿'
				}],
				current: 0
			}
		},
		components: {
			addresources,
			addtaolun
		},
		mixins: [gonggao],
		methods: {
			change(index) {
				this.current = index;
			},
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
	.jz-fabu-title {
		font-size: 20px;
		color: #fff;
		font-weight: 600;
	}

	.jz-fabu-content {
		margin-top: 6px;
		color: #C3C5E9;
		font-size: 13px;
	}

	.jz-fabu-con {
		background-color: #777BCE;
		padding: 20px;
		display: flex;
	}

	.jz-fabu-tabcontent {
		background-color: #fff;
	}

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
