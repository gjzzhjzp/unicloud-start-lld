<template>
	<view class="uni-container">
		<u-navbar :is-back="true" title="我的投稿"></u-navbar>
		<view style="margin: 4px 0px;">
			<!-- #ifdef H5 -->
			<u-alert-tips type="warning" description="上传图片附件资源时多张上传请使用APP或QQ浏览器,
	  		其他手机浏览器暂不支持多张同时上传,视频不能上传超过100M的视频,超过100M的视频走外链,上传图片视频等需要等待进度条上传完成提交才有效"></u-alert-tips>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<u-alert-tips type="warning"
				description="注意:视频不能上传超过100M的视频,超过100M的走外链,上传图片视频等需要等待进度条上传完成提交才有效;请注意视频上传时网络不好会导致视频自动压缩">
			</u-alert-tips>
			<!-- #endif -->
		</view>
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="title" label="标题" required>
				<uni-easyinput placeholder="请输入标题" v-model="formData.title" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="author" label="来源" required>
				<uni-easyinput placeholder="请输入来源" v-model="formData.author" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="categorieszw" label="分类">
				<uni-easyinput placeholder="请选择分类" v-model="formData.categorieszw" trim="both" @focus="opencategories">
				</uni-easyinput>
				<yunmiao-cascader :select-value="formData.categories" ref="cascader" value-name="flbm"
					:cascaderData="cascaderData" @confirem="cascaderConfirem"></yunmiao-cascader>
			</uni-forms-item>
			<uni-forms-item name="labels" label="标签">
				<uni-easyinput placeholder="多个标签以逗号隔开" v-model="formData.labels" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="avatar" label="封面大图" required>
				<cloud-image @click="uploadAvatarImg" custom-class="uploadZy" v-if="formData.avatar"
					:src="formData.avatar[0].url" width="300rpx" height="200rpx"></cloud-image>
				<uni-icons @click="uploadAvatarImg" v-else class="chooseAvatar" type="plusempty" size="80"
					color="#F1F1F1"></uni-icons>
				<!-- <uni-file-picker file-mediatype="image" return-type="array" :limit="1" v-model="formData.avatar"></uni-file-picker> -->
			</uni-forms-item>
			<uni-forms-item name="zy_gs" label="资源类型">
				<!-- <easy-select ref="easySelect" size="medium" :value="formData.zy_gs"  :options="formOptions.zy_gs_localdata"></easy-select> -->
				<uni-data-checkbox v-model="formData.zy_gs" :localdata="formOptions.zy_gs_localdata">
				</uni-data-checkbox>
			</uni-forms-item>
			<uni-forms-item name="resources" label="附件资源">
				<template v-if="formData.zy_gs==0||formData.zy_gs==3">
					<uni-file-picker file-mediatype="image" return-type="array" v-model="formData.resources">
					</uni-file-picker>
					<view class="resource-ts">提示：支持PNG,JPG图片格式</view>
				</template>
				<template v-else-if="formData.zy_gs==1">
					<uni-file-picker file-mediatype="video" file-extname="mp4" :limit="1" return-type="array"
						v-model="formData.resources">
					</uni-file-picker>
					<view class="resource-ts">提示：支持MP4格式(注意：网络不好视频会自动压缩)</view>
				</template>
				<!-- #ifdef H5 -->
				<template v-else-if="formData.zy_gs==2">
					<uni-file-picker file-mediatype="all" file-extname="mp3" :limit="1" return-type="array"
						v-model="formData.resources">
					</uni-file-picker>
					<view class="resource-ts">提示：支持MP3格式</view>
				</template>
				<template v-else>
					<uni-file-picker file-mediatype="all" :limit="1" return-type="array" v-model="formData.resources">
					</uni-file-picker>
				</template>
				<!-- #endif -->

				<!-- <template v-if="formData.zy_gs==0">
      		<uni-file-picker file-mediatype="image" return-type="array" v-model="formData.resources">
      		</uni-file-picker>
      	</template>
      	<template v-else>
      		<uni-file-picker file-mediatype="all" :limit="1" return-type="array" v-model="formData.resources">
      		</uni-file-picker>
      	</template> -->
			</uni-forms-item>
			<uni-forms-item name="aliyun_dz" label="外链">
				<uni-easyinput placeholder="请输入外链地址" v-model="formData.aliyun_dz" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="excerpt" label="内容">
				<uni-easyinput placeholder="请输入内容" v-model="formData.excerpt" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="is_grant" label="是否授权">
				<uni-data-checkbox v-model="formData.is_grant" :localdata="formOptions.is_grant_localdata">
				</uni-data-checkbox>
			</uni-forms-item>
			<uni-forms-item name="is_encryption" label="是否加密">
				<uni-data-checkbox v-model="formData.is_encryption" :localdata="formOptions.is_encryption_localdata">
				</uni-data-checkbox>
				<view class="resource-ts" v-show="formData.is_encryption==1">提示：勾选加密代表用户在本平台申请邀请码即可查看详情</view>
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
	} from '../../js_sdk/validator/jz-opendb-resources.js';

	const db = uniCloud.database();
	const dbCollectionName = 'jz-opendb-resources';
	import zycommon from "./zycommon.js"
	import image from "@/pages/ucenter/userinfo/image.js"

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
		mixins: [zycommon, image],
		data() {
			let formData = {
				"author": "",
				"title": "",
				"categories": "",
				"categorieszw": "",
				"labels": "",
				"avatar": null,
				"resources": [],
				"aliyun_dz": "",
				"excerpt": "",
				"is_grant": 0,
				"is_encryption": 0,
				"zy_gs": 0
			}
			return {
				avimage: {
					width: 600,
					height: 400
				},
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
					"zy_gs_localdata": [{
						"value": 0,
						"text": "图片"
					}, {
						"value": 1,
						"text": "视频"
					}, {
						"value": 2,
						"text": "音乐"
					}, {
						"value": 3,
						"text": "文章"
					}],
					"is_encryption_localdata": [{
							"value": 0,
							"text": "不加密"
						},
						{
							"value": 1,
							"text": "加密"
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
			setAvatarFile(avatar_file) {
				console.log("avatar_file", avatar_file);
				// formData.avatar[0].url;
				this.$set(this.formData, "avatar", [avatar_file])
			},
			/**
			 * 验证表单并提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				});
				this.$refs.form.validate().then((res) => {
					// debugger;
					if(this.formData.resources.length==0&&!this.formData.aliyun_dz){
						uni.showToast({
							title:"外链或附件资源必须填一项",
							icon:"none"
						});
						return;
					}
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
				value = Object.assign(value, {
					categories: this.formData.categories,
					avatar: this.formData.avatar,
					last_modify_date:db.env.now
				});
				var config = getApp().globalData.systemconfig;
				if (config["800000"] == "1") {
					// 审核
					value = Object.assign(value, {
						article_status: 0
					});
				} else {
					// 不审核
					value = Object.assign(value, {
						article_status: 1
					});
				}
				return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
					if (config["800000"] == "1") {
						uni.showToast({
							icon: 'none',
							title: '您的投稿已提交，请等待管理员审核'
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: '修改成功'
						});
					}
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
					const data = res.result.data[0]
					if (data) {
						console.log("this.formData", this.formData);
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
	.resource-ts {
		color: red;
		margin-top: 6px;
	}

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
