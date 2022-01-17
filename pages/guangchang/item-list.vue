<template>
	<view class="er-item-list">
		<u-grid :col="1" :border="false" >
			<u-grid-item v-for="(item, index) in list" :custom-style="{'padding':0}" :key="index" @click="$notMoreTap(toDetail,'notTap',item)">
				<view class="er-item-list-warter">
					<view class="er-item-list-warter1">
						<!-- <u-image :show-loading="true" loading-icon="/static/center/chang1.png" error-icon="/static/center/error_chang.png"  height="200rpx" border-radius="10" :src="imageUrl(item)" mode="aspectFill">
										
						</u-image> -->
						<!-- <u-lazy-load threshold="300" height="200" border-radius="10" img-mode="aspectFill"
							:image="imageUrl(item)" :index="index"></u-lazy-load> -->
						<view style="padding: 8px;">
							<view class="er-item-list-title">
								{{item.title}}
							</view>
							<view class="er-item-list-content">
								{{item.excerpt}}
							</view>
						</view>
					</view>
				</view>
			</u-grid-item>
		</u-grid>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	export default {
		data() {
			return {
				notTap: true, //一定要设置为true
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
		padding: 16rpx;
		position: relative;
		width: 100%;
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
		// width: 50%;
		display: inline-block;
	}

	.er-item-list-warter1 {
		width: 100%;
		box-shadow: 0px 0px 6px #d5d5d6;
		border-radius: 10px;
		// padding: 10px;
	}
</style>
