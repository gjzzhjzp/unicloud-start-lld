<template>
	<view class="er-item-list">
		<view class="er-item-list-warter" v-for="(item, index) in list" :key="index" @click="toDetail(item)">
			<u-lazy-load threshold="300" border-radius="10" :image="imageUrl(item)" :index="index"></u-lazy-load>
			<view style="padding: 8px;">
				<view class="er-item-list-title">
					{{item.title}}
				</view>
				<view class="er-item-list-author" v-if="item.userinfo">
					<view class="er-item-list-img">
						<u-avatar :size="50"
							:src="(item.userinfo&&item.userinfo[0].avatar_file)?item.userinfo[0].avatar_file.url:''">
						</u-avatar>
						{{item.userinfo?item.userinfo[0].nickname:''}}
					</view>
					<view class="er-item-list-right">
						<u-icon name="heart"></u-icon>{{item.like_count||0}}
					</view>
				</view>
			</view>
		</view>
		<u-modal v-model="showmodel" title="输入邀请码" :show-cancel-button="true" @confirm="confirm">
			<view class="slot-content" style="padding: 10px;">
				<view style="margin-bottom: 8px;">
					<u-alert-tips type="warning" description="个人中心>>我的邀请码中可申请邀请码"></u-alert-tips>
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
	.er-item-list-warter {
		border-radius: 8px;
		margin: 10px;
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

	.er-item-list .er-item-list-warter {
		box-shadow: 0px 0px 6px #d5d5d6;
		border-radius: 10px;
		margin: 10px;
	}

	.er-item-list-right {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
