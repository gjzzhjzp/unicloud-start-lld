<template>
	<u-modal :show="show" :show-cancel-button="false" confirm-text="退出" title="提示" @cancel="cancel" @confirm="confirm">
		<view class="u-update-content">
			{{content}}
		</view>
	</u-modal>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				content: `
					系统已锁定
				`,
			}
		},
		onReady() {
			this.show = true;
			var config=getApp().globalData.systemconfig;
			if(config["800023"]){
				this.content=config["800023"];
			}
		},
		methods: {
			cancel() {
				this.closeModal();
			},
			confirm() {
				this.closeModal();
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
		text-align: center;
	}
</style>
