<template>
	<view class="detail-image">
		<detailhead-mp4 :data="data" :pl-number="plNumber">
			<template slot="content">
				<template v-if="data.aliyun_dz&&data.aliyun_dz.indexOf('/jzmp4/')!=-1">
					<view class="detail-image-item">
						<div id="dplayer" ref="dplayer">
						</div>
						<div v-if="videoDirection=='shu'" class="player-toggle shu" @click="toggleMp4('shu')">
							<u-icon name="/static/center/shu.png"></u-icon>
						</div>
						<div v-else class="player-toggle heng" @click="toggleMp4('heng')">
							<u-icon name="/static/center/heng.png"></u-icon>
						</div>
					</view>
				</template>
				<template v-else>
					<view class="detail-image-item" v-for="(item,index) in data.resources" :key="index">
						<div id="dplayer" ref="dplayer">
						</div>
						<div v-if="videoDirection=='shu'" class="player-toggle shu" @click="toggleMp4('shu')">
							<u-icon name="/static/center/shu.png"></u-icon>
						</div>
						<div v-else class="player-toggle heng" @click="toggleMp4('heng')">
							<u-icon name="/static/center/heng.png"></u-icon>
						</div>
					</view>
				</template>
				<!-- <view style="margin-top: 6px;">
					<u-alert-tips type="warning" description="注意:全屏需横屏时请启用手机的横屏模式"></u-alert-tips>
				</view> -->
				<!-- #ifndef MP-ALIPAY -->
				<u-popup v-model="showsenddanmu" mode="bottom">
					<view class="comment-container2">
						<view class="comment-input1">
							<u-input v-model="danmuValue" height="60" type="text" :border="true"
								placeholder="请输入友善的弹幕见证当下..." />
						</view>
						<text class="comment-input-button" @click.stop="sendDanmu">
							发送
						</text>
					</view>
				</u-popup>
				<!-- #endif -->
			</template>
			<!-- <template slot="danmubutton">
				<view class="danmubutton">
					<view class="opendanmu" v-show="showdanmu">
						<view class="opendanmu_1" @click="opensendDanmu">点我发弹幕</view>
						<view class="opendanmu_2" @click="closedanmu()">
							<u-icon size="72" name="/static/comment/opendanmu.png"></u-icon>
						</view>
					</view>
					<view class="closedanmu" v-show="!showdanmu">
						<view class="closedanmu_1">
							<u-icon size="72" @click="openDanmu()" name="/static/comment/closedanmu.png"></u-icon>
						</view>
					</view>
				</view>
			</template> -->
			<template slot="comment">
				<comment ref="comment" :zydata="data" @changenumber="changenumber"></comment>
			</template>
		</detailhead-mp4>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	import detail from "./detail.js"
	import detailheadMp4 from "./detailheadMp4.vue"
	const db = uniCloud.database();
	import DPlayer from 'dplayer';
	export default {
		data() {
			return {
				dp: null, ////视频
				imgs: [],
				danmuValue: "",
				danmubtn: true,
				enabledanmu: true,
				// danmulist: [],
				showdanmu: true, ///显示弹幕
				showsenddanmu: false,
				videoContext: null,
				currentTime: "", ///当前播放时间
				plNumber: 0,
				videoDirection:"shu"
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
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			})
		},
		created() {
			var config = getApp().globalData.systemconfig;
			var t_800018 = config["800018"]; //、显示弹幕
			if (t_800018 == 1) {
				this.danmubtn = true;
				this.enabledanmu = true;
			} else {
				this.danmubtn = false;
				this.enabledanmu = false;
			}
		},
		mounted() {
			this.initImage();
			// this.videoContext = uni.createVideoContext('myVideo');
			this.$nextTick(() => {
				this.initDp(this.data);
			})
		},
		watch: {
			data: {
				deep: true,
				handler() {
					this.initImage();
					this.initDp(this.data);
				}
			}
		},
		methods: {
			toggleMp4(){
				// debugger;
				this.videoDirection=this.videoDirection=="shu"?"heng":"shu";
				if(this.videoDirection=="heng"){	
					window.jQuery(".detail-image-item").addClass("heng");
				}else{
					window.jQuery(".detail-image-item").removeClass("heng");
				}
			},
			initDp(item) {
				// debugger;
				var url = "";
				if (item.aliyun_dz && item.aliyun_dz.indexOf('/jzmp4/') != -1) {
					url = item.aliyun_dz;
				} else {
					url = item.resources[0].url;
				}
				if (!url) {
					return;
				}
				this.dp = new DPlayer({
					container: document.getElementById('dplayer'),
					autoplay: true,
					theme: '#FADFA3',
					loop: true,
					lang: 'zh-cn',
					screenshot: true,
					hotkey: true,
					preload: 'auto',
					volume: 0.7,
					mutex: true,
					video: {
						url: url,
						type: 'auto',
					},
					// 暂时不支持字幕
					// subtitle: {
					// 	url: 'http://47.108.224.146/jzzm/2020/20200501.ass',
					// 	type: 'ass',
					// 	fontSize: '25px',
					// 	bottom: '10%',
					// 	color: '#b7daff',
					// },
					danmaku: {
						id: item._id,
						api: 'getdanmu',
						maximum: 10000,
						user: 'jzp',
						bottom: '15%',
						unlimited: true,
					}
				});
				// this.dp.on("fullscreen", function(){
				// 	window.jQuery(".detail-image-item").addClass("fullscren");
				// })
				this.dp.on("webfullscreen", function(){
					window.jQuery(".detail-image-item").addClass("fullscren");
				})
				this.dp.on("webfullscreen_cancel", function(){
					window.jQuery(".detail-image-item").removeClass("fullscren");
				})
			},
			changenumber(plNumber) {
				this.plNumber = plNumber;
			},
			openDanmu() {
				this.showdanmu = true;
			},
			closedanmu() {
				this.showdanmu = false;
			},
			opensendDanmu() {
				this.showsenddanmu = true;
				this.$refs.mp4[0].videoContext.pause();
			},
			closesendDanmu() {
				this.showsenddanmu = false;
				this.$refs.mp4[0].videoContext.play();
			},
			timeupdate(event) {
				this.currentTime = event.detail.currentTime;
			},
			// 发送弹幕
			async sendDanmu() {
				if (this.userInfo.forbiddenwords) {
					this.$refs.uToast.show({
						title: '你已被禁言，请联系管理员',
						type: 'error'
					});
					return;
				}
				this.$refs.mp4[0].videoContext.sendDanmu({
					text: this.danmuValue,
					color: "#7275D3"
				});
				await db.collection('jz-opendb-danmu').add({
					resource_id: this.data._id,
					danmu_text: this.danmuValue,
					danmu_color: '#fff',
					danmu_time: this.currentTime || 0
				});
				this.danmuValue = '';
				this.closesendDanmu();
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
	.player-toggle {
		display: none;
		position: fixed;
		top: 50%;
		z-index: 1000000;
		left: 10px;
		height: 40px;
		width: 40px;
		margin-top: -15px;
	}
	.fullscren .player-toggle{
		display: block;
	}

	.player-toggle * {
		width: 100%;
		height: 100%;
	}

	.detail-image-item {
		position: relative;
	}

	.cover-view-text {
		position: fixed;
		top: 200px;
		color: #fff;
		z-index: 999;
	}

	.comment-input-button {
		line-height: 72rpx;
		margin: 0 16rpx;
		color: #909399;
	}

	.comment-container2 {
		display: flex;
		position: fixed;
		bottom: 0px;
		width: 100%;
		background-color: #fff;
		padding: 10px;
		border-top: 1px solid #ddd;
	}

	.danmubutton {
		width: 300rpx;

	}

	.closedanmu {
		display: flex;
		height: 72rpx;
		line-height: 72rpx;
		width: 100%;
		justify-content: end;
	}

	.closedanmu_1 {
		width: 120rpx;
		border-radius: 50px;
		background: #E3E3E3;
		text-align: center;
		float: right;
		position: absolute;
		right: 10px;
		height: 72rpx;
	}

	.opendanmu {
		display: flex;
		height: 72rpx;
		line-height: 72rpx;
	}

	.opendanmu_1 {
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
		padding: 0 20rpx;
		background: #E3E3E3;
	}

	.opendanmu_2 {
		background: #fff;
		padding: 0 20rpx;
		border-top-right-radius: 50px;
		border-bottom-right-radius: 50px;
	}

	.danmu-container {
		padding: 10px 10px 20px 10px;
	}

	.detail-image-item {
		width: 100%;
		height: 30vh;

	}

	.detail-image-item.fullscren.heng {
		transform: rotate(90deg);
		height: 100vw !important;
		position: fixed;
		    top: 0;
		    bottom: 0px;
		    left: 0px;
		right: 0px;
		z-index: 9999;
		/* width: 100vh !important; */
	}

	.detail-image-item.fullscren.heng #dplayer {
		width: 100vh !important;
	}

	#dplayer {
		width: 100%;
		height: 100%;
	}

	.detail-image-item video {
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
</style>
