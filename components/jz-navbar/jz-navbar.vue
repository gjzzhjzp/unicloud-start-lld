<template>
	<view class="jz-navbar">
		<u-navbar :is-back="isBack">
			<template>
				<view v-show="showlogo" style="margin: 10px;">
					<u-image width="200rpx" height="60rpx" src="/static/head/logo.png" mode="widthFix"></u-image>
				</view>
				<view class="sy-u-search">
					<slot></slot>
				</view>
				<!-- <view v-show="!issy" style="margin: 10px;" @click="$notMoreTap(tosearch,'notTap')">
					<u-image width="50rpx" height="50rpx" src="/static/head/search.png"></u-image>
				</view> -->
				<view style="margin: 10px;" @click="$notMoreTap(tousercenter,'notTap')"
					:class="[isnewinfo?'isnewinfo':'']">
					<u-image width="50rpx" height="50rpx" src="/static/head/user.png"></u-image>
				</view>
			</template>
		</u-navbar>
	</view>

</template>
<script>
	const db = uniCloud.database();
	export default {
		name: "jz-navbar",
		data() {
			return {
				notTap: true, //一定要设置为true
				isnewinfo: false
			}
		},
		props: {
			showlogo: {
				type: Boolean,
				default () {
					return true
				}
			},
			isBack: {
				type: Boolean,
				default () {
					return false
				}
			},
			issy: {
				type: Boolean,
				default () {
					return true
				}
			}
		},
		created() {
			this.checknewinfo();
		},
		methods: {
			// 检测时候有新的系统消息
			async checknewinfo() {
				this.isnewinfo = false;
				var userInfo = uni.getStorageSync("userInfo");
				var res = await db.collection('jz-custom-systeminfo').where({
					user_id: userInfo._id,
					type: db.command.neq(0)
				}).field("comment").get();
				if (res.result.data && res.result.data.length > 0) {
					var old_news = uni.getStorageSync("systeminfo_" + userInfo._id);
					var infos = res.result.data;
					var ids = [];
					infos.forEach((item) => {
						if (old_news.indexOf(item._id) == -1) {
							this.isnewinfo = true;
							return;
						}
					});
					console.log("this.isnewinfo", this.isnewinfo);
				}
			},
			tousercenter() {
				uni.navigateTo({
					url: "/pages/ucenter/ucenter"
				})
			},
			tosearch() {
				uni.navigateTo({
					url: "/pages/list/search/search"
				})
			}
		}
	}
</script>

<style>
	.isnewinfo::after {
		content: "";
		display: block;
		height: 6px;
		width: 6px;
		color: red;
		background-color: red;
		border-radius: 50%;
		position: absolute;
		right: 10px;
		top: 10px;
	}
</style>
