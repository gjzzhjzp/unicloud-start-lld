<template>
	<view class="uni-container">
		<u-navbar :is-back="true" title="我要投稿"></u-navbar>
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="title" label="标题" required>
				<uni-easyinput placeholder="请输入标题" v-model="formData.title" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="author" label="来源" required>
				<uni-easyinput placeholder="请输入来源" v-model="formData.author" trim="both"></uni-easyinput>
			</uni-forms-item>
		
			<!-- <uni-forms-item name="article_status" label="文章状态">
        <uni-data-checkbox v-model="formData.article_status" :localdata="formOptions.article_status_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="comment_status" label="开放评论">
        <uni-data-checkbox v-model="formData.comment_status" :localdata="formOptions.comment_status_localdata"></uni-data-checkbox>
      </uni-forms-item> -->
			<uni-forms-item name="avatar" label="封面大图" required>
				<uni-file-picker file-mediatype="image" return-type="object" v-model="formData.avatar" ref="filepicker1"
					mode="grid" :auto-upload="false" @select="selectFile"  :limit="1" @success="successFile">
				</uni-file-picker>
			</uni-forms-item>
			<uni-forms-item name="resources" label="附件资源" required>
				<uni-file-picker file-mediatype="all" return-type="array" v-model="formData.resources" ref="filepicker2"
					mode="grid" :auto-upload="false" @select="selectFile2"  @success="successFile2"></uni-file-picker>
			</uni-forms-item>
			
			<uni-forms-item name="excerpt" label="摘要">
				<uni-easyinput placeholder="请输入摘要" v-model="formData.excerpt" trim="both"></uni-easyinput>
			</uni-forms-item>
			<!--  <uni-forms-item name="content" label="内容">
        <uni-easyinput placeholder="请输入内容" v-model="formData.content" trim="right"></uni-easyinput>
      </uni-forms-item> -->
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submitbefore">提交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/jz-opendb-resources.js';

	const db = uniCloud.database();
	const dbCollectionName = 'jz-opendb-resources';

	function getValidator(fields) {
		let result = {}
		for (let key in validator) {
			if (fields.indexOf(key) > -1) {
				result[key] = validator[key]
			}
		}
		return result
	}

	export default {
		data() {
			let formData = {
				"author": "",
				"title": "",
				"article_status": 0,
				"comment_status": 0,
				"avatar": null,
				"resources": [],
				"excerpt": "",
				"content": ""
			}
			return {
				formData,
				formOptions: {
					"article_status_localdata": [{
							"value": 0,
							"text": "锁定"
						},
						{
							"value": 1,
							"text": "启用"
						}
					],
					"comment_status_localdata": [{
							"value": 0,
							"text": "关闭"
						},
						{
							"value": 1,
							"text": "开放"
						}
					]
				},
				rules: {
					...getValidator(Object.keys(formData))
				},
				filesuccess1: 0,
				filesuccess2: 0,
				filecontent1:null,
				filecontent2:null,
				value: {}
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			selectFile(parames) {
				this.filecontent1 = parames.tempFilePaths;
			},
			selectFile2(parames) {
				this.filecontent2 = parames.tempFilePaths;
			},
			successFile(parames) {
				this.filesuccess1 = 1;
				if (this.filesuccess2 == 1) {
					this.submit();
				}
			},
			successFile2(parames) {
				var zy_gs = "";
				if (parames.tempFiles.length > 0) {
					zy_gs = parames.tempFiles[0].extname;
				}
				this.formData.zy_gs=zy_gs;
				// this.$set(this.value, "zy_gs", zy_gs);
				this.filesuccess2 = 1;
				if (this.filesuccess1 == 1) {
					this.submit();
				}
			},
			submitbefore() {
				if (!this.formData.title) {
					uni.showToast({
						icon: 'none',
						title: '请输入标题'
					})
					return;
				}
				if (!this.formData.author) {
					uni.showToast({
						icon: 'none',
						title: '请输入来源'
					})
					return;
				}
				if (!this.filecontent1) {
					uni.showToast({
						icon: 'none',
						title: '请选择封面图片'
					})
					return;
				}
				if (!this.filecontent2) {
					uni.showToast({
						icon: 'none',
						title: '请选择资源'
					})
					return;
				}
				uni.showLoading({
					mask: true,
					title:"正在上传资源..."
				})
				this.$refs.filepicker1.upload();
				this.$refs.filepicker2.upload();
			},
			/**
			 * 验证表单并提交
			 */
			submit() {
				this.$refs.form.validate().then((res) => {
					this.value = Object.assign(res, {
						avatar: this.formData.avatar,
						resources: this.formData.resources,
						zy_gs:this.formData.zy_gs,
					});
					return this.submitForm(res);
				}).catch(() => {}).finally(() => {
					uni.hideLoading()
				})
			},

			/**
			 * 提交表单
			 */
			submitForm(value) {
				// 使用 clientDB 提交数据
				value = this.value;
				return db.collection(dbCollectionName).add(value).then((res) => {
					
					uni.showToast({
						icon: 'none',
						title: '新增成功'
					})
					this.getOpenerEventChannel().emit('refreshData');
					// setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				})
			}
		}
	}
</script>

<style>
	.uni-container {
		padding: 15px;
	}

	.uni-input-border,
	.uni-textarea-border {
		width: 100%;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.uni-input-border {
		padding: 0 10px;
		height: 35px;

	}

	.uni-textarea-border {
		padding: 10px;
		height: 80px;
	}

	.uni-button-group {
		margin-top: 50px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
	}

	.uni-button {
		width: 184px;
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 4px;
		line-height: 1;
		margin: 0;
	}
</style>
