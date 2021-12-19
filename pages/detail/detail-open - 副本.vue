<template>
	<view class="detail-image">
		<detailhead :data="data"></detailhead>
		<!-- @click="previewOpen(data)" -->
		<view class="detail-image-item" >
			<image :src="imageUrl()" mode="widthFix"></image>
		</view>
		<view class="detail-open">
			<view>
				外链地址：
			</view>
			<view>
				<u-link :href="data.aliyun_dz">点击跳转</u-link>
			</view>
		</view>
		<kxj-previewImage ref="previewImage" :imgs="imgs"></kxj-previewImage>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import detail from "./detail.js"
	import detailhead from "./detailhead.vue"
	export default {
		data() {
			return {
				imgs: []
			}
		},
		components: {
			detailhead
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
			imageUrl(){
				if(Array.isArray(this.data.avatar)){
					return this.data.avatar[0].url;
				}else{
					return this.data.avatar.url;
				}
			},
			initImage() {
				this.imgs.splice(0, this.imgs.length);
				if (this.data && this.data.avatar.url) {
					this.imgs.push(this.data.avatar.url);
				}
			},
			previewOpen(){
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
