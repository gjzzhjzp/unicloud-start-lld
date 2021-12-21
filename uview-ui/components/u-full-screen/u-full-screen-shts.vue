<template>
	<u-modal :show="show" confirm-text="同意" cancel-text="退出" :show-cancel-button="true" title="提示" @cancel="cancel"
		@confirm="confirm">
		<view class="u-update-content">
			<rich-text :nodes="content"></rich-text>
		</view>
	</u-modal>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				content: `
					为加强注册登录验证，现开启发微博审核。
					用户需在指定地方填入【微博主页链接地址】且在微博发送一条【指定的微博】（仅审核时验证使用），待管理组24h内审核通过方可登录进入。
					是否同意？（如果您的账号已通过审核，请忽略此条提示，直接同意登录即可）
				`,
			}
		},
		onReady() {
			this.show = true;
			var config=getApp().globalData.config;
			if(config["800010"]){
				this.content=config["800010"];
			}
		},
		methods: {
			cancel() {
				this.closeModal();
			},
			confirm() {
				uni.reLaunch({
					url: "/pages/ucenter/login-page/pwd-login/pwd-login"
				});
				// this.closeModal();
			},
			closeModal() {
				this.show=false;
				// #ifdef APP-PLUS  
				plus.runtime.quit();
				// #endif
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";

	.u-full-content {
		background-color: #00C777;
	}

	.u-update-content {
		font-size: 26rpx;
		color: $u-content-color;
		line-height: 1.7;
		padding: 30rpx;
	}
</style>
