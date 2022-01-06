<template>
	<view class=" pwd-login">
		<view class="login-back">
			<view class="usercenter-top">
				<u-navbar :is-back="true" title="微博主页地址" :border-bottom="false" title-color="#fff"
					back-icon-color="#fff" :background="{'background':'none'}">
				</u-navbar>
			</view>
			<view class="login_back_logo">
				<u-image width="100%" :src="'/static/login-index/login_back.png'" mode="widthFix"></u-image>
			</view>
			<view class="login-back-con">
				<input class="input-box" :inputBorder="false" v-model="weiboname" placeholder="http://" />
				<u-button class="send-btn" type="primary" @click="confirmweibo">确定</u-button>
			</view>
			<u-modal v-model="showmodel" :show-cancel-button="true" @confirm="confirmnc" width="85%">
				<view class="slot-content">
					<view style="text-indent: 2em;">请确认微博主页地址【{{weiboname}}】输入正确，并在自己微博发送一条【{{wbcontent}}】的微博。</view>
					<view style="text-indent: 2em;">如你确认无误，请点击确认按钮申请，待管理员审核微博通过后可重新进入本系统。</view>
					<view style="text-indent: 2em;">注意请不要重复注册账号，加大管理组的审核工作量，多余的账号将会被锁定。</view>
				</view>
			</u-modal>
		</view>
	</view>
</template>

<script>
	import mixin from '../common/login-page.mixin.js';
	export default {
		mixins: [mixin],
		data() {
			return {
				showmodel: false,
				weiboname: "",
				wbcontent: "山河不足重，重在遇知己"
			}
		},
		created() {
			var weibonc = getApp().globalData.weiboyz;
			var index = parseInt(Math.random() * weibonc.length);
			this.$set(this, "wbcontent", weibonc[index]);
		},
		computed: {

		},
		methods: {
			goback() {
				uni.navigateBack();
			},

			confirmnc() {
				return new Promise(async (reslove) => {
					const db = uniCloud.database();
					const uid = db.getCloudEnv('$cloudEnv_uid');
					const collection = db.collection('uni-id-users');
					var result = await collection.where({
						_id: uid
					}).update({
						weibocontent: this.wbcontent,
						weiboname: this.weiboname
					});
					if (result.result.code == 0) {
						uni.showModal({
							title: '提示',
							showCancel: false,
							confirmText: "退出",
							content: '您的申请已提交，请尽快发微博，待管理员审核后方可登录',
							success: function(res) {
								if (res.confirm) {
									var pscreen = plus.webview.currentWebview().opener();
									mui.fire(pscreen, 'quit', {
										data: "quit"
									});
									console.log("在这里退出App");
									// #ifdef APP-PLUS  
									plus.runtime.quit();
									// #endif
								}
							}
						});
					} else {
						uni.showToast({
							title: "操作出错，请联系管理员",
							icon: "none"
						});
					}
				});
			},
			/**
			 * 密码登录
			 */
			confirmweibo() {
				if (!this.weiboname) {
					return uni.showToast({
						title: "请输入微博主页链接地址",
						icon: 'none'
					});
				}
				this.showmodel = true;
			}
		}
	}
</script>

<style>
	@import url("../common/login-page.css");

	.slot-content {
		padding: 10px;
	}

	.usercenter-top {
		color: #fff;
		font-size: 16px;
		height: 44px;
		line-height: 44px;
	}

	.usercenter-top-left {
		position: absolute;
		left: 4px;
		top: 12px;

	}

	.usercenter-top-mine {
		text-align: center;
	}

	.login-back {
		height: 100vh;
		background: linear-gradient(rgb(119, 126, 206), rgb(255 255 255));
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}

	/* .pwd-login{
		padding-top: 10em;
	}
	.pwd-login .title{
		font-size: 24px;
		margin-bottom: 20px;
	} */
	.auth-box {
		/* flex-direction: row;
		justify-content: right; */
		margin-top: 20px;
		text-align: right;
	}

	.auth-box .link {
		font-size: 26rpx;
	}

	.login-text-sub {
		color: #8a8f8b;
	}

	.toRegister {
		margin-top: 80px;
		width: 600rpx;
	}

	.captcha-box {
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}

	.captcha-img {
		margin: 15px 15px 0 0;
		width: 250rpx;
	}

	.captcha {
		width: 350rpx;
	}

	.login-back-con {
		width: 80%;
		margin: 0 auto;
		margin-top: 40px;
	}

	.login-back-con .u-btn {
		border-radius: 50px;
	}

	.login-back-con .input-box {
		height: 40px;
		line-height: 40px;
	}
</style>
