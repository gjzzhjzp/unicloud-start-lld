<template>
	<view class=" pwd-login">
		<!-- <u-navbar :is-back="true" title="用户登录"></u-navbar> -->
		<view class="login-back">
			<view class="usercenter-top">
				<view class="usercenter-top-left" @click="goback">
					<u-icon name="close" color="#fff" :size="40"></u-icon>
				</view>
				<view class="usercenter-top-mine">
					用户登录
				</view>
			</view>
			<view class="login-back-con">
				<input class="input-box" :inputBorder="false" v-model="username"
					placeholder="请输入用户名" />
				<input type="password" class="input-box" :inputBorder="false" v-model="password"
					:placeholder="$t('pwdLogin.passwordPlaceholder')" />
				<view class="captcha-box" v-if="captchaBase64">
					<image class="captcha-img" @click="createCaptcha" :src="captchaBase64" mode="widthFix"></image>
					<input type="text" class="input-box captcha" :inputBorder="false" v-model="captcha"
						:placeholder="$t('pwdLogin.verifyCodePlaceholder')" />
				</view>
				<!-- <uni-agreements @setAgree="agree = $event"></uni-agreements> -->
				<view class="auth-box">
					<!-- <text class="link" @click="toRetrievePwd">{{$t('pwdLogin.forgetPassword')}}</text> -->
					<text class="link" @click="toRegister">{{$t('pwdLogin.register')}}</text>
				</view>
				<u-button class="send-btn" :disabled="!canLogin" type="primary"
					@click="pwdLogin">{{$t('pwdLogin.login')}}</u-button>
			</view>
			<!-- <uni-quick-login :agree="agree" ref="uniQuickLogin"></uni-quick-login> -->
		</view>
	</view>
</template>

<script>
	import mixin from '../common/login-page.mixin.js';
	export default {
		mixins: [mixin],
		data() {
			return {
				"password": "",
				"username": "",
				"agree": true,
				"captchaBase64": "",
				"captcha": ""
			}
		},
		computed: {
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
			goback(){
				uni.navigateBack();
			},
			// 页面跳转，找回密码
			toRetrievePwd() {
				uni.navigateTo({
					url: '../pwd-retrieve/pwd-retrieve?phoneNumber=' + (this.isPhone ? this.username : '') +
						'&phoneArea=' + this.currenPhoneArea
				})
			},
			/**
			 * 密码登录
			 */
			pwdLogin() {
				if (!this.agree) {
					return uni.showToast({
						title: this.$t('common').noAgree,
						icon: 'none'
					});
				}
				// 下边是可以登录
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
						console.log(result);
						if (result.code === 0) {
							this.loginSuccess(result)
						} else {
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
				})
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
		height: calc(100vh - 44px);
		background-image: url(/static/center/login.png);
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
		    margin: 250px auto 0px auto;
	}
	.login-back-con .u-btn{
		    border-radius: 50px;
	}
	.login-back-con .input-box{
		    height: 40px;
		    line-height: 40px;
	}
</style>
