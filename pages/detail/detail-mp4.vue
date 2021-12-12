<template>
	<view class="detail-image">
		<detailhead-mp4 :data="data">
			<template slot="content">
				<view class="detail-image-item" v-for="(item,index) in data.resources" :key="index">
					<video id="myVideo" :danmu-btn="danmubtn" :enable-danmu="enabledanmu" :danmu-list="data.danmulist"
						autoplay :src="item.url" controls @timeupdate="timeupdate"></video>
				</view>
				<!-- #ifndef MP-ALIPAY -->
				<u-popup v-model="showsenddanmu" mode="bottom">
					<view class="danmu-container">
						<view>
							<view class="uni-list-cell">
								<u-input type="textarea" v-model="danmuValue" placeholder="请输入友善的弹幕见证当下..." />
							</view>
						</view>
						<view style="text-align: center;">
							<u-button size="medium" type="primary" @click="sendDanmu">发送</u-button>
						</view>
					</view>
				</u-popup>

				<!-- #endif -->
			</template>
			<template slot="danmubutton">
				<view class="danmubutton">
					<view class="opendanmu" v-show="showdanmu">
						<view class="opendanmu_1" @click="opensendDanmu">点我发弹幕</view>
						<view class="opendanmu_2" @click="closedanmu()">
							<u-icon size="72" name="/static/comment/opendanmu.png"></u-icon>
						</view>
					</view>
					<view class="closedanmu" v-show="!showdanmu">
						<view class="closedanmu_1">
							<u-icon size="72"  @click="openDanmu()" name="/static/comment/closedanmu.png"></u-icon>
						</view>
					</view>
				</view>
			</template>
			<template slot="comment">
				<comment ref="comment" :zydata="data"></comment>
			</template>
		</detailhead-mp4>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import detail from "./detail.js"
	import detailheadMp4 from "./detailheadMp4.vue"
	const db = uniCloud.database();
	export default {
		data() {
			return {
				imgs: [],
				danmuValue: "",
				danmubtn: true,
				enabledanmu: true,
				danmulist: [],
				showdanmu:true,///显示弹幕
				showsenddanmu: false,
				videoContext: null,
				currentTime: "" ///当前播放时间
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
		mounted() {
			this.initImage();
			this.videoContext = uni.createVideoContext('myVideo');

		},
		watch: {
			"data.resources"() {
				this.initImage();
			}
		},
		methods: {
			openDanmu(){
				this.showdanmu=true;
			},
			closedanmu(){
				this.showdanmu=false;
			},
			opensendDanmu() {
				this.showsenddanmu = true;
				this.videoContext.pause();
			},
			closesendDanmu() {
				this.showsenddanmu = false;
				this.videoContext.play();
			},
			timeupdate(event) {
				this.currentTime = event.detail.currentTime;
			},
			// 发送弹幕
			async sendDanmu() {
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: "#fff"
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
	.danmubutton{
		width: 300rpx;
		
	}
	.closedanmu{
		display: flex;
		height: 72rpx;
		line-height: 72rpx;
		width: 100%;
		justify-content: end;
	}
	.closedanmu_1{
		width: 120rpx;
		border-radius: 50px;
		background: #E3E3E3;
		text-align: center;
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
		margin: 20rpx 0;
	}

	.detail-image-item video {
		width: 100%;
		border-radius: 10px;
	}
</style>
