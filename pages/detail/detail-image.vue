<template>
	<view class="detail-image">
		<detailhead :data="data"></detailhead>
		<view class="detail-image-item" v-for="(item,index) in data.resources" :key="index">
			<image :src="item.url"  @click="previewOpen(item)" :index="index" mode="widthFix"></image>
			<!-- <u-lazy-load @click="previewOpen(item)" threshold="300" border-radius="10" :image="item.url" :index="index"></u-lazy-load> -->
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
		components:{detailhead},
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
