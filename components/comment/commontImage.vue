<template>
	<view class="commontImage">
		<view class="original" v-if="isoriginal">
			<image class="original-img" src="@/static/center/ori_back.png"></image>
		</view>
		<image :src="src" mode="aspectFill"></image>
	</view>
</template>

<script>
	export default {
		name: "commontImage",
		data() {
			return {}
		},
		props: {
			src: {
				type: String,
				default () {
					return ""
				}
			},
			isoriginal: {
				type: Boolean,
				default () {
					return false
				}
			}
		}
	}
</script>

<style>
	.original {
		position: relative;
	}

	.original-img {
		    width: 88rpx;
		    height: 88rpx;
		    position: absolute;
		    top: -11rpx;
		    left: -14rpx;
	}

	image {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		background-color: #f2f2f2;
	}
</style>
