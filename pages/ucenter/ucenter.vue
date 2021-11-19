<template>
	<view class="center">
		<view class="userInfo" @click.capture="toUserInfo">
			<view class="usercenter-top">
				<u-navbar :is-back="true" title="个人中心" :border-bottom="false" title-color="#fff" back-icon-color="#fff"
					:background="{'background':'none'}">
				</u-navbar>
			</view>
			<cloud-image width="150rpx" height="150rpx" v-if="userInfo.avatar_file&&userInfo.avatar_file.url"
				:src="userInfo.avatar_file.url"></cloud-image>
			<image v-else class="logo-img" src="@/static/center/nologin.png"></image>
			<view class="logo-title">
				<text class="uer-name" v-if="hasLogin">{{userInfo.nickname||userInfo.username||userInfo.mobile}}</text>
				<text class="uer-name" v-else>{{$t('mine.notLogged')}}</text>
			</view>
		</view>
		<uni-list class="center-list" v-for="(sublist , index) in ucenterList" :key="index">
			<uni-list-item v-for="(item,i) in sublist" :title="item.title" link :rightText="item.rightText" :key="i"
				:clickable="true" :to="item.to" @click="ucenterListClick(item)" :thumb="item.thumb">
				<template v-slot:footer>
					<view v-if="item.showBadge" class="item-footer">
						<text class="item-footer-text">{{item.rightText}}</text>
						<view class="item-footer-badge"></view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="bottom-back" @click="clickLogout">
			<text class="bottom-back-text" v-if="hasLogin">{{$t('settings.logOut')}}</text>
			<text class="bottom-back-text" v-else>{{$t('settings.login')}}</text>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
	import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';
	import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';
	const uniShare = new UniShare()
	const db = uniCloud.database();
	export default {
		onBackPress({
			from
		}) {
			if (from == 'backbutton') {
				this.$nextTick(function() {
					uniShare.hide()
				})
				return uniShare.isShow;
			}
		},
		data() {
			return {
				gridList: [{
						"text": "收藏",
						"icon": "chat",
						"to": '/pages/myfavorite/myfavorite',
					},
					{
						"text": "足迹",
						"icon": "cloud-upload",
						"to": '/pages/history/history',
					},
					{
						"text": "投稿",
						"icon": "cloud-upload",
						"to": '/pages/jz-opendb-resources/list',
					}
				],
				ucenterList: [
					[{
							"title": this.$t('mine.userinfo'),
							"to": '/pages/ucenter/userinfo/userinfo',
							"thumb": "/static/center/user.png"
						},
						{
							"title": "浏览足迹",
							"to": '/pages/history/history',
							"thumb": "/static/center/llzj.png"
						},
						{
							"title": "我的投稿",
							"to": '/pages/jz-opendb-resources/list',
							"thumb": "/static/center/tg.png"
						},
						{
							"title": "我的收藏",
							"to": '/pages/myfavorite/myfavorite',
							"thumb": "/static/center/sc.png"
						},
						{
							"title": "我的邀请码",
							"to": '/pages/jz-custom-yqm/list',
							"thumb": "/static/center/yqm.png"
						},
						{
							"title": this.$t('mine.feedback'),
							"to": '/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback',
							"thumb": "/static/center/question.png"
						}
						//#ifdef APP-PLUS
						,
						{
							"title": "检测版本更新",
							"to": '/pages/appbb/appbb',
							"thumb": "/static/center/appbb.png"
						},
						//#endif
					]
				],
				listStyles: {
					"height": "150rpx", // 边框高度
					"width": "150rpx", // 边框宽度
					"border": { // 如果为 Boolean 值，可以控制边框显示与否
						"color": "#eee", // 边框颜色
						"width": "1px", // 边框宽度
						"style": "solid", // 边框样式
						"radius": "100%" // 边框圆角，支持百分比
					}
				}
			}
		},
		onLoad() {
			// console.log(313,this.userInfo,this.hasLogin);
			//#ifdef APP-PLUS
			this.ucenterList[0].unshift({
				title: this.$t('mine.checkUpdate'), // this.this.$t('mine.checkUpdate')"检查更新"
				rightText: this.appVersion.version + '-' + this.appVersion.versionCode,
				event: 'checkVersion',
				icon: 'loop',
				showBadge: this.appVersion.hasNew
			})
			//#endif
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			})
			// #ifdef APP-PLUS
			,
			appVersion() {
				return getApp().appVersion
			}
			// #endif
			,
			appConfig() {
				return getApp().globalData.config
			}
		},
		methods: {
			goback() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			...mapMutations({
				logout: 'user/logout'
			}),
			clickLogout() {
				if (this.hasLogin) {
					uni.showModal({
						title: this.$t('settings.tips'),
						content: this.$t('settings.exitLogin'),
						cancelText: this.$t('settings.cancelText'),
						confirmText: this.$t('settings.confirmText'),
						success: res => {
							if (res.confirm) {
								this.logout();
								uni.navigateBack();
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.navigateTo({
						url: '/pages/ucenter/login-page/index/index'
					});
				}
			},
			...mapMutations({
				setUserInfo: 'user/login'
			}),
			toSettings() {
				uni.navigateTo({
					url: "/pages/ucenter/settings/settings"
				})
			},
			signIn() { //签到
				this.$refs.signIn.open()
			},
			/**
			 * 个人中心项目列表点击事件
			 */
			ucenterListClick(item) {
				if (!item.to && item.event) {
					this[item.event]();
				}
			},
			async checkVersion() {
				let res = await callCheckVersion()
				console.log(res);
				if (res.result.code > 0) {
					checkUpdate()
				} else {
					uni.showToast({
						title: res.result.message,
						icon: 'none'
					});
				}
			},
			toUserInfo() {
				uni.navigateTo({
					url: '/pages/ucenter/userinfo/userinfo'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.usercenter-top {
		color: #fff;
		font-size: 16px;
		margin-bottom: 50px;
	}

	.usercenter-top-left {
		position: absolute;
		left: 4px;

	}

	.usercenter-top-mine {}

	.bottom-back {
		margin-top: 10px;
		width: 750rpx;
		height: 44px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* #ifndef APP-NVUE */
		border: none;
		/* #endif */
		border-width: 0;
		border-radius: 0;
		background-color: #FFFFFF;
	}

	.bottom-back-text {
		font-size: 33rpx;
	}

	/* #ifndef APP-NVUE */
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	page {
		background-color: #f8f8f8;
	}

	/* #endif*/

	.center {
		flex: 1;
		flex-direction: column;
		background-color: #f8f8f8;
	}

	.userInfo {
		width: 750rpx;
		background-image: url(/static/center/backcenter.jpg);
		flex-direction: column;
		align-items: center;
		background-size: cover;
	}

	.logo-img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 150rpx;
	}

	.logo-title {
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
	}

	.uer-name {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 32rpx;
		color: #FFFFFF;
	}

	.center-list {
		margin-bottom: 30rpx;
		background-color: #f9f9f9;
	}

	.center-list-cell {
		width: 750rpx;
		background-color: #7275D3;
		height: 40rpx;
	}

	.grid {
		background-color: #FFFFFF;
		margin-bottom: 6px;
	}

	.uni-grid .text {
		font-size: 30rpx;
		height: 25px;
		line-height: 25px;
		color: #817f82;
	}

	.uni-grid .item ::v-deep .uni-grid-item__box {
		justify-content: center;
		align-items: center;
	}


	/*修改边线粗细示例*/
	/* #ifndef APP-NVUE */
	.center-list ::v-deep .uni-list--border:after {
		-webkit-transform: scaleY(0.2);
		transform: scaleY(0.2);
		margin-left: 80rpx;
	}

	.center-list ::v-deep .uni-list--border-top,
	.center-list ::v-deep .uni-list--border-bottom {
		display: none;
	}

	/* #endif */
	.item-footer {
		flex-direction: row;
		align-items: center;
	}

	.item-footer-text {
		color: #999;
		font-size: 24rpx;
		padding-right: 10rpx;
	}

	.item-footer-badge {
		width: 20rpx;
		height: 20rpx;
		/* #ifndef APP-NVUE */
		border-radius: 50%;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-radius: 10rpx;
		/* #endif */
		background-color: #DD524D;
	}
</style>
