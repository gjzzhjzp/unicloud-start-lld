<template>
	<view class="er-item-list">
		<!-- <view class="er-item-list-warter">
			<view class="er-item-list-warter1"> -->
		<u-grid :border="false" @click="click" col="2">
			<u-grid-item v-for="(item, index) in list" :key="index" @click="$notMoreTap(toDetail,'notTap',item)">
				<view class="er-item-list-1" style="width: 100%;">
					<o-lazy-load threshold="300" height="100" border-radius="10" img-mode="aspectFill"
						:image="imageUrl(item)" :index="index"></o-lazy-load>
				</view>
				<view class="er-item-list-2">
					<view class="er-item-list-title">
						{{item.title}}
					</view>
					<view class="er-item-list-author" v-if="item.userinfo">
						<view class="er-item-list-img">
							<view class="original" v-if="item.userinfo&&item.userinfo[0].original">
								<image class="original-img" src="@/static/center/ori_back.png"></image>
							</view>
							<u-avatar :size="25"
								:src="(item.userinfo&&item.userinfo[0].avatar_file)?item.userinfo[0].avatar_file.url:''">
							</u-avatar>
							<text
								style="margin-left: 4px;">{{item.userinfo&&item.userinfo[0].nickname?item.userinfo[0].nickname:'佚名'}}</text>

						</view>
						<view class="er-item-list-right">
							<u-icon name="heart"></u-icon>{{item.like_count||0}}
						</view>
					</view>
				</view>
			</u-grid-item>
		</u-grid>
		<!-- </view>
		</view> -->
		<u-modal :show="showmodel" title="输入邀请码" confirmColor="#7275D3" :show-cancel-button="true" @confirm="confirm"
			@cancel="showmodel=false">
			<view class="slot-content">
				<view style="margin-bottom: 8px;">
					<u-alert type="warning" description="个人中心>>我的邀请码中可申请邀请码"></u-alert>
				</view>
				<u-input v-model="yqm" type="text" :border="true" placeholder="请输入邀请码" />
			</view>
		</u-modal>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import yqm from "../../components/jz-sy-list/yqm.js"
	export default {
		data() {
			return {
				notTap: true, //一定要设置为true
			}
		},
		mixins: [yqm],
		props: {
			list: {
				type: Array,
				default () {
					return []
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
		mounted() {
			console.log("list", this.list);
		},
		methods: {

			imageUrl(item) {
				var url = "";
				if (Array.isArray(item.avatar)) {
					url = item.avatar[0].url;
				} else {
					url = item.avatar.url;
				}
				return url;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.original {
		position: relative;
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
		// margin: 10px;
		background-color: #ffffff;
		// padding: 8px;
		position: relative;
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
		font-size: 30rpx;
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
		width: 50%;
		display: inline-block;
	}

	.er-item-list-warter1 {
		box-shadow: 0px 0px 6px #d5d5d6;
		border-radius: 10px;
		margin: 10px;
	}
	.er-item-list-1,.er-item-list-2{
		padding: 6px 8px;
		width: 100%;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}
</style>
