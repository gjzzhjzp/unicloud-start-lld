<template>
	<view class=" er-register">
		<view class="login-back">
			<view class="usercenter-top">
				<u-navbar :is-back="false" title="用户注册" :border-bottom="false" title-color="#fff" back-icon-color="#fff"
					:background="{'background':'none'}">
				</u-navbar>
			</view>
			<view class="login_back_logo">
				<u-image width="100%" :src="'/static/login-index/login_back.png'" mode="widthFix"></u-image>
			</view>
			<view class="login-back-con">
				<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit"
					err-show-type="undertext" label-width="160px" label-position="right">
					<uni-forms-item label="登录名" name="username" required>
						<uni-easyinput :inputBorder="false" class="easyinput"
							:placeholder="$t('register.usernamePlaceholder')" v-model="formData.username" trim="both" />
					</uni-forms-item>
					<uni-forms-item label="昵称" name="nickname">
						<uni-easyinput :inputBorder="false" class="easyinput"
							:placeholder="$t('register.nicknamePlaceholder')" v-model="formData.nickname" trim="both" />
					</uni-forms-item>
					<uni-forms-item label="密码" name="password" v-model="formData.password" required>
						<uni-easyinput :inputBorder="false" class="easyinput"
							:placeholder="$t('register.passwordDigitsPlaceholder')" type="password"
							v-model="formData.password" trim="both" />
					</uni-forms-item>
					<uni-forms-item label="确认密码" name="pwd2" v-model="formData.pwd2" required>
						<uni-easyinput :inputBorder="false" class="easyinput"
							:placeholder="$t('register.passwordAgain')" type="password" v-model="formData.pwd2"
							trim="both" />
					</uni-forms-item>
					<uni-forms-item label="微博地址" name="weiboname" v-model="formData.weiboname" required>
						<uni-easyinput :inputBorder="false" class="easyinput" placeholder="http://"
							v-model="formData.weiboname" trim="both" />
					</uni-forms-item>
					<u-button class="send-btn" type="primary" @click="submit">注册并申请
					</u-button>
				</uni-forms>
			</view>
			<u-modal v-model="showmodel" :show-cancel-button="true" @confirm="confirmnc" width="85%">
				<view class="slot-content">
					<view style="text-indent: 2em;">
						请确认微博主页地址【{{formData.weiboname}}】输入正确，并在自己微博发送一条【{{formData.weibocontent}}】的微博。</view>
					<view style="text-indent: 2em;">如你确认无误，请点击确认按钮申请，管理员在24h内审核微博通过后可重新进入本系统。</view>
				</view>
			</u-modal>
		</view>
		<sevicecontent ref="sevicecontent" @confirm="confirmcontent"></sevicecontent>
	</view>
</template>
<script>
	import rules from './validator.js';
	import mixin from '../common/login-page.mixin.js';
	import sevicecontent from "../pwd-login/sevicecontent.vue"
	export default {
		mixins: [mixin],
		components:{sevicecontent},
		data() {
			return {
				showmodel: false,
				formData: {
					"username": "",
					"nickname": "",
					'password': '',
					'pwd2': '',
					'weiboname': "", ////微博昵称
					"weibocontent": "山河不足重，重在遇知己"
				},
				rules,
				agree: true
			}
		},
		created() {
			var weibonc = getApp().globalData.weiboyz;
			var index = parseInt(Math.random() * weibonc.length);
			this.$set(this.formData, "weibocontent", weibonc[index]);
		},
		onReady() {
			this.$refs.form.setRules(this.rules);

		},
		methods: {
			goback() {
				uni.navigateBack();
			},
			/**
			 * 触发表单提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.validate().then((res) => {
						var agree_service = uni.getStorageSync("agree_service");
						if(agree_service){
							this.showmodel = true;
						}else{
							this.$refs.sevicecontent.show();
						}
					}).catch((errors) => {
						console.log(errors);
					})
					.finally(() => {
						uni.hideLoading()
					});
			},
			confirmcontent(){
				this.showmodel = true;
			},
			confirmnc() {
				this.submitForm(this.formData);
				this.showmodel = false;
			},
			submitForm(params) {
				uni.showLoading({
					title: '正在处理...'
				});
				uniCloud.callFunction({
					name: 'uni-id-cf',
					data: {
						action: 'register',
						params,
					},
					success: ({
						result
					}) => {
						uni.hideLoading();
						if (result.code === 0) {
							uni.setStorageSync("userInfo", result.userInfo);
							uni.showModal({
								title: '提示',
								showCancel: false,
								confirmText: "退出",
								content: '您已注册成功，且申请已提交，请尽快发微博，待管理员审核后方可登录',
								success: function(res) {
									if (res.confirm) {
										console.log("在这里退出App");
										// #ifdef APP-PLUS  
										plus.runtime.quit();
										// #endif
									}
								}
							});
							// this.loginSuccess(result)
						} else {
							uni.showModal({
								content: result.msg,
								showCancel: false
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
	@import url("../common/login-page.css");

	.slot-content {
		padding: 10px;
	}

	.er-register .title {
		font-size: 24px;
		margin-bottom: 30px;
	}

	.uni-container {
		padding: 15px;
		padding-top: 6em;
	}

	.send-btn {
		margin-top: 5px;
	}

	.er-register ::v-deep .uni-forms-item__label {
		width: 5em !important;
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
