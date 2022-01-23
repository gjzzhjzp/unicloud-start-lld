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
					<u-image width="50rpx" height="50rpx" src="/static/newpage/notice.png"></u-image>
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
				var last_time = uni.getStorageSync("systeminfo_last");
				var _obj = {
					user_id: userInfo._id,
					type: db.command.neq(0)
				}
				if (last_time) {
					Object.assign(_obj, {
						comment_date: db.command.gt(last_time)
					})
				}
				var res = await db.collection('jz-custom-systeminfo').where(_obj).field("comment").get();
				if (res.result.data && res.result.data.length > 0) {
					this.$set(this,"isnewinfo",true);
				}else{
					this.$set(this,"isnewinfo",false);
				}
			},
			tousercenter() {
				uni.navigateTo({
					url: "/pages/system-info/system-info"
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
