<template>
	<view class="gechiAll">
		<view class="gechi-image">
			<view class="gechi-image-top">
				<image style="width: 600rpx; height: 600rpx;border-radius: 10px;" :src="imageSrc()" mode="aspectFill">
				</image>
			</view>
		</view>
		<view class="gechi-content">
			<view class="gechi-content-left">
				<view class="content-top-title">
					{{data.title}}
				</view>
				<view class="content-top-author">
					{{data.author}}
				</view>
			</view>
			<view class="gechi-content-right">
				<u-image v-show="!data.selected" width="100rpx" height="100rpx" src="/static/music/like.png">
				</u-image>
				<u-image v-show="data.selected" width="100rpx" height="100rpx" src="/static/music/like_sed.png">
				</u-image>
			</view>
		</view>
		<view class="imt-audio">
			<imt-audio1 ref="imtaudio" @play="play" @pause="pause" continue :src="getsrc()" :data="data"
				:now="curnow">
			</imt-audio1>
		</view>
	</view>
</template>
<script>
	import imtAudio1 from "@/components/imt-audio/imt-audio1.vue"
	export default {
		name: "gechiAll",
		data() {
			return {
				musicList:[],
				curnow:0
			}
		},
		components:{
			imtAudio1
		},
		props: {
			data: {
				type: Object,
				default () {
					return {

					}
				}
			}
		},
		watch:{
			data(){
				this.getMusicList();
			}
		},
		mounted(){
			this.getMusicList();
		},
		methods: {
			imageSrc(){
				var url="";
				if(this.data.avatar&&this.data.avatar.length>0&&this.data.avatar[0].url){
					url=this.data.avatar[0].url;
				}
				return url;
			},
			getsrc(){
				var src="";
				if(this.data.resources&&this.data.resources.length>0&&this.data.resources[0].url){
					src=this.data.resources[0].url;
				}
				return src;
			},
			getMusicList() {
				// debugger;
				var list=uni.setStorageSync("musicList");
				this.musicList=list;
				this.musicList.forEach((item,index)=>{
					if(item._id==this.data._id){
						this.curnow=index;
					}
				});
			},
			pause(index) {
				// debugger;
				this.$set(this.data, "play", false);
			},
			play(index) {
				this.$set(this.data, "play", true);
				// debugger;
				// if (index == this.list.length) {
				// 	index = 0;
				// } else if (index < 0) {
				// 	index = this.list.length - 1;
				// }
				// if (index < this.list.length && index >= 0) {
				// 	// debugger;
				// 	this.now = index;
				// 	this.$set(this.list[index], "play", true);
				// 	this.tohistory(this.list[index]);
				// }
			},
		}
	}
</script>
<style>
	.gechi-content{
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		    width: 100%;
		    padding: 50rpx;
	}
	.content-top-title{
		font-size:50rpx;
	}
	.content-top-author{
		font-size: 32rpx;
		margin-top: 30rpx;
	}
	.gechi-image{
		text-align: center;
		margin-top: 80rpx;
	}
	.gechi-image-top{
		border-radius: 20rpx;
	}
	.imt-audio {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 99;
	}
	.gechiAll{
		display: flex;
		flex-direction: column;
		align-items: center; 
		color: #fff;
		/* height: 100vh; */
		/* background: linear-gradient(rgb(136, 211, 243), rgb(119, 126, 206), rgb(136, 211, 243)); */
	}
</style>
