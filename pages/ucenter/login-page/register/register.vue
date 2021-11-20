<template>
	<view class=" er-register">
		<view class="login-back">
			<view class="usercenter-top">
				<u-navbar :is-back="true" title="用户注册" :border-bottom="false" title-color="#fff" back-icon-color="#fff" :background="{'background':'none'}">
				</u-navbar>
				<!-- <view class="usercenter-top-left" @click="goback">
					<u-icon name="close" color="#fff" :size="40"></u-icon>
				</view>
				<view class="usercenter-top-mine">
					用户注册
				</view> -->
			</view>
			<view class="login-back-con">
		<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="undertext" label-width="140px" label-position="right">
			<uni-forms-item label="登录名" name="username" required>
				<uni-easyinput :inputBorder="false" class="easyinput" :placeholder="$t('register.usernamePlaceholder')" v-model="formData.username" trim="both" />
			</uni-forms-item>
			<uni-forms-item label="昵称" name="nickname">
				<uni-easyinput :inputBorder="false" class="easyinput" :placeholder="$t('register.nicknamePlaceholder')" v-model="formData.nickname" trim="both" />
			</uni-forms-item>
			<uni-forms-item label="密码" name="password" v-model="formData.password" required>
				<uni-easyinput :inputBorder="false" class="easyinput" :placeholder="$t('register.passwordDigitsPlaceholder')" type="password" v-model="formData.password" trim="both" />
			</uni-forms-item>
			<uni-forms-item label="确认密码" name="pwd2" v-model="formData.pwd2" required>
				<uni-easyinput :inputBorder="false" class="easyinput" :placeholder="$t('register.passwordAgain')" type="password" v-model="formData.pwd2" trim="both" />
			</uni-forms-item>
			<!-- <uni-agreements @setAgree="agree = $event"></uni-agreements> -->
			<u-button class="send-btn" type="primary" @click="submit">{{$t('register.registerAndLogin')}}</u-button>
		</uni-forms>
		</view>
		</view>
	</view>
</template>
<script>
import rules from './validator.js';
import mixin from '../common/login-page.mixin.js';
	export default {
		mixins:[mixin],
		data() {
			return {
				formData: {
					"username": "",
					"nickname": "",
					'password':'',
					'pwd2':''
				},
				rules,
				agree:true
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
			goback(){
				uni.navigateBack();
			},
			/**
			 * 触发表单提交
			 */
			submit() {
				if(!this.agree){
					return uni.showToast({
						title: this.$t('common').noAgree,
						icon: 'none'
					});
				}
				uni.showLoading({
					mask: true
				})
				this.$refs.form.validate().then((res) => {
						this.submitForm(res)
					}).catch((errors) => {
						console.log(errors);
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			submitForm(params) {
				uniCloud.callFunction({
					name:'uni-id-cf',
					data:{
						action:'register',
						params,
					},
					success: ({result}) => {
						console.log(result);
						if(result.code === 0){
							this.loginSuccess(result)
						}else{
							uni.showModal({
								content: result.msg,
								showCancel: false
							});
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../common/login-page.css");
	.er-register .title{
		font-size: 24px;
		margin-bottom: 30px;
	}
	.uni-container {
		padding: 15px;
		padding-top: 6em;
	}
	.send-btn{
		margin-top: 5px;
	}
	.er-register ::v-deep .uni-forms-item__label{
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
	.login-back-con .u-btn{
		    border-radius: 50px;
	}
	.login-back-con .input-box{
		    height: 40px;
		    line-height: 40px;
	}
</style>
