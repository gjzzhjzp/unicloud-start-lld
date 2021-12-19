<template>
	<view class="detail-image" :pl-number="plNumber">
		<detailhead-mp4 :data="data">
			<!-- <detailhead :data="data"></detailhead> -->
			<template slot="content">
				<view class="detail-image-item">
					<image :src="imageUrl()" mode="widthFix"></image>
				</view>
				<!-- <view class="detail-open">
					<view>
						外链地址：
					</view>
					<view>
						<u-link :href="data.aliyun_dz">点击跳转</u-link>
					</view>
				</view> -->
			</template>
			<template slot="comment">
				<comment ref="comment" :zydata="data" @changenumber="changenumber"></comment>
			</template>
		</detailhead-mp4>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import detail from "./detail.js"
	import detailheadMp4 from "./detailheadMp4.vue"
	export default {
		data() {
			return {
				imgs: [],
				plNumber:0
			}
		},
		components: {
			detailheadMp4
		},
		mixins: [detail],
		props: {
			data: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		mounted() {
			this.initImage();
		},
		methods: {
			changenumber(plNumber){
				this.plNumber=plNumber;
			},
			imageUrl() {
				if (Array.isArray(this.data.avatar)) {
					return this.data.avatar[0].url;
				} else {
					return this.data.avatar.url;
				}
			},
			initImage() {
				this.imgs.splice(0, this.imgs.length);
				if (this.data && this.data.avatar.url) {
					this.imgs.push(this.data.avatar.url);
				}
			},
			previewOpen() {
				this.$refs.previewImage.open(this.data.avatar.url);
			},
		}
	}
</script>
<style>
	.detail-open {
		display: flex;
		text-align: center;
		/* padding-left: 20px; */
	}

	.detail-image-item {
		margin: 20rpx 0;
	}

	.detail-image-item image {
		width: 100%;
		border-radius: 10px;
	}
</style>
