<template>
	<u-modal :show="show" confirm-text="登录" cancel-text="退出" :show-cancel-button="false" title="提示" @cancel="cancel"
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
					你的微博审核已通过，请重新登陆
				`,
			}
		},
		onReady() {
			this.show = true;
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
