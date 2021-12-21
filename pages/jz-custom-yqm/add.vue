<template>
	<view class="uni-container uni-yqm">
		<u-navbar :is-back="true" title="申请邀请码"></u-navbar>
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<u-alert type="warning" :description="description"></u-alert>
			<view style="margin-top: 20px;">
				<uni-forms-item name="user_name_type" label="申请个数:">
					<view style="margin-top: 6px;">
						<u-number-box v-model="number" :max="5" :min="1" :size="40"></u-number-box>
					</view>
				</uni-forms-item>
			</view>
			
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">确定</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/jz-custom-yqm.js';

	const db = uniCloud.database();
	const dbCollectionName = 'jz-custom-yqm';

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
				"user_name_type": 0,
				"user_name": "",
				"value": "",
				"status": true
			}
			return {
				number: 1, ///申请个数
				description: "邀请码用于查看加密资源详情，一天最多申请5个，每个邀请码用一次失效，且只能申请账号在申请当天使用，过期失效",
				formData,
				formOptions: {
					"user_name_type_localdata": [{
							"value": 0,
							"text": "微博"
						},
						{
							"value": 1,
							"text": "抖音"
						}
					]
				},
				rules: {
					...getValidator(Object.keys(formData))
				}
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
				// 使用 clientDB 提交数据
				console.log("value", value);
				Object.assign(value, {
					user_id: db.getCloudEnv('$cloudEnv_uid')
				});
				// return ;
				return db.collection(dbCollectionName).add(value).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '已申请，等待管理员审核'
					});
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					});
				});
			}
		}
	}
</script>

<style>
	.uni-yqm {}

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
