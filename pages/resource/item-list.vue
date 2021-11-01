<template>
	<view class="er-item-list">
		<view class="er-item-list-warter" v-for="(item, index) in list" :key="index" @click="godetail(item)">
			<u-lazy-load threshold="300" border-radius="10" :image="item.avatar.url" :index="index"></u-lazy-load>
			<view class="er-item-list-title">
				{{item.title}}
			</view>
			<view class="er-item-list-author">
				{{item.author}}
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
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
		methods:{
			godetail(item){
				uni.navigateTo({
					url:"/pages/detail/detail?id="+item._id
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.er-item-list-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
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
	}
</style>
