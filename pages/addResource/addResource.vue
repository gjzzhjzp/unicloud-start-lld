<template>
	<view class="jz-container">
		<u-navbar :is-back="true" title="我要投稿"></u-navbar>
		<u-form :model="form" ref="uForm" label-width="140">
			<u-form-item required label="标题" prop="title">
				<u-input v-model="form.title" />
			</u-form-item>
			<u-form-item required label="简介" prop="excerpt">
				<u-input v-model="form.excerpt" />
			</u-form-item>
			<u-form-item required label="投稿人" prop="contributor">
				<u-input v-model="form.contributor" />
			</u-form-item>
			<u-form-item required label="作者" prop="author">
				<u-input v-model="form.author" />
			</u-form-item>
			<u-form-item required label="分类" prop="category_id">
				<u-input v-model="form.category_id" />
			</u-form-item>
			<u-form-item required label="封面图片" prop="avatar">
				<view style="width: 100%;">
					<uni-file-picker ref="filepicker1" v-model="avatar" fileMediatype="image" mode="grid"
						:auto-upload="false" :limit="1" @select="selectFile" @success="successFile" />
				</view>
			</u-form-item>
			<u-form-item required label="附件资源" prop="resources">
				<view style="width: 100%;">
					<uni-file-picker ref="filepicker2" v-model="resources" fileMediatype="all" mode="grid" :auto-upload="false"
						@select="selectFile2" @success="successFile2" />
				</view>
			</u-form-item>
		</u-form>
		<u-toast ref="uToast" />
		<u-button @click="submitbefore" type="primary">提交</u-button>
		<u-button @click="deleteFile">批量删除测试数据</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					title: '',
					excerpt: '',
					zy_gs: '',
					contributor: '',
					author: '',
					category_id: '',
					avatar: "",
					resources: []
				},
				avatar: [],
				resources: [],
				rules: {
					title: [{
						required: true,
						message: '请输入标题',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					excerpt: [{
						required: true,
						message: '请输入摘要',
						trigger: ['change', 'blur'],
					}],
					zy_gs: [{
						required: true,
						message: '请输入格式',
						trigger: ['change', 'blur'],
					}],
					contributor: [{
						required: true,
						message: '请输入投稿人',
						trigger: ['change', 'blur'],
					}],
					author: [{
						required: true,
						message: '请输入作者',
						trigger: ['change', 'blur'],
					}],
					category_id: [{
						required: true,
						message: '请输入分类',
						trigger: ['change', 'blur'],
					}]
				},
				filesuccess1: 0,
				filesuccess2: 0
			};
		},
		methods: {
			selectFile(parames) {
				this.avatar = parames.tempFilePaths;
			},
			successFile(parames) {
				this.$set(this.form, "avatar", parames.tempFilePaths[0]);
				this.filesuccess1 = 1;
				if (this.filesuccess2 == 1) {
					this.submit();
				}
			},
			selectFile2(parames) {
				this.resources = parames.tempFilePaths;
			},
			successFile2(parames) {
				this.$set(this.form, "resources", parames.tempFilePaths);
				var zy_gs="";
				if(parames.tempFiles.length>0){
					zy_gs=parames.tempFiles[0].extname;
				}
				this.$set(this.form, "zy_gs", zy_gs);
				this.filesuccess2 = 1;
				if (this.filesuccess1 == 1) {
					this.submit();
				}
			},
			submitbefore() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if (this.avatar.length == 0) {
							this.$refs.uToast.show({
								title: "请选择封面图片",
								type: 'warning'
							});
							return;
						}
						if (this.resources.length == 0) {
							this.$refs.uToast.show({
								title: "请选择资源",
								type: 'warning'
							});
							return;
						}
						this.$refs.filepicker1.upload();
						this.$refs.filepicker2.upload();
					} else {
						console.log('验证失败');
					}
				});
			},
			submit() {
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'resource/addList',
						data: this.form
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
					uni.showModal({
					  content: err.message || '网络错误，请重试',
					  showCancel: false
					});
				});
			},
			async deleteFile() {
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'resource/deleteFile'
					},
				}).then((res) => {
					console.log("res", JSON.stringify(res));
				}).catch((err)=>{
					console.log("网络错误，请重试——err",err);
					uni.showModal({
					  content: err.message || '网络错误，请重试',
					  showCancel: false
					});
				});
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>
<style>
</style>
