<template>
	<u-modal v-model="show" :show-cancel-button="true" cancel-text="退出" confirm-text="确定" title="提示" @cancel="cancel" @confirm="confirm">
		<view class="u-update-content">
			<view style="margin-bottom: 10px;">
				此APP现为邀请制，请输入邀请码<br>
				(注意：手动退出登录需要重新输入邀请码)
			</view>
			<view>
				<u-input v-model="value" type="text" placeholder="请输入邀请码" :border="true" />
			</view>
		</view>
		<u-toast ref="uToast" />
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
				this.show = true;
				if(!this.value){
					this.$refs.uToast.show({
						title: '请输入邀请码',
						type: 'warning'
					});
					return;
				}
				var yqm = this.value;
				db.collection('jz-custom-yqm').where({
					value: yqm,
					status: true,
					user_type:1
				}).get().then(async (res) => {
					if(res.result&&res.result.data.length>0){
						this.show = false;
						this.value="";
						uniCloud.callFunction({
							name: 'jzfunction',
							data: {
								action: 'yqm/updateYqmZt',
								data: {
									id:res.result.data[0]._id
								}
							},
						}).then((res1) => {
							var res1 = res1.result;
							if (res1.state == "0000") {
								uni.setStorageSync("yqm_success",true);
								uni.reLaunch({
									url: "/pages/question/question"
								});
							} 
						});
					}else{
						this.$refs.uToast.show({
							title: '邀请码无效',
							type: 'error'
						});
					}
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				});
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
		text-align: center;
	}
</style>
