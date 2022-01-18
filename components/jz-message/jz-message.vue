<template>
	<view class="jz-message">
		<u-form :model="form" ref="uForm">
			<u-form-item label="" prop="message">
				<u-input v-model="form.message" type="textarea" :height="height" placeholder="bb,请轻轻踩下你的脚印~" />
			</u-form-item>
		</u-form>
		<u-button type="primary" @click="submit">提交</u-button>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	export default {
		data() {
			return {
				height: 600,
				form: {
					message: ''
				},
				rules: {
					message: [{
						required: true,
						message: '请输入留言',
						trigger: ['change', 'blur'],
					}]
				}
			}
		},
		mounted() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uniCloud.callFunction({
							name: 'jzmessage',
							data: {
								action: 'message/addMessage'
							},
						}).then((res) => {
							var res = res.result;
							if (res.state == "0000") {
								this.$refs.uToast.show({
									title: res.msg,
									type: 'success'
								});
							} else {
								this.$refs.uToast.show({
									title: res.msg,
									type: 'error'
								});
							}
						}).catch((err)=>{
					console.log("网络错误，请重试——err",err);
					uni.showModal({
					  content: err.message || '网络错误，请重试',
					  showCancel: false
					});
				});
					} else {
						console.log('验证失败');
					}
				});
			}
		}
	}
</script>

<style>
</style>
