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
						<uni-easyinput :inputBorder="false" class="easyinput" placeholder="请输入登录名(不区分大小写)"
							v-model="formData.username" trim="both" />
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
					<uni-forms-item v-if="sfxs_yqm" label="邀请码" name="yqm" v-model="formData.yqm" required>
						<uni-easyinput :inputBorder="false" class="easyinput" placeholder="请输入邀请码"
							v-model="formData.yqm" trim="both" />
					</uni-forms-item>
					<u-button class="send-btn" type="primary" @click="submit">注册并申请
					</u-button>
				</uni-forms>
			</view>
			<u-modal v-model="showmodel" :show-cancel-button="true" @confirm="confirmnc" width="85%">
				<view class="slot-content">
					<view style="text-indent: 2em;">
						请确认微博主页地址【{{formData.weiboname}}】输入正确，并在自己微博发送一条【{{formData.weibocontent}}】的微博。</view>
					<view style="text-indent: 2em;">如你确认无误，请点击确认按钮申请，待管理员审核微博通过后可重新进入本系统。</view>
					<view style="text-indent: 2em;">注意请不要重复注册账号，加大管理组的审核工作量，多余的账号将会被锁定。</view>
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
	const db = uniCloud.database();
	export default {
		mixins: [mixin],
		components: {
			sevicecontent
		},
		data() {
			return {
				showmodel: false,
				formData: {
					"username": "",
					"nickname": "",
					'password': '',
					'pwd2': '',
					'weiboname': "", ////微博主页链接地址
					"yqm": "", //邀请码
					"weibocontent": "山河不足重，重在遇知己"
				},
				rules,
				agree: true,
				yqr_id: "", ////邀请人id
				yqr_number: 3, ///默认3个邀请人数
				yqrxz_number: 10000, ////邀请限制人数
				sfxs_yqm: false ////是否显示邀请码注册
			}
		},
		created() {
			var weibonc = getApp().globalData.weiboyz;
			var index = parseInt(Math.random() * weibonc.length);
			this.$set(this.formData, "weibocontent", weibonc[index]);
			var config = getApp().globalData.systemconfig;
			var t_800027 = config["800027"]; //、邀请人数	
			if (t_800027) {
				this.yqr_number = t_800027 || 3;
			}
			if (config["800026"] == "2") {
				this.sfxs_yqm = true
			}
			if (config["800028"]) {
				this.yqrxz_number = config["800028"];
			}
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
				this.$refs.form.validate().then(async (res) => {
						if (this.sfxs_yqm) {
							// 检测当前是否超过邀请码注册的最大人数
							var day1=new Date(new Date().toLocaleDateString()).getTime();
							var day2=new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1;
							var daycount=await db.collection('uni-id-users').where('register_date > '+day1+'&&register_date < '+day2+'').count()
							console.log("daycount",daycount);
							var _count=daycount.result.total;
							if(_count>=this.yqrxz_number){
								uni.showToast({
									title: "已超过当天限制注册人数，请明天再试",
									icon: "none",
									duration:3000
								});
								uni.hideLoading();
								return;
							}
							// console.log("yqrxz_number",this.yqrxz_number);
							// return;
							// 先查询邀请码是否存在对应的用户名
							var yqm = this.formData.yqm.toLowerCase();
							var _yqm = yqm.split("_");
							var username = "";
							if (_yqm.length == 2 && _yqm[1] == "51129") {
								username = yqm.split("_")[0];
							} else {
								uni.showToast({
									title: "邀请码无效",
									icon: "none",
									duration:3000
								});
								uni.hideLoading();
								return;
							}
							if (username) {
								var _user = await db.collection("uni-id-users").where({
									username: username,
									status:0,
									isbdwb:true
								}).field("_id,username,nickname").get();
								if (_user.result && _user.result.data && _user.result.data.length > 0) {
									this.yqr_id = _user.result.data[0]._id;
									var yq_user = await db.collection("jz-custom-yhyqm").where({
										yqr_id: this.yqr_id
									}).get();
									if (yq_user.result && yq_user.result.data && yq_user.result.data.length >= this
										.yqr_number) {
										uni.showToast({
											title: "该邀请码已超过限制邀请人数",
											icon: "none"
										});
										uni.hideLoading();
										return;
									}
								} else {
									uni.showToast({
										title: "邀请码无效",
										icon: "none",
										duration:3000
									});
									uni.hideLoading();
									return;
								}
								console.log("_user", _user, this.yqr_id);
							} else {
								uni.showToast({
									title: "邀请码无效",
									icon: "none",
									duration:3000
								});
								uni.hideLoading();
								return;
							}
						}

						// return;
						var agree_service = uni.getStorageSync("agree_service");
						if (agree_service) {
							this.showmodel = true;
						} else {
							this.$refs.sevicecontent.show();
						}
					}).catch((errors) => {
						console.log(errors);
					})
					.finally(() => {
						uni.hideLoading()
					});
			},
			confirmcontent() {

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
					success: async ({
						result
					}) => {
						uni.hideLoading();
						if (result.code === 0) {
							uni.setStorageSync("userInfo", result.userInfo);
							// 如果存在，用户正常注册，返回用户id,写入邀请表
							if (this.sfxs_yqm) {
								await db.collection("jz-custom-yhyqm").add({
									yqr_id: this.yqr_id,
									byqr_id: result.userInfo._id
								});
							}
							uni.showModal({
								title: '提示',
								showCancel: false,
								confirmText: "退出",
								content: '您已注册成功，且申请已提交，请尽快发微博，待管理员审核后方可登录',
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
