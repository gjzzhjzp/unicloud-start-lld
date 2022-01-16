<template>
	<view class="uni-container">
		<u-navbar :is-back="true" title="我的发帖"></u-navbar>
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="title" label="标题" required>
				<uni-easyinput placeholder="请输入标题" v-model="formData.title" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="categories" label="分类">
				<uni-easyinput placeholder="分类" v-model="formData.categories" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="excerpt" label="详情">
				<uni-easyinput placeholder="请输入详情" type="textarea" :maxlength="200" v-model="formData.excerpt" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="resources" label="图片">
				<uni-file-picker file-mediatype="image" :limit="9" return-type="array" v-model="formData.resources">
				</uni-file-picker>
			</uni-forms-item>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/jz-opendb-taolun.js';

	const db = uniCloud.database();
	const dbCollectionName = 'jz-opendb-taolun';

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
				"title": "",
				"categories": 0,
				"article_status": 0,
				"resources": [],
				"last_modify_date": null,
				"excerpt": "",
				"is_recommend": 0,
				"is_off": 0
			}
			return {
				formData,
				formOptions: {
					"categories_localdata": [
					  {
					    "value": 0,
					    "text": "闲聊"
					  },
					  {
					    "value": 1,
					    "text": "磕糖"
					  },
					  {
					    "value": 2,
					    "text": "分享"
					  },
					  {
					    "value": 3,
					    "text": "其他"
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
					"is_recommend_localdata": [{
							"value": 0,
							"text": "不推荐"
						},
						{
							"value": 1,
							"text": "推荐"
						}
					],
					"is_off_localdata": [{
							"value": 0,
							"text": "不下架"
						},
						{
							"value": 1,
							"text": "下架"
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
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
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
				var config = getApp().globalData.systemconfig;
				if (config["800030"] == "1") {
					// 审核发帖审核
					value = Object.assign(value, {
						article_status: 0
					});
				} else {
					// 不审核
					value = Object.assign(value, {
						article_status: 1
					});
				}
				// 使用 clientDB 提交数据
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
				db.collection(dbCollectionName).doc(id).field(
					"title,categories,categorieszw,article_status,resources,last_modify_date,excerpt,is_recommend,is_off"
				).get().then((res) => {
					const data = res.result.data[0]
					if (data) {
						this.formData = data
					}
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
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
