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
				content: "",
				time:24,
				isnewinfo:""
			}
		},
		onLoad(e){
			this.weibocontent=e.content;
			var config=getApp().globalData.systemconfig;
			if(config["800024"]){
				this.time=config["800024"];
			}
			var yxdz="jzszd9192051129@163.com";
			if(config["800025"]){
				yxdz=config["800025"];
			}
			this.content='您已提交微博验证【'+this.weibocontent+'】申请，如已发微博，请等待管理员审核。若超过'+this.time+'小时未审核通过，请带上APP登录名发送邮件到'+yxdz+'咨询。'
		},
		onReady() {
			this.show = true;
			this.checknewinfo();
		},
		methods: {
			// 检测时候有新的系统消息
			async checknewinfo() {
				var userInfo = uni.getStorageSync("userInfo");
				const db=uniCloud.database();
				var res = await db.collection('jz-custom-systeminfo').where({
					user_id:userInfo._id,
					type:0
				}).field("comment").get();
				if (res.result.data && res.result.data.length > 0) {
					var infos = res.result.data;
					if(infos&&infos.length>0){
						this.isnewinfo=infos[0].comment;
						if(this.isnewinfo){
							this.content+="<br>审核意见：【"+this.isnewinfo+"】";
						}
					}
				}
				console.log("isnewinfo",this.isnewinfo);
			},
			cancel() {
				this.closeModal();
			},
			confirm() {
				this.closeModal();
			},
			closeModal() {
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
