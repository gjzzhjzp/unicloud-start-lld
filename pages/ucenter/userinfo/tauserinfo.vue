<template>
	<view>
		<u-navbar :is-back="true" title="TA的个人资料"></u-navbar>
		<uni-list>
			<uni-list-item class="item">
				<template v-slot:body>
					<view :class="['item']">
						<text>{{$t('userinfo.ProfilePhoto')}}</text>
						<view :class="[isoriginal?'original':'']">
							<view class="original" v-if="isoriginal">
								<image class="original-img" src="@/static/center/ori_back.png"></image>
							</view>
							<!-- avatar_file：{{avatar_file}} -->
							<cloud-image v-if="avatar_file" :src="avatar_file.url" width="50px" height="50px">
							</cloud-image>
							<image v-else class="logo-img" src="@/static/center/nologin.png"></image>
							<!-- <uni-icons v-else class="chooseAvatar" type="plusempty" size="30" color="#dddddd">
							</uni-icons> -->
						</view>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item class="item" title="用户/登录名" :rightText="userInfo.username||$t('userinfo.notSet')">
			</uni-list-item>
			<uni-list-item class="item" :title="$t('userinfo.nickname')"
				:rightText="userInfo.nickname||$t('userinfo.notSet')">
			</uni-list-item>
		</uni-list>
		<uni-popup ref="dialog" type="dialog">
			<uni-popup-dialog mode="input" :value="userInfo.nickname" @confirm="setNickname"
				:title="$t('userinfo.setNickname')" :placeholder="$t('userinfo.setNicknamePlaceholder')">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	const db = uniCloud.database();
	const usersTable = db.collection('uni-id-users')
	import image from "./image.js"
	import ucenter from "../ucenter.js"
	export default {
		data() {
			return {
				univerifyStyle: {
					authButton: {
						"title": "本机号码一键绑定", // 授权按钮文案
					},
					otherLoginButton: {
						"title": "其他号码绑定",
					}
				},
				passForm: {
					oldPassword: "",
					password: "",
					rpassword: ""
				},
				showpassmodal: false
			}
		},
		mixins: [image, ucenter],
		created() {
			this.univerifyStyle.authButton.title = this.$t('userinfo.bindPhoneNumber')
			this.univerifyStyle.otherLoginButton.title = this.$t('userinfo.bindOtherLogin')
			uni.setNavigationBarTitle({
				title: this.$t('userinfo.navigationBarTitle')
			})
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				login: 'user/hasLogin'
			}),
			avatar_file() {
				if (this.userInfo.avatar_file && this.userInfo.avatar_file.url) {
					return this.userInfo.avatar_file
				}
			}
		},
		methods: {
			openpassmodel() {
				this.showpassmodal = true;
			},
			...mapMutations({
				setUserInfo: 'user/login'
			}),
			bindMobile() {
				// #ifdef APP-PLUS
				uni.preLogin({
					provider: 'univerify',
					success: this.univerify(), //预登录成功
					fail: (res) => { // 预登录失败
						// 不显示一键登录选项（或置灰）
						console.log(res)
						this.bindMobileBySmsCode()
					}
				})
				// #endif

				// #ifdef MP-WEIXIN
				this.$refs['uni-bindMobileByMpWeixin'].open()
				// #endif

				// #ifdef H5
				//...去用验证码绑定
				this.bindMobileBySmsCode()
				// #endif
			},
			univerify() {
				uni.login({
					"provider": 'univerify',
					"univerifyStyle": this.univerifyStyle,
					success: async e => {
						console.log(e.authResult);
						uniCloud.callFunction({
							name: 'uni-id-cf',
							data: {
								action: 'bindMobileByUniverify',
								params: e.authResult,
							},
							success: ({
								result
							}) => {
								console.log(result);
								if (result.code === 0) {
									this.setUserInfo({
										"mobile": result.mobile
									})
									uni.closeAuthView()
								} else {
									uni.showModal({
										content: result.msg,
										showCancel: false,
										complete() {
											uni.closeAuthView()
										}
									});
								}
							}
						})
					},
					fail: (err) => {
						console.log(err);
						if (err.code == '30002' || err.code == '30001') {
							this.bindMobileBySmsCode()
						}
					}
				})
			},
			bindMobileBySmsCode() {
				uni.navigateTo({
					url: '/pages/ucenter/userinfo/bind-mobile/bind-mobile'
				})
			},
			setNickname(nickname) {
				console.log(nickname);
				if (nickname) {
					usersTable.where('_id==$env.uid').update({
						nickname
					}).then(e => {
						console.log(e);
						if (e.result.updated) {
							uni.showToast({
								title: this.$t('common.updateSucceeded'),
								icon: 'none'
							});
							this.setUserInfo({
								nickname
							});
						} else {
							uni.showToast({
								title: this.$t('userinfo.noChange'),
								icon: 'none'
							});
						}
					})
					this.$refs.dialog.close()
				} else {
					this.$refs.dialog.open()
				}
			},
			setPassword(pass) {
				if (!this.passForm.oldPassword) {
					uni.showToast({
						title: "请输入旧密码",
						icon: 'none'
					});
					this.showpassmodal = true;
					return;
				}
				if (!this.passForm.password) {
					uni.showToast({
						title: "请输入新密码",
						icon: 'none'
					});
					this.showpassmodal = true;
					return;
				}
				if (!this.passForm.rpassword) {
					uni.showToast({
						title: "请确认新密码",
						icon: 'none'
					});
					this.showpassmodal = true;
					return;
				}
				if (this.passForm.password != this.passForm.rpassword) {
					uni.showToast({
						title: "两次输入密码不一致",
						icon: 'none'
					});
					this.showpassmodal = true;
					return;
				}
				uniCloud.callFunction({
					name: 'uni-id-cf',
					data: {
						action: 'updatePwd',
						params: {
							oldPassword: this.passForm.oldPassword,
							newPassword: this.passForm.password
						},
					},
					success: ({
						result
					}) => {
						// console.log("33333333333",result);
						if (result.code === 0) {
							uni.showToast({
								title: "修改成功，请重新登录",
								icon: 'none'
							});
							setTimeout(() => {
								uni.navigateTo({
									url: "/pages/ucenter/login-page/pwd-login/pwd-login"
								});
							}, 2000);
						} else {
							uni.showModal({
								content: result.msg,
								showCancel: false
							});
						}
					}
				});
			},
			setAvatarFile(avatar_file) {
				uni.showLoading({
					title: this.$t('userinfo.setting'),
					mask: true
				});
				// 使用 clientDB 提交数据
				usersTable.where('_id==$env.uid').update({
					avatar_file
				}).then((res) => {
					console.log(res);
					if (avatar_file) {
						uni.showToast({
							icon: 'none',
							title: this.$t('userinfo.setSucceeded')
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: this.$t('userinfo.deleteSucceeded')
						})
					}
					this.setUserInfo({
						avatar_file
					});
				}).catch((err) => {
					uni.showModal({
						content: err.message || this.$t('userinfo.requestFail'),
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},

		}
	}
</script>
<style lang="scss" scoped>
	.logo-img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
	.original {
		position: relative;
	}

	.original-img {
		width: 70px;
		height: 70px;
		position: absolute;
		top: -8px;
		left: -11px;
	}

	/* #ifndef APP-NVUE */
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	/* #endif */
	.item {
		width: 750rpx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.chooseAvatar {
		border: dotted 1px #ddd;
		border-radius: 10px;
		text-align: center;
		width: 50px;
		height: 50px;
		line-height: 50px;
		z-index: 99;
	}
</style>
