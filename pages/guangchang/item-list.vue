<template>
	<view class="er-item-list">
		<u-grid :col="1" :border="false">
			<u-grid-item v-for="(item, index) in list" bg-color="#F5F5F5" :custom-style="{'padding':0}" :key="index">
				<view class="er-item-list-warter">
					<view class="er-item-list-warter2">
						<view class="er-item-list-zd" v-if="item.is_recommend==1">
							<view style="display: flex;align-items: center;justify-content: center;">
								<u-icon name="arrow-upward"></u-icon>置顶
							</view>
						</view>
						<view class="er-item-list-warter1">
							<view class="er-item-list-img" @click="toperson(item)">

								<view class="original" v-if="item.userinfo&&item.userinfo[0].original">
									<image class="original-img" src="@/static/center/ori_back.png"></image>
								</view>
								<u-avatar :size="80"
									:src="(item.userinfo&&item.userinfo[0].avatar_file)?item.userinfo[0].avatar_file.url:''">
								</u-avatar>
								<view class="original-title">
									<text
										style="color: #333333;font-size: 14px;">{{item.userinfo&&item.userinfo[0].nickname?item.userinfo[0].nickname:'佚名'}}</text>
									<uni-dateformat class="publish_date" :date="item.publish_date"
										format="yyyy-MM-dd hh:mm:ss" :threshold="[60000, 2592000000]" />
								</view>
							</view>
							<view class="er-item-list-gz" v-if="showguanzhu(item)">
								<u-button size="medium" shape="circle" @click="guanzhu(item)">关注</u-button>
							</view>
						</view>
						<view @click="$notMoreTap(toDetail,'notTap',item)">
							<view class="er-item-list-content">
								{{item.excerpt}}
							</view>
						</view>
						<operation v-if="showoperation" :data="item" @topl="toDetail"></operation>
					</view>
				</view>
			</u-grid-item>
		</u-grid>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	const db = uniCloud.database();
	import operation from "./operation.vue"
	export default {
		data() {
			return {
				notTap: true, //一定要设置为true
			}
		},
		components: {
			operation
		},
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			showoperation: {
				type: Boolean,
				default () {
					return true
				}
			},
			isgz: {
				type: Boolean,
				default () {
					return false
				}
			}
		},
		watch: {
			list() {
				this.list.forEach((item) => {
					if (item.labels) {
						var arr = [];
						var _labels = item.labels.split("，");
						_labels.forEach((item1) => {
							if (item1) {
								arr.push(item1);
							}
						})
						this.$set(item, "labelarr", arr);
					}
				});
			}
		},
		methods: {
			showguanzhu(item) {
				if (this.isgz) {
					return false;
				} else {
					if (item.gz_sed) {
						return false;
					} else {
						var userinfo = uni.getStorageSync("userInfo");
						if (userinfo._id == item.user_id) {
							return false;
						} else if (item.guanzhu && item.guanzhu.length > 0) {
							return false;
						} else {
							return true;
						}
					}
				}
				// !item.gz_sed
			},
			toperson(item) {
				if (item.userinfo && item.userinfo.length > 0) {
					var id = item.userinfo[0]._id;
					if (id) {
						var userinfo = uni.getStorageSync("userInfo");
						if (userinfo._id == id) {
							uni.navigateTo({
								url: "/pages/ucenter/ucenter"
							});
						} else {
							uni.navigateTo({
								url: "/pages/ucenter/tacenter?id=" + id
							});
						}
					}
				}
			},
			async guanzhu(item) {
				var userinfo = item.userinfo ? item.userinfo[0] : "";
				if (userinfo) {
					await db.collection("opendb-news-guanzhu").add({
						user_id: db.getCloudEnv('$cloudEnv_uid'),
						buser_id: userinfo._id,
						guanzhu_date: db.getCloudEnv('$cloudEnv_now')
					});
					this.$set(item, "gz_sed", true);
					this.$refs.uToast.show({
						title: '已关注',
						type: 'success'
					});
				}
			},
			imageUrl(item) {
				var url = "";
				if (Array.isArray(item.avatar)) {
					url = item.avatar[0].url;
				} else {
					url = item.avatar.url;
				}
				return url;
			},
			toDetail(item) {
				uni.navigateTo({
					url: "/pages/jz-opendb-taolun/detail/detail?id=" + item._id
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.er-item-list-zd {
		width: 100%;
		display: flex;
		flex-direction: row-reverse;
		color: red;
	}

	.er-item-list-content {
		font-size: 14px;
	}

	.publish_date {
		font-size: 10px;
		color: #888888;
	}

	.original {
		position: relative;
	}

	.original-title {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
	}

	.original-img {
		width: 68rpx;
		height: 68rpx;
		position: absolute;
		top: -32rpx;
		left: -10rpx;
	}

	.er-item-list-warter {
		border-radius: 8px;
		padding: 10rpx 20rpx;
		position: relative;
		width: 100%;
	}

	.er-item-list-warter2 {
		padding: 20rpx;
		background-color: #fff;
		border-radius: 8px;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.er-item-list-image {
		width: 100%;
		border-radius: 4px;
	}

	.er-item-list-title {
		font-size: 36rpx;
		font-weight: 600;
		margin-top: 5px;
		color: $u-main-color;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

	}

	.er-item-list-tag {
		display: flex;
		margin-top: 5px;
	}

	.er-item-list-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.er-item-list-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.er-item-list-author {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.er-item-list-img {
		display: flex;
		align-items: center;
	}

	.er-item-list .er-item-list-warter {}

	.er-item-list-right {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.er-item-list .er-item-list-warter {
		// width: 50%;
		display: inline-block;
	}

	.er-item-list-warter1 {
		width: 100%;
		// border-bottom: 1px solid #d5d5d6;
		// box-shadow: 0px 0px 6px #d5d5d6;
		border-radius: 10px;
		padding-bottom: 10px;
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		// padding: 10px;
	}
</style>
