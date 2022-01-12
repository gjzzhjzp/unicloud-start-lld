<template>
	<view class=" pwd-login">
		<!-- <u-navbar :is-back="true" title="用户登录"></u-navbar> -->
		<view class="login-back">
			<view class="usercenter-top">
				<u-navbar :is-back="true" title="用户登录" :border-bottom="false" title-color="#fff" back-icon-color="#fff"
					:background="{'background':'none'}">
				</u-navbar>
			</view>
			<view class="login_back_logo">
				<u-image width="100%" :src="'/static/login-index/login_back.png'" mode="widthFix"></u-image>
			</view>
			<view class="login-back-con">
				<input class="input-box" :inputBorder="false" v-model="username" placeholder="请输入登录名" />
				<input type="password" class="input-box" :inputBorder="false" v-model="password"
					:placeholder="$t('pwdLogin.passwordPlaceholder')" />
				<view class="captcha-box" v-if="captchaBase64">
					<image class="captcha-img" @click="createCaptcha" :src="captchaBase64" mode="widthFix"></image>
					<input type="text" class="input-box captcha" :inputBorder="false" v-model="captcha"
						:placeholder="$t('pwdLogin.verifyCodePlaceholder')" />
				</view>
				<!-- <uni-agreements @setAgree="agree = $event"></uni-agreements> -->
				<view class="auth-box">
					<text class="link" @click="toRetrievePwd">{{$t('pwdLogin.forgetPassword')}}</text>
					<text class="link" v-show="showRegister" @click="toRegister">{{registerText}}</text>
				</view>
				<!-- <view style="color:red">
					注意：为防止忘记用户名密码，长时间不操作需要重新登录
				</view> -->
				<u-button class="send-btn" :disabled="!canLogin" type="primary" @click="pwdLogin">
					{{$t('pwdLogin.login')}}
				</u-button>
			</view>
		</view>
		<sevicecontent ref="sevicecontent" @confirm="confirmcontent"></sevicecontent>
		<u-modal v-model="showfindpass">
			<view class="slot-content" style="padding: 10px;">
				{{passcontent}}
			</view>
		</u-modal>
	</view>
</template>
<script>
	import mixin from '../common/login-page.mixin.js';
	import sevicecontent from "./sevicecontent.vue"
	export default {
		mixins: [mixin],
		components: {
			sevicecontent
		},
		data() {
			return {
				showfindpass: false,
				"password": "",
				"username": "",
				"agree": true,
				"captchaBase64": "",
				"captcha": "",
				showRegister: true,
				registerText: "注册账号"
			}
		},
		created() {
			var config = getApp().globalData.systemconfig;
			if (config["800026"] == "1") {
				this.showRegister = false;
			} else {
				this.showRegister = true;
				if (config["800026"] == "2") {
					this.registerText="邀请码注册"
				}else{
					this.registerText="注册账号"
				}
			}
		},
		computed: {
			passcontent() {
				var con = "";
				var config = getApp().globalData.systemconfig;
				if (config["800021"]) {
					con = config["800021"];
				}
				return con;
			},
			canLogin() {
				return this.username.length && this.isPwd;
			},
			isPwd() {
				return /^.{6,20}$/.test(this.password);
			},
			isPhone() {
				return /^1\d{10}$/.test(this.phone);
			},
		},
		methods: {
			goback() {
				uni.navigateBack();
			},
			// 页面跳转，找回密码
			toRetrievePwd() {
				this.showfindpass = true;
			},
			confirmnc() {
				uni.navigateTo({
					url: "/pages/ucenter/login-page/pwd-login/pwd-weibo"
				});
			},
			// 登录确认
			confirmcontent() {
				// 下边是可以登录
				uni.showLoading({
					title: '正在处理...'
				});
				uniCloud.callFunction({
					name: 'uni-id-cf',
					data: {
						action: 'login',
						params: {
							"username": this.username,
							"password": this.password,
							"captcha": this.captcha
						},
					},
					success: ({
						result
					}) => {
						// console.log(result);

						if (result.code === 0) {
							uni.setStorageSync("userInfo", result.userInfo);
							this.checkisbdwb(result.userInfo.username).then((flag) => {
								uni.hideLoading();
								if (flag) {
									uni.setStorageSync("istgzcsh_success", true); //是否通过登录注册审核
									this.loginSuccess(result);
								} else {
									this.confirmnc();
								}
							});
						} else {
							uni.hideLoading();
							if (result.needCaptcha) {
								uni.showToast({
									title: result.msg,
									icon: 'none'
								});
								this.createCaptcha()
							} else {
								uni.showModal({
									title: this.$t('common').error,
									content: result.msg,
									showCancel: false,
									confirmText: this.$t('common').gotIt
								});
							}
						}
					}
				});
			},
			/**
			 * 密码登录
			 */
			pwdLogin() {
				// debugger;
				var agree_service = uni.getStorageSync("agree_service");
				if (agree_service) {
					this.confirmcontent();
				} else {
					this.$refs.sevicecontent.show();
				}
			},
			// 检测时候绑定微博
			checkisbdwb(username) {
				return new Promise(async (reslove) => {
					const db = uniCloud.database();
					const collection = db.collection('uni-id-users');
					var result = await collection.where({
						username: username
					}).field("username,isbdwb,weiboname,weibocontent,nickname").get();
					if (result.result.data && result.result.data.length > 0) {
						uni.hideLoading();
						var data = result.result.data[0];
						if (data.isbdwb) {
							reslove(true);
						} else {
							if (data.weiboname && data.weibocontent) {
								uni.showModal({
									title: '提示',
									showCancel: false,
									confirmText: "退出",
									content: '您已提交微博验证【' + data.weibocontent + '】申请，如已发微博，请等待管理员审核',
									success: function(res) {
										if (res.confirm) {
											if(typeof plus!="undefined"){
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
									}
								});
							} else {
								reslove(false);
							}
						}
					} else {
						reslove(false);
					}
					console.log("result", result);
				});

			},
			createCaptcha() {
				uniCloud.callFunction({
					name: 'uni-id-cf',
					data: {
						action: 'createCaptcha',
						params: {
							scene: "login"
						},
					},
					success: ({
						result
					}) => {
						if (result.code === 0) {
							this.captchaBase64 = result.captchaBase64
						} else {
							uni.showModal({
								content: result.msg,
								showCancel: false
							});
						}
					}
				})
			},
			/* 前往注册 */
			toRegister(e) {
				console.log(e);
				uni.navigateTo({
					url: '/pages/ucenter/login-page/register/register'
				})
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
		flex-direction: row;
		justify-content: space-between;
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
		/* margin: 290px auto 0px auto; */
	}

	.login-back-con .u-btn {
		border-radius: 50px;
	}

	.login-back-con .input-box {
		height: 40px;
		line-height: 40px;
	}
</style>
