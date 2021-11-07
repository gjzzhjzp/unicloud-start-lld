<template>
	<view class="uni-container">
		<u-navbar :is-back="true" title="我的投稿"></u-navbar>
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">

			<uni-forms-item name="title" label="标题" required>
				<uni-easyinput placeholder="请输入标题" v-model="formData.title" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="author" label="作者" required>
				<uni-easyinput placeholder="请输入作者" v-model="formData.author" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="categories" label="分类" required>
				<uni-easyinput placeholder="请选择分类" v-model="formData.categorieszw" trim="both" @focus="opencategories">
				</uni-easyinput>
				<yunmiao-cascader :select-value="formData.categories" ref="cascader" value-name="flbm" :cascaderData="cascaderData"
					@confirem="cascaderConfirem"></yunmiao-cascader>
			</uni-forms-item>
			<uni-forms-item name="labels" label="标签">
				<uni-easyinput placeholder="多个标签以逗号隔开" v-model="formData.labels" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="avatar" label="封面大图" required>
				<uni-file-picker ref="filepicker1" v-model="formData.avatar" fileMediatype="image" mode="grid"
					:auto-upload="false" :limit="1" @select="selectFile" @success="successFile" />
				<!-- <uni-file-picker file-mediatype="image" return-type="object" v-model="formData.avatar">
				</uni-file-picker> -->
			</uni-forms-item>
			<uni-forms-item name="resources" label="附件资源">
				
				<uni-file-picker ref="filepicker2" v-model="formData.resources" fileMediatype="all" mode="grid"
						:auto-upload="false" @select="selectFile2" @success="successFile2" />
				
				<!-- <uni-file-picker file-mediatype="all" return-type="array" v-model="formData.resources">
				</uni-file-picker> -->
			</uni-forms-item>
			<uni-forms-item name="aliyun_dz" label="外链">
				<uni-easyinput placeholder="请输入外链地址"  v-model="formData.aliyun_dz" trim="both">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="excerpt" label="内容">
				<uni-easyinput placeholder="请输入内容" type="textarea" v-model="formData.excerpt" trim="both">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="is_grant" label="是否授权">
				<uni-data-checkbox v-model="formData.is_grant" :localdata="formOptions.is_grant_localdata">
				</uni-data-checkbox>
			</uni-forms-item>
			<uni-forms-item name="is_login" label="是否登录">
				<uni-data-checkbox v-model="formData.is_login" :localdata="formOptions.is_login_localdata">
				</uni-data-checkbox>
			</uni-forms-item>
			<uni-forms-item name="is_encryption" label="是否加密">
				<uni-data-checkbox v-model="formData.is_encryption" :localdata="formOptions.is_encryption_localdata">
				</uni-data-checkbox>
			</uni-forms-item>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submitBefore">提交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import zycommon from "./zycommon.js"
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
		mixins:[zycommon],
		data() {
			let formData = {
				"categories": "",
				"categorieszw": "",
				"labels": "",
				"author": "",
				"title": "",
				"article_status": 0,
				"comment_status": 0,
				"is_grant": 0,
				"is_login": 0,
				"is_encryption": 0,
				// "is_outerchain": 0,
				"avatar": null,
				"resources": [],
				"zy_gs": "",
				"excerpt": "",
				"aliyun_dz":"",
				"content": ""
			}
			return {
				categorieszw: "",
				cascaderData: [],
				formData,
				formOptions: {
					"is_grant_localdata": [{
							"value": 0,
							"text": "未授权"
						},
						{
							"value": 1,
							"text": "已授权"
						}
					],
					"is_login_localdata": [{
							"value": 0,
							"text": "不登录"
						},
						{
							"value": 1,
							"text": "登录"
						}
					],
					"is_encryption_localdata": [{
							"value": 0,
							"text": "不加密"
						},
						{
							"value": 1,
							"text": "加密"
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
				}
			}
		},
		onLoad(e) {
			if (e.id) {
				const id = e.id
				this.formDataId = id
				this.getDetail(id)
			}
		},
		// onReady() {
		// 	this.$refs.form.setRules(this.rules);
		// 	this.getcategories();
		// },
		methods: {
			/**
			 * 验证表单并提交
			 */
			submit() {
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
					categories: this.formData.categories
				});
				console.log("submitForm", value);
				// return;
				return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '修改成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				})
			},

			/**
			 * 获取表单数据
			 * @param {Object} id
			 */
			getDetail(id) {
				uni.showLoading({
					mask: true
				})
				db.collection(dbCollectionName).doc(id).get().then((res) => {
					const data = res.result.data[0];
					console.log("data", data);
					if (data) {
						this.formData = Object.assign({
							"is_grant": 0,
							"is_login": 0,
							"is_encryption": 0,
						}, data);
						this.old_zy=JSON.parse(JSON.stringify(this.formData));
					}
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					});
				}).finally(() => {
					uni.hideLoading()
				});
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
