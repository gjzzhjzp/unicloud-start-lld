<template>
	<u-modal v-model="show" :show-cancel-button="false" confirm-text="退出" title="提示" @cancel="cancel" @confirm="confirm">
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
					为加强管理，限制了每日访问人数<br>
					今日访问人数已达上线
				`,
			}
		},
		onReady() {
			this.show = true;
			var config=getApp().globalData.systemconfig;
			if(config["800009"]){
				this.content=config["800009"];
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
				if(typeof plus!="undefined"){
				var pscreen = plus.webview.currentWebview().opener();
				mui.fire(pscreen, 'quit', {
					data: "quit"
				});
				// #ifdef APP-PLUS  
				plus.runtime.quit();  
				// #endif
				}
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
		font-size: 14px;
		color: $u-content-color;
		line-height: 1.7;
		padding: 15px;
	}
</style>
