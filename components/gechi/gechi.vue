<template>
	<view class="gechi-content" :style="constyle">
		<view class="gechi-content-top">
			<view class="gechi-content-top-title">
				{{curdata.title}}
			</view>
			<view class="gechi-content-top-author">
				{{curdata.author}}
			</view>
		</view>
		<view class="gechi-content-center">
			<bing-lyric :lyrics="lyrics" :centerStyle="centerStyle" :curTime="curTime" :areaStyle="cuAreaStyle"
				:lyricStyle="lyricStyle" @centerBtnClick="centerBtnClick" @copyLyrics="copy"></bing-lyric>
		</view>
		
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
				constyle:{},
				title: 'Hello',
				centerStyle: {
					btnImg: '../../static/btn.png',
				},
				lyricStyle: {},
				cuAreaStyle: {
					width: '100vw',
					height: '100vh'
				},
				resources_id: "",
				lyrics: [],
				curTime: 0,////当前时间
				// curdata: {}
			}
		},
		props:{
			curdata:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		watch:{
			curdata(){
				this.initgechi();
			}
		},
		created(e) {
			this.makeTime();
		},
		mounted() {
			this.initgechi();
		},
		methods: {
			initgechi(){
				if(this.curdata.gechi&&this.curdata.gechi.length>0){
					var comment=this.curdata.gechi[0].comment;
					this.lyrics = comment.split("\n");
				}
				// debugger;
				if(this.curdata.avatar&&this.curdata.avatar.length>0){
					var url=this.curdata.avatar[0].url;
					this.constyle={
						backgroundImage:"url("+url+")"
					}
				}
			},
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
	.gechi-content {
		display: flex;
		flex-direction: column;
		align-items: center; 
		color: #fff;
		    height: calc(100vh - 44px);
			background-position: center;
			background-size: cover;
	}
	.gechi-content::after{
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,0.5);
	}
	.gechi-content-top{
		padding:20rpx;
		text-align: center;
		height: 160rpx;
		z-index: 99;
		
	}
	.gechi-content-center{
		z-index: 99;
	}
	.gechi-content-bottom{
		width: 100%;
		    text-align: right;
			padding: 10px;
	}
	.gechi-content-top-title{
		font-size: 50rpx;
		margin-top: 10px;
	}
	.gechi-content-top-author{
		font-size: 36rpx;
		margin-top: 10rpx;
	}
</style>
