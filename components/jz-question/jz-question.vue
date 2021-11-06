<template>
	<view class="jz-question">
		<u-form ref="uForm">
			<u-form-item required :label="item.title" v-for="(item,index) in list" label-position="top" :key="index">
				<u-input v-model="item.answer" />
			</u-form-item>
		</u-form>
		<view class="jz-bottom">
			<u-button type="primary" @click="submit">确定</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		created() {
			this.getQuestion();
		},
		methods: {
			getQuestion() {
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'checkquestion/getquestion'
					},
				}).then((res) => {
					var res = res.result;
					if (res.state == "0000") {
						this.list = res.data;
						this.list.push({
							title:"龚俊的老婆是谁？"
						})
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						});
					}
				});
			},
			submit() {
				var data = this.list;
				var flag = true;
				var dataid = [];
				data.forEach((item,index) => {
						if (!item.answer) {
							this.$refs.uToast.show({
								title: "宝，请输入完整答案哦~",
								type: 'error'
							});
							flag = false;
						} else {
							if(index!=3){
								dataid.push({
									_id: item._id,
									answer: item.answer
								});
							}
						}
				});
				if (!flag) {
					return;
				}else{
					if(data[3].answer!="张哲瀚"){
						this.$refs.uToast.show({
							title: "答案错误",
							type: 'error'
						});
						return;
					}
				}
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'checkquestion/check',
						data: dataid
					},
				}).then((res) => {
					var res = res.result;
					if (res.state == "0000") {
						uni.setStorageSync("question_success",true);
						uni.switchTab({
							url: '/pages/index/index'
						});
					} else {
						uni.setStorageSync("question_success",false);
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						});
					}
				})
			}
		}
	}
</script>
<style>
	.jz-bottom {
		margin-top: 40px;
	}
</style>
