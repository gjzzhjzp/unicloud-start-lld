<template>
	<u-modal v-model="show" :show-cancel-button="false"  confirm-text="退出" title="提示" @cancel="cancel" @confirm="confirm">
		<view class="u-update-content">
			<view style="margin-bottom: 10px;">
				您的账号已禁用，请联系管理员。
			</view>
		</view>
	</u-modal>
</template>

<script>
	 const db = uniCloud.database()
	export default {
		data() {
			return {
				show: false,
				value:""
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
	.u-update-content {
		font-size: 26rpx;
		color: $u-content-color;
		line-height: 1.7;
		padding: 30rpx;
		text-align: center;
	}
</style>
