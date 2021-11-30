<template>
	<u-modal v-model="show" confirm-text="退出" cancel-text="退出" :show-cancel-button="false" title="提示" @cancel="cancel"
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
				weibocontent:"",
				content: ""
			}
		},
		onLoad(e){
			this.weibocontent=e.content;
			this.content='您已提交微博验证【'+this.weibocontent+'】申请，如已发微博，请等待管理员审核;'
		},
		onReady() {
			this.show = true;
		},
		methods: {
			cancel() {
				this.closeModal();
			},
			confirm() {
				this.closeModal();
			},
			closeModal() {
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
