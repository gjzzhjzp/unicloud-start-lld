<template>
	<view class="content">
		<view class="content-top">
			<view class="content-top-title">
				{{curdata.title}}
			</view>
			<view class="content-top-author">
				{{curdata.author}}
			</view>
		</view>
		<bing-lyric :lyrics="lyrics" :centerStyle="centerStyle" :curTime="curTime" :areaStyle="cuAreaStyle"
			:lyricStyle="lyricStyle" @centerBtnClick="centerBtnClick" @copyLyrics="copy"></bing-lyric>
		<!-- <view class="content-bottom">
			<image src="../../static/music/play1.png" class="audio-control-switch audio-icon1"></image>
		</view> -->
	</view>
</template>
<script>
	import bingLyric from '../../components/bing-lyric/bing-lyric.vue'
	const db = uniCloud.database();
	export default {
		components: {
			bingLyric
		},
		data() {
			return {
				title: 'Hello',
				centerStyle: {
					btnImg: '../../static/btn.png',
				},
				lyricStyle: {},
				cuAreaStyle: {
					width: '100vw',
					height: '90vh'
				},
				resources_id: "",
				lyrics: [],
				curTime: 0,////当前时间
				curdata: {}
			}
		},
		created(e) {
			this.makeTime();
			this.resources_id = e.id;
		},
		mounted() {
			this.getResource();
			this.getgechi();
		},
		methods: {
			async getgechi() {
				if(this.resources_id){
					var res = await db.collection("jz-custom-gechi").where({
						resources_id: this.resources_id || "619b278913207d00010a1216"
					}).get();
					var data = {};
					if (res.result.data && res.result.data.length > 0) {
						data = res.result.data[0];
					}
					this.lyrics = data.comment.split("\n");
					// console.log("this.lyrics", this.lyrics);
				}
			},
			getResource() {
				if(this.resources_id){
					uniCloud.callFunction({
						name: 'jzfunction',
						data: {
							action: 'resource/getResource',
							data: {
								_id: this.resources_id || "619b278913207d00010a1216"
							}
						},
					}).then((res) => {
						var res = res.result;
						if (res.state == "0000") {
							this.curdata = res.rows[0];
							// console.log("this.curdata",this.curdata);
						} else {
							console.log("res", res.msg);
						}
					}).catch((err)=>{
					console.log("网络错误，请重试——err",err);
					uni.showModal({
					  content: err.message || '网络错误，请重试',
					  showCancel: false
					});
				});
				}
			},
			copy(e) {
				console.log('index', e)
				uni.showModal({
					content: JSON.stringify(e.lyrics)
				})
			},
			centerBtnClick(e) {
				console.log(e)
				this.curTime = e.centerTime
			},
			makeTime() {
				let i = 0
				for (i; i < 500; i++) {
					setTimeout(this.out, i * 500, 0.5)
				}
			},
			out(t) {
				this.curTime += t
			}
		}
	}
</script>

<style>
	.audio-control-switch {
		font-size: 40rpx;
		width: 80rpx;
		height: 80rpx;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center; 
		color: #fff;
		background: linear-gradient(rgb(136, 211, 243), rgb(119, 126, 206), rgb(136, 211, 243));
	}
	.content-top{
		padding:20rpx;
		text-align: center;
		height: 160rpx;
		
	}
	.content-bottom{
		width: 100%;
		    text-align: right;
			padding: 10px;
	}
	.content-top-title{
		font-size: 50rpx;
		margin-top: 10px;
	}
	.content-top-author{
		font-size: 32rpx;
		margin-top: 10rpx;
	}
</style>
