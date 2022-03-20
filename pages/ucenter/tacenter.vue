<template>
	<view class="center">
		<view class="userInfo" @click.capture="$notMoreTap(toUserInfo,'notTap')">
			<view class="usercenter-top">
				<u-navbar :is-back="true" title="TA的主页" :border-bottom="false" title-color="#fff" back-icon-color="#fff"
					:background="{'background':'none'}">
				</u-navbar>
			</view>
			<view :class="['userinfo-image',isoriginal?'original':'']">
				<view class="original" v-if="isoriginal">
					<image class="original-img" src="@/static/center/ori_back.png"></image>
				</view>
				<cloud-image width="150rpx" height="150rpx" v-if="curuserinfo.avatar_file&&curuserinfo.avatar_file.url"
					:src="curuserinfo.avatar_file.url"></cloud-image>
				<image v-else class="logo-img" src="@/static/center/nologin.png"></image>
			</view>
			<view class="logo-title">
				<text class="uer-name">{{curuserinfo.nickname||curuserinfo.username}}</text>
			</view>
		</view>
		<uni-list class="center-list" v-for="(sublist , index) in ucenterList" :key="index">
			<uni-list-item v-for="(item,i) in sublist" :title="item.title" link :key="i"
				:class="[isbbgx?item.addclass:'',isnewinfo?item.class:'']" :clickable="true" :to="item.to"
				@click="$notMoreTap(ucenterListClick,'notTap',item)" :thumb="item.thumb">
			</uni-list-item>
		</uni-list>
		<view class="bottom-back" @click="toggleguanzhu">
			<text class="bottom-back-text" v-if="!isguanzhu">关注</text>
			<text class="bottom-back-text" v-else>取消关注</text>
		</view>
		<u-toast ref="uToast" />
		<!-- <jz-tabbar></jz-tabbar> -->
		<!-- <jz-gonggao ref="gonggao"></jz-gonggao> -->
	</view>
</template>
<script>
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
				curid: "", ///当前id
				isoriginal: false,
				curuserinfo: {}, ////当前用户
				isbbgx: false, ///是否版本更新
				isnewinfo: false, ///是否有新的系统消息
				notTap: true, //一定要设置为true
				ucenterList: [
					[{
							"title": 'TA的资料',
							"to1": '/pages/ucenter/userinfo/tauserinfo',
							"thumb": "/static/center/user.png"
						},
						{
							"title": "TA的投稿",
							"to1": '/pages/jz-opendb-resources/talist',
							"thumb": "/static/center/tg.png"
						},
						{
							"title": "TA的合集",
							"to1": '/pages/resourcehj/tahj',
							"thumb": "/static/center/hj.png"
						}
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
				},
				isguanzhu: false
			}
		},
		onLoad() {

		},
		computed: {
			appConfig() {
				return getApp().globalData.config
			}
		},
		created() {
			this.getUserinfo();
			//#ifdef APP-PLUS
			this.checkBb();
			//#endif
		},
		methods: {
			async toggleguanzhu() {
				var userInfo = uni.getStorageSync("userInfo");
				if(userInfo&&userInfo._id){
					if (!this.isguanzhu) { ///关注
						await db.collection('opendb-news-guanzhu').add({
							buser_id: this.curuserinfo._id,
							user_id: userInfo._id
						});
						this.$refs.uToast.show({
							title: '已关注',
							type: 'success'
						})
						this.isguanzhu=true;
					} else { ///取消关注
						await db.collection('opendb-news-guanzhu').where({
							buser_id: this.curuserinfo._id,
							user_id: userInfo._id
						}).remove();
						this.$refs.uToast.show({
							title: '已取消关注',
							type: 'success'
						})
						this.isguanzhu=false;
					}
				}
			},
			///获取用户信息
			async getUserinfo() {
				var _id = this.$Route.query.id;
				this.curid = _id;
				const usersTable = db.collection('uni-id-users')
				var userdata = await usersTable.where({
					_id: _id
				}).field(
					"username,weiboname,resources,weibocontent,nickname,isbdwb,original,forbiddenwords,status,avatar,avatar_file,role,register_date,token"
				).get();
				var userinf = userdata.result.data[0];
				this.curuserinfo = userinf;
				this.checkisguanzhu();
			},
			// 检查是否关注
			async checkisguanzhu() {
				var userInfo = uni.getStorageSync("userInfo");
				if(userInfo&&userInfo._id){
					var resgz = await db.collection('opendb-news-guanzhu').where({
						buser_id: this.curuserinfo._id,
						user_id: userInfo._id
					}).get();
					// console.log("resgz", resgz);
					if (resgz && resgz.result.data && resgz.result.data.length > 0) {
						this.isguanzhu = true;
					} else {
						this.isguanzhu = false;
					}
				}
			},
			// 检测版本
			async checkBb() {
				var app_bbh = getApp().globalData.app_bbh;
				//#ifdef APP-PLUS
				app_bbh = plus.runtime.versionCode;
				//#endif
				const collection = db.collection('opendb-news-appbb');
				var resultdata = await collection.where({
					app_bbh: db.command.gt(app_bbh)
				}).orderBy("app_bbh", "desc").get();
				if (resultdata.result.data && resultdata.result.data.length > 0) {
					this.isbbgx = true;
				}
			},
			goback() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},

			/**
			 * 个人中心项目列表点击事件
			 */
			ucenterListClick(item) {
				// debugger;
				var _id = this.curid;
				uni.navigateTo({
					url: item.to1 + '?id=' + _id
				})
				// if (!item.to && item.event) {
				// 	this[item.event]();
				// }
			},

			toUserInfo() {
				var _id = this.$Route.query.id;
				uni.navigateTo({
					url: '/pages/ucenter/userinfo/tauserinfo?id=' + _id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .userinfo-image.original{
	// 	background: url("/static/center/ori_back.png");
	// }
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
		background-image: url(@/static/center/backcenter.jpg);
		flex-direction: column;
		align-items: center;
		background-size: cover;
	}

	.logo-img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 150rpx;
	}

	.original {
		position: relative;
	}

	.original-img {
		width: 210rpx;
		height: 210rpx;
		position: absolute;
		top: -24rpx;
		left: -30rpx;
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
