<template>
	<view class="detail-image" :pl-number="plNumber">
		<detailhead-mp4 :data="data">
			<template slot="content">
				<view style="margin-top: 20rpx;">
					<nine-squared :list="data.resources" @preview="previewOpen"></nine-squared>
					<kxj-previewImage ref="previewImage" :imgs="imgs"></kxj-previewImage>
				</view>
				<!-- <detailhead :data="data"></detailhead> -->
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
	// import detailhead from "./detailhead.vue"
	import nineSquared from "./nineSquared.vue"
	import detailheadMp4 from "./detailheadMp4.vue"
	export default {
		data() {
			return {
				imgs: [],
				plNumber:0
			}
		},
		components: {
			detailheadMp4,
			nineSquared
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
		watch: {
			"data.resources"() {
				this.initImage();
			}
		},
		methods: {
			changenumber(plNumber){
				this.plNumber=plNumber;
			},
			initImage() {
				this.imgs.splice(0, this.imgs.length);
				if (this.data && this.data.resources) {
					this.data.resources.forEach((item) => {
						this.imgs.push(item.url);
					})
				}
			},
			previewOpen(item) {
				this.$refs.previewImage.open(item.url);
			},
		}
	}
</script>
<style>
	.detail-image-item {
		margin: 20rpx 0;
	}

	.detail-image-item image {
		width: 100%;
		border-radius: 10px;
	}
</style>
