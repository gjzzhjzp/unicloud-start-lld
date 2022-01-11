<template>
	<view class="detail-image">
		<detailhead-mp4 :data="data" :pl-number="plNumber">
			<template slot="content">
				<view style="margin-top: 20rpx;">
					<nine-squared :list="data.resources" @preview="previewOpen"></nine-squared>
					<kxj-previewImage ref="previewImage" :imgs="imgs" @longPress="openlongan"></kxj-previewImage>
				</view>
				<!-- <detailhead :data="data"></detailhead> -->
			</template>
			<template slot="comment">
				<comment ref="comment" :zydata="data" @changenumber="changenumber"></comment>
			</template>
		</detailhead-mp4>
		<u-action-sheet :list="list" v-model="showlongan" :cancel-btn="true" @click="saveImage"></u-action-sheet>
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
				list: [ {
					text: '保存图片'
				}],
				showlongan: false,
				imgs: [],
				plNumber: 0,
				currentSrc:""
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
			saveImage(index){
				console.log(index,this.currentSrc);
				var pscreen = plus.webview.currentWebview().opener();
				mui.fire(pscreen, 'saveImage', {
					src: this.currentSrc
				});
			},
			openlongan(data){
				console.log("data",data);
				this.currentSrc=data.src;
				this.showlongan=true;
			},
			changenumber(plNumber) {
				this.plNumber = plNumber;
				console.log("plNumber", this.plNumber);
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
				var that=this;
				this.$refs.previewImage.open(item.url);
				var pscreen = plus.webview.currentWebview().opener();
				mui.fire(pscreen, 'waitclose', {
					waitclose: "1"
				});
				window.addEventListener('allowclose', function(e) {
					that.closePopup();
				});
			},
			closePopup(){
				var that=this;
				this.$refs.previewImage.close();
				var pscreen = plus.webview.currentWebview().opener();
				mui.fire(pscreen, 'waitclose', {
					waitclose: "0"
				});
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
