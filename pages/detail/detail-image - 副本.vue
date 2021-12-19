<template>
	<view class="detail-image">
		<!-- <detailhead :data="data"></detailhead> -->
		<nine-squared :list="data.resources" @preview="previewOpen"></nine-squared>
		<kxj-previewImage ref="previewImage" :imgs="imgs"></kxj-previewImage>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import detail from "./detail.js"
	import detailhead from "./detailhead.vue"
	import nineSquared from "./nineSquared.vue"
	export default {
		data() {
			return {
				imgs: []
			}
		},
		components:{detailhead,nineSquared},
		mixins:[detail],
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
		watch:{
			"data.resources"(){
				this.initImage();
			}
		},
		methods: {
			initImage(){
				this.imgs.splice(0,this.imgs.length);
				if(this.data&&this.data.resources){
					this.data.resources.forEach((item)=>{
						this.imgs.push(item.url);
					})
				}
			},
			previewOpen(item){
				this.$refs.previewImage.open(item.url); 
			},
		}
	}
</script>
<style>
	

	.detail-image-item {
		margin: 20rpx 0;
	}
	.detail-image-item image{
		width: 100%;
		border-radius: 10px;
	}
</style>
