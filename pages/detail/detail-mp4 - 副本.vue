<template>
	<view class="detail-image">
		<detailhead-mp4 :data="data" :pl-number="plNumber">
			<template slot="content">
				<template v-if="data.aliyun_dz&&data.aliyun_dz.indexOf('/jzmp4/')!=-1">
					<view class="detail-image-item">
						<video id="myVideo" :danmu-btn="danmubtn" :enable-danmu="enabledanmu"
							:danmu-list="data.danmulist" autoplay :src="data.aliyun_dz" controls
							@timeupdate="timeupdate"></video>
					</view>
				</template>
				<template v-else>
					<view class="detail-image-item" v-for="(item,index) in data.resources" :key="index">
						<video id="myVideo" :danmu-btn="danmubtn" :enable-danmu="enabledanmu"
							:danmu-list="data.danmulist" autoplay :src="item.url" controls
							@timeupdate="timeupdate"></video>
					</view>
				</template>
				<!-- #ifndef MP-ALIPAY -->
				<u-popup v-model="showsenddanmu" mode="bottom">
					<view class="comment-container2">
						<view class="comment-input1">
							<u-input v-model="danmuValue" height="60" type="text" :border="true" placeholder="请输入友善的弹幕见证当下..." />
						</view>
						<text class="comment-input-button" @click.stop="sendDanmu">
							发送
						</text>
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
							<u-icon size="72" @click="openDanmu()" name="/static/comment/closedanmu.png"></u-icon>
						</view>
					</view>
				</view>
			</template>
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
	export default {
		data() {
			return {
				imgs: [],
				danmuValue: "",
				danmubtn: true,
				enabledanmu: true,
				// danmulist: [],
				showdanmu: true, ///显示弹幕
				showsenddanmu: false,
				videoContext: null,
				currentTime: "" ,///当前播放时间
				plNumber:0
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
			this.videoContext = uni.createVideoContext('myVideo');

		},
		watch: {
			"data.resources"() {
				this.initImage();
			}
		},
		methods: {
			changenumber(plNumber){
				this.plNumber=plNumber;
			},
			openDanmu() {
				this.showdanmu = true;
			},
			closedanmu() {
				this.showdanmu = false;
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
				if (this.userInfo.forbiddenwords) {
					this.$refs.uToast.show({
						title: '你已被禁言，请联系管理员',
						type: 'error'
					});
					return;
				}
				this.videoContext.sendDanmu({
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
		margin: 20rpx 0;
	}

	.detail-image-item video {
		width: 100%;
		border-radius: 10px;
	}
</style>
