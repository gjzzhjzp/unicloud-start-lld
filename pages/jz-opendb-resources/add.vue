<template>
	<view class="uni-container">
		<u-navbar :is-back="true" title="我要投稿"></u-navbar>
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="title" label="标题" required>
				<uni-easyinput placeholder="请输入标题" v-model="formData.title" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="author" label="作者" required>
				<uni-easyinput placeholder="请输入作者" v-model="formData.author" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="categorieszw" label="分类" required>
				<uni-easyinput placeholder="请选择分类" v-model="formData.categorieszw" trim="both" @focus="opencategories">
				</uni-easyinput>
				<yunmiao-cascader ref="cascader" value-name="flbm" :cascaderData="cascaderData"
					@confirem="cascaderConfirem"></yunmiao-cascader>
				<!-- <uni-data-picker self-field="_id" parent-field="parent_id" v-model="formData.categories" collection="opendb-news-categories"></uni-data-picker> -->
			</uni-forms-item>
			<uni-forms-item name="labels" label="标签">
				<uni-easyinput placeholder="多个标签以逗号隔开" v-model="formData.labels" trim="both"></uni-easyinput>
			</uni-forms-item>
			<!--   <uni-forms-item name="article_status" label="文章状态">
        <uni-data-checkbox v-model="formData.article_status" :localdata="formOptions.article_status_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="comment_status" label="开放评论">
        <uni-data-checkbox v-model="formData.comment_status" :localdata="formOptions.comment_status_localdata"></uni-data-checkbox>
      </uni-forms-item> -->
			<uni-forms-item name="avatar" label="封面大图" required>
				<uni-file-picker ref="filepicker1" v-model="formData.avatar" fileMediatype="image" mode="grid"
					:auto-upload="false" :limit="1" @select="selectFile" @success="successFile" />
				<!-- <uni-file-picker file-mediatype="image" return-type="object" v-model="formData.avatar"></uni-file-picker> -->
			</uni-forms-item>
			<uni-forms-item name="resources" label="附件资源" required>
				<uni-file-picker ref="filepicker2" v-model="formData.resources" fileMediatype="all" mode="grid"
					:auto-upload="false" @select="selectFile2" @success="successFile2" />
				<!-- <uni-file-picker file-mediatype="all" return-type="array" v-model="formData.resources"></uni-file-picker> -->
			</uni-forms-item>
			<!-- <uni-forms-item name="zy_gs" label="资源格式">
        <uni-easyinput placeholder="资源格式，如img图集,text文章，MP3音乐，mp4视频" v-model="formData.zy_gs"></uni-easyinput>
      </uni-forms-item> -->
			<uni-forms-item name="excerpt" label="简介">
				<uni-easyinput placeholder="请输入简介" type="textarea" v-model="formData.excerpt" trim="both">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="is_grant" label="是否授权">
			  <uni-data-checkbox v-model="formData.is_grant" :localdata="formOptions.is_grant_localdata"></uni-data-checkbox>
			</uni-forms-item>
			<!-- <uni-forms-item name="content" label="内容">
        <uni-easyinput placeholder="请输入内容" v-model="formData.content" trim="right"></uni-easyinput>
      </uni-forms-item> -->
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submitBefore">提交</button>
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
				"categories": "",
				"categorieszw":"",
				"labels": "",
				"author": "",
				"title": "",
				"article_status": 0,
				"comment_status": 0,
				"is_grant":0,
				"avatar": null,
				"resources": [],
				"zy_gs": "",
				"excerpt": "",
				"content": ""
			}
			return {
				categorieszw: "",
				cascaderData: [],
				formData,
				formOptions: {
					"is_grant_localdata": [
					  {
					    "value": 0,
					    "text": "未授权"
					  },
					  {
					    "value": 1,
					    "text": "已授权"
					  }
					],
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
				filesuccess2: 0
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules);
			this.getcategories();
		},
		methods: {
			selectFile(parames) {
				console.log("parames", parames);
				this.$set(this.formData, "avatar", parames.tempFiles[0])
			},
			successFile(parames) {
				console.log("parames1111111", parames);
				this.$set(this.formData, "avatar", parames.tempFiles[0]);
				this.filesuccess1 = 1;
				if (this.filesuccess2 == 1) {
					this.submit();
				}
			},
			selectFile2(parames) {
				console.log("qqqqqqq", parames);
				this.$set(this.formData, "resources", parames.tempFiles);
				var zy_gs = "";
				if (parames.tempFiles.length > 0) {
					zy_gs = parames.tempFiles[0].extname;
				}
				this.$set(this.formData, "zy_gs", zy_gs);
			},
			successFile2(parames) {
				console.log("parames1222", parames);
				this.$set(this.formData, "resources", parames.tempFiles);
				this.filesuccess2 = 1;
				if (this.filesuccess1 == 1) {
					this.submit();
				}
			},
			// 获取分类
			async getcategories() {
				var categories = await db.collection("opendb-news-categories").get({
					getTree: {
						startWith: "flbm=='100000'" ////分类顶级编码
					}
				});
				console.log("categories", categories);
				if (categories.result && categories.result.data.length > 0) {
					this.cascaderData = categories.result.data;
				}
			},
			cascaderConfirem(e) {
				var select_names = e.select_names;
				var select_ids = e.select_ids;
				this.$set(this.formData, "categories", select_ids.join(","));
				this.$set(this.formData, "categorieszw", select_names.join(","));
			},
			opencategories() {
				this.$refs.cascader.show();
			},
			submitBefore() {
				if (!this.formData.title) {
					uni.showToast({
						icon: 'none',
						title: '请输入标题'
					});
					return;
				}
				if (!this.formData.author) {
					uni.showToast({
						icon: 'none',
						title: '请输入作者'
					})
					return;
				}
				if (!this.formData.categories) {
					uni.showToast({
						icon: 'none',
						title: '请选择分类'
					})
					return;
				}
				if (!this.formData.avatar) {
					uni.showToast({
						icon: 'none',
						title: '请上传封面'
					})
					return;
				}
				if (!this.formData.resources || this.formData.resources.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请上传资源'
					})
					return;
				}
				this.$refs.filepicker1.upload();
				this.$refs.filepicker2.upload();
			},
			/**
			 * 验证表单并提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.validate().then((res) => {
					return this.submitForm(res)
				}).catch(() => {}).finally(() => {
					uni.hideLoading()
				})
			},

			/**
			 * 提交表单
			 */
			submitForm(value) {
				// 使用 clientDB 提交数据
				Object.assign(value, {
					zy_gs: this.formData.zy_gs,
					categories:this.formData.categories
				})
				console.log("submitForm", value);
				// return;
				return db.collection(dbCollectionName).add(value).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '新增成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
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
