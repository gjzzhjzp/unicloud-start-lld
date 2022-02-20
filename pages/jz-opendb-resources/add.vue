<template>
	<view class="jz-resources-add">
		<u-navbar v-if="showtitle" :is-back="true" title="我要投稿"></u-navbar>
		<view style="margin: 4px 0px;">
			<u-alert-tips type="warning" description="注意:视频不能上传超过100M的视频,超过100M的视频走外链,上传图片视频等需要等待进度条上传完成提交才有效">
			</u-alert-tips>
		</view>
		<view class="jz-container">
			<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
				<uni-forms-item name="title" label="标题" required>
					<uni-easyinput placeholder="请输入标题" v-model="formData.title" trim="both"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="author" label="来源" required>
					<uni-easyinput placeholder="请输入来源" v-model="formData.author" trim="both"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="categorieszw" label="分类">
					<uni-easyinput placeholder="请选择分类" v-model="formData.categorieszw" trim="both"
						@focus="opencategories">
					</uni-easyinput>
					<yunmiao-cascader ref="cascader" value-name="flbm" :cascaderData="cascaderData"
						@confirem="cascaderConfirem"></yunmiao-cascader>
						<view class="resource-ts">请尽可能多的选择相对应分类，若没有相对应分类请在标签中写详细</view>
				</uni-forms-item>
				<uni-forms-item name="labels" label="标签">
					<uni-easyinput placeholder="多个标签以逗号隔开" v-model="formData.labels" trim="both"></uni-easyinput>
					<view class="resource-ts">多个标签以逗号隔开，请写详细标签方便查找</view>
				</uni-forms-item>
				<uni-forms-item name="avatar" label="封面大图" required>
					<!-- formData.avatar：{{formData.avatar}} -->
					<cloud-image @click="uploadAvatarImg" custom-class="uploadZy" v-if="formData.avatar"
						:src="avatarUrl()" width="300rpx" height="200rpx" @change="changeSrc"></cloud-image>
					<uni-icons @click="uploadAvatarImg" v-else class="chooseAvatar" type="plusempty" size="80"
						color="#F1F1F1"></uni-icons>
					<!-- <uni-file-picker file-mediatype="image" return-type="array" :limit="1" v-model="formData.avatar">
						</uni-file-picker> -->
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
						<view class="resource-ts">支持PNG,JPG图片格式(注意：部分手机不能多选上传图片，可联系申请后台上传)</view>
					</template>
					<template v-else-if="formData.zy_gs==1">
						<uni-file-picker file-mediatype="video" file-extname="mp4" :limit="1" return-type="array"
							v-model="formData.resources">
						</uni-file-picker>
						<view class="resource-ts">支持MP4格式，超过100M的视频请微博私信小宇宙</view>
					</template>
					<!-- #ifdef H5 -->
					<template v-else-if="formData.zy_gs==2">
						<uni-file-picker file-mediatype="all" file-extname="mp3" :limit="1" return-type="array"
							v-model="formData.resources">
						</uni-file-picker>
						<view class="resource-ts">支持MP3格式</view>
					</template>
					<template v-else>
						<uni-file-picker file-mediatype="all" :limit="1" return-type="array"
							v-model="formData.resources">
						</uni-file-picker>
					</template>
					<!-- #endif -->
				</uni-forms-item>
				<uni-forms-item name="aliyun_dz" label="外链">
					<uni-easyinput placeholder="http://" v-model="formData.aliyun_dz" trim="both"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="excerpt" label="内容">
					<uni-easyinput placeholder="请输入内容" type="textarea" v-model="formData.excerpt" trim="both">
					</uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="is_grant" label="是否授权">
					<uni-data-checkbox v-model="formData.is_grant" :localdata="formOptions.is_grant_localdata">
					</uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item name="is_encryption" label="是否加密">
					<uni-data-checkbox v-model="formData.is_encryption"
						:localdata="formOptions.is_encryption_localdata">
					</uni-data-checkbox>
					<view class="resource-ts" v-show="formData.is_encryption==1">勾选加密代表用户在本平台申请邀请码即可查看详情</view>
				</uni-forms-item>
				<view class="resource-ts">
					请等待附件资源上传完毕后再提交
				</view>
				<view class="uni-button-group">
					<u-button type="primary" class="uni-button" @click="submit">提交</u-button>
				</view>
			</uni-forms>
		</view>
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
	let formData1={
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

					// "zy_gs_localdata": [{
					// 	"value": 0,
					// 	"text": "图片"
					// }, {
					// 	"value": 1,
					// 	"text": "视频"
					// }, {
					// 	"value": 2,
					// 	"text": "音乐"
					// }, {
					// 	"value": 3,
					// 	"text": "文章"
					// }],


					"zy_gs_localdata": [{
						"value": 0,
						"text": "图片"
					}, {
						"value": 1,
						"text": "视频"
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
		mounted() {
			this.initrules();
		},
		props: {
			showtitle: {
				type: Boolean,
				default () {
					return true
				}
			},
			tosuccess: {
				type: String,
				default () {
					return ""
				}
			}
		},
		methods: {
			avatarUrl(){
				// debugger;
				if(this.formData&&this.formData.avatar&&this.formData.avatar[0]){
					return this.formData.avatar[0].url;
				}else{
					return "";
				}
			},
			changeSrc(src){
				// debugger;
				this.$set(this.formData.avatar[0],"url",src);
			},
			initrules(){
				// debugger;
				this.formData=JSON.parse(JSON.stringify(formData1));
				this.$refs.form.setRules(this.rules)
			},
			setAvatarFile(avatar_file) {
				// console.log("avatar_file", avatar_file);
				// formData.avatar[0].url;
				this.$set(this.formData, "avatar", [avatar_file])
			},
			/**
			 * 验证表单并提交
			 */
			submit() {
				// debugger;
				// console.log("value", this.formData);
				uni.showLoading({
					mask: true
				});
				this.$refs.form.validate().then((res) => {
					// debugger;
					if (this.formData.resources.length == 0 && !this.formData.aliyun_dz) {
						uni.showToast({
							title: "外链或附件资源必须填一项",
							icon: "none"
						});
						return;
					}
					return this.submitForm(res)
				}).catch(() => {}).finally(() => {
					uni.hideLoading()
				});
			},

			/**
			 * 提交表单
			 */
			submitForm(value) {
				// 使用 clientDB 提交数据
				value = Object.assign(value, {
					categories: this.formData.categories,
					avatar:this.formData.avatar
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
				// console.log("value222222222222222",value);
				return db.collection(dbCollectionName).add(value).then((res) => {
					if (config["800000"] == "1") {
						uni.showToast({
							icon: 'none',
							title: '您的投稿已提交，请等待管理员审核'
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: '投稿成功'
						});
					}
					this.$emit("success");
					if (this.tosuccess) {
						setTimeout(() => {
							uni.navigateTo({
								url: this.tosuccess
							});
							this.formData=formData1;
						}, 500)
					} else {
						this.getOpenerEventChannel().emit('refreshData')
						setTimeout(() => {
							uni.navigateBack();
							this.formData=formData1;
						}, 500)
					}

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

	.checklist-box {
		margin-right: 15px;
	}

	.chooseAvatar {
		border: 1px solid #F1F1F1;
	}
</style>
