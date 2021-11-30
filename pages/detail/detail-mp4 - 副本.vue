<template>
	<view class="detail-image">
		<detailhead-mp4 :data="data"></detailhead-mp4>
		<view class="detail-image-item" v-for="(item,index) in data.resources" :key="index">
			<video id="myVideo" :src="item.url" controls></video>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import detail from "./detail.js"
	import detailheadMp4 from "./detailheadMp4.vue"
	export default {
		data() {
			return {
				imgs: []
			}
		},
		components:{detailheadMp4},
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
	.detail-image-item video{
		width: 100%;
		border-radius: 10px;
	}
</style>
