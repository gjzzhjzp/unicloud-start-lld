<template>
	<view class="jz-question">
		<u-form ref="uForm">
			<u-form-item required :label="item.title" v-for="(item,index) in list" label-position="top" :key="index">
				<u-input v-model="item.answer" />
			</u-form-item>
			<u-form-item required label="相信国家，相信党，永远跟党走" label-position="top" :key="4">
				<u-input v-model="answer" placeholder="请完整输入以上内容"/>
			</u-form-item>
			<u-form-item required label="人民有信仰，民族有希望，国家有力量" label-position="top" :key="5">
				<u-input v-model="answer2" placeholder="请完整输入以上内容"/>
			</u-form-item>
		</u-form>
		<view class="jz-bottom">
			<u-button type="primary" @click="submit">确定</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
		import checksh from "@/common/checksh.js"
	export default {
		data() {
			return {
				list: [],
				answer:"",
				answer2:""
			}
		},
		mixins:[checksh],
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
			},
			submit() {
				var data = this.list;
				var flag = true;
				var dataid = [];
				data.forEach((item,index) => {
						if (!this.answer||!this.answer2) {
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
					if(this.answer!="相信国家，相信党，永远跟党走"||this.answer2!="人民有信仰，民族有希望，国家有力量"){
						this.$refs.uToast.show({
							title: "答案错误",
							type: 'error'
						});
						return;
					}
				}
				uni.showLoading({
					title: '正在处理...'
				});
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'checkquestion/check',
						data: dataid
					},
				}).then((res) => {
					var res = res.result;
					uni.hideLoading();
					if (res.state == "0000") {
						uni.setStorageSync("question_success1",true);
						this.no_istgzcsh("question");
					} else {
						uni.setStorageSync("question_success1",false);
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						});
					}
				});
			}
		}
	}
</script>
<style>
	.jz-bottom {
		margin-top: 40px;
	}
</style>
