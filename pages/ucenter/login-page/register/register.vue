<template>
	<view class=" er-register">
		<view class="login-back">
			<view class="usercenter-top">
				<u-navbar :is-back="false" title="用户注册" :border-bottom="false" title-color="#fff" back-icon-color="#fff"
					:background="{'background':'none'}">
				</u-navbar>
			</view>
			<view class="login-back-con">
				<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit"
					err-show-type="undertext" label-width="140px" label-position="right">
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
					<uni-forms-item label="微博昵称" name="weiboname" v-model="formData.weiboname" required>
						<uni-easyinput :inputBorder="false" class="easyinput" placeholder="请输入微博昵称"
							v-model="formData.weiboname" trim="both" />
					</uni-forms-item>
					<u-button class="send-btn" type="primary" @click="submit">注册并申请
					</u-button>
				</uni-forms>
			</view>
			<u-modal v-model="showmodel" :show-cancel-button="true" @confirm="confirmnc" width="85%">
				<view class="slot-content">
					<view style="text-indent: 2em;">请确认微博昵称【{{formData.weiboname}}】输入正确，并在自己微博发送一条【{{wbcontent}}】的微博。</view>
					<view style="text-indent: 2em;">如你确认无误，请点击确认按钮申请，管理员在24h内审核微博通过后可重新进入本系统。</view>
				</view>
			</u-modal>
		</view>
	</view>
</template>
<script>
	import rules from './validator.js';
	import mixin from '../common/login-page.mixin.js';
	export default {
		mixins: [mixin],
		data() {
			return {
				wbcontent: "山河不足重，重在遇知己",
				showmodel: false,
				formData: {
					"username": "",
					"nickname": "",
					'password': '',
					'pwd2': '',
					'weiboname': "" ////微博昵称
				},
				rules,
				agree: true
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('register.navigationBarTitle')
			})
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
						console.log("res",res);
						this.showmodel = true;
					}).catch((errors) => {
						console.log(errors);
					})
					.finally(() => {
						uni.hideLoading()
					});
			},
			confirmnc(){
				this.submitForm(this.formData);
				this.showmodel=false;
			},
			submitForm(params) {
				console.log("params",params);
				uniCloud.callFunction({
					name: 'uni-id-cf',
					data: {
						action: 'register',
						params,
					},
					success: ({
						result
					}) => {
						console.log(result);
						if (result.code === 0) {
							this.loginSuccess(result)
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
	.slot-content{
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
		width: 70px !important;
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
		height: calc(100vh - 44px);
		background-image: url(/static/center/login.png);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}

	.login-back-con {
		width: 80%;
		margin: 290px auto 0px auto;
	}

	.login-back-con .u-btn {
		border-radius: 50px;
	}

	.login-back-con .input-box {
		height: 40px;
		line-height: 40px;
	}
</style>
