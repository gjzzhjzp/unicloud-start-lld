<template>
	<view>
		<view class="jz-sy-list-section">
			<u-section line-color="#7275D3" :font-size="32" :title="title" :right="showright" sub-title="查看更多>>"
				:arrow="false" @click="$notMoreTap(tomore,'notTap')"></u-section>
		</view>
		<view class="jz-sy-list">
			<template v-if="!isEmpty">
				<u-row gutter="16">
					<u-col span="6" class="jz-sy-item" v-for="(item,index) in list" :key="index">
						<view class="jz-sy-list-item" @click="$notMoreTap(toDetail,'notTap',item)">
							<view>
								<!-- <image-storage :src="imageUrl(item)" height="100px" width="100%" :customStyle="{borderRadius:'6px'}" mode="aspectFill"></image-storage> -->
								<!-- <u-lazy-load threshold="300" height="100px" border-radius="10" img-mode="aspectFill"
									:image="imageUrl(item)"></u-lazy-load> -->
								<u-image width="100%" height="200rpx" border-radius="10" :src="imageUrl(item)"
									loading-icon="/static/center/chang1.png"
									error-icon="/static/center/error_chang.png">
								</u-image>
							</view>
							<view class="jz-sy-list-text">{{item.title}}</view>
						</view>
					</u-col>
				</u-row>
			</template>
			<template v-if="isEmpty">
				<u-empty text="数据为空" mode="list"></u-empty>
			</template>
			<u-modal v-model="showmodel" title="输入邀请码" :show-cancel-button="true" @confirm="confirm">
				<view class="slot-content" style="padding: 10px;">
					<view style="margin-bottom: 8px;">
						<u-alert-tips type="warning" description="个人中心>>我的邀请码中可申请邀请码"></u-alert-tips>
					</view>
					<u-input v-model="yqm" type="text" :border="true" placeholder="请输入邀请码" />
				</view>
			</u-modal>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>
<script>
	import yqm from "./yqm.js"
	export default {
		data() {
			return {
				notTap: true, //一定要设置为true
				list: [],
				where: "",
				isEmpty: true
			}
		},
		props: {
			rows: {
				type: Number,
				default () {
					return 4
				}
			},
			// 类型，热门还是最新
			type: {
				type: String,
				default () {
					return ""
				}
			},
			// 标签
			label: {
				type: String,
				default () {
					return ""
				}
			},
			title: {
				type: String,
				default () {
					return ""
				}
			},
			showright: {
				type: Boolean,
				default () {
					return true
				}
			},
			zy_gs: {
				type: Number,
				default () {
					return undefined
				}
			},
			categories: {
				type: String,
				default () {
					return ""
				}
			},
			ignore: {
				type: String,
				default () {
					return ""
				}
			}
		},
		mixins: [yqm],
		mounted() {
			// this.where = 'article_status==1';
			this.getList();
		},
		methods: {
			imageUrl(item) {
				if (Array.isArray(item.avatar)) {
					return item.avatar[0].url;
				} else {
					return item.avatar.url;
				}
			},
			tomore() {
				if (this.type) {
					if (this.type == "tj") {
						uni.navigateTo({
							url: '/pages/moretj/moretj'
						});
					} else {
						uni.navigateTo({
							url: '/pages/resource/list?type=' + this.type
						});
					}
				} else {
					uni.navigateTo({
						url: '/pages/resource/list?title=' + this.title
					});
				}
			},
			getList() {
				var app_bbh = "115";
				if (typeof plus != "undefined") {
					//#ifdef APP-PLUS
					app_bbh = plus.runtime.versionCode;
					//#endif
				}
				var param = {
					type: this.type,
					label: this.label,
					zy_gs: [0, 1, 3],
					page: 1,
					rows: this.rows || 4,
					app_bbh: app_bbh
				}
				if (typeof this.zy_gs != "undefined") {
					Object.assign(param, {
						zy_gs: this.zy_gs
					});
				}
				if (this.categories) {
					Object.assign(param, {
						categories: this.categories
					});
				}
				if (this.ignore) {
					Object.assign(param, {
						ignore: this.ignore
					});
				}
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'resource/getList',
						data: param
					},
				}).then((res) => {
					var res = res.result;
					if (res.state == "0000") {
						this.list = res.rows;
						if (this.list.length > 0) {
							this.isEmpty = false;
							// if (this.type == "tj") {
							// 	this.list.unshift({
							// 		"_id": "61aee1840d111e00012bf162",
							// 		"article_status": 1,
							// 		"zy_gs": 1,
							// 		"publish_date": 1638850948344,
							// 		"last_modify_date": 1641298665437,
							// 		"is_grant": 0,
							// 		"is_encryption": 0,
							// 		"is_recommend": 0,
							// 		"author": "俊哲宇宙APP",
							// 		"title": "投稿教程",
							// 		"avatar": [{
							// 			"extname": "jpg",
							// 			"name": "zyimage1638850857812",
							// 			"url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3a72b088-8226-498e-a9cc-a695d0ed4ce7/c521d686-d0e7-4dae-8206-d6e80c4448c3.",
							// 			"path": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3a72b088-8226-498e-a9cc-a695d0ed4ce7/c521d686-d0e7-4dae-8206-d6e80c4448c3."
							// 		}]
							// 	})
							// 	this.list.unshift({
							// 		"_id": "61ca6e97344587000187e9b2",
							// 		"article_status": 1,
							// 		"zy_gs": 0,
							// 		"publish_date": 1640656535652,
							// 		"last_modify_date": 1641298663223,
							// 		"is_grant": 1,
							// 		"is_encryption": 0,
							// 		"is_recommend": 0,
							// 		"author": "俊哲宇宙APP",
							// 		"title": "投稿规则（试用版）",
							// 		"avatar": [{
							// 			"extname": "jpg",
							// 			"name": "zyimage1640656499956",
							// 			"url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3a72b088-8226-498e-a9cc-a695d0ed4ce7/b80c8e52-08ae-4201-a8f1-fc9bc1f54e0e.",
							// 			"path": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3a72b088-8226-498e-a9cc-a695d0ed4ce7/b80c8e52-08ae-4201-a8f1-fc9bc1f54e0e."
							// 		}]
							// 	})
							// }
						} else {
							this.isEmpty = true;
						}
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						});
					}
				}).catch((err) => {
					console.log("网络错误，请重试——err", err);
					uni.showModal({
						content: err.message || '网络错误，请重试',
						showCancel: false
					});
				});
			},
		}
	}
</script>
<style lang="scss">
	.jz-sy-item {
		padding: 0px 12rpx !important;
	}

	.jz-sy-list-item {
		margin: 6px 0px;
		width: 100%;
	}

	.jz-sy-list-text {
		color: $u-type-primary;
		margin-top: 10rpx;
		margin-left: 10rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.jz-sy-list-section {
		margin: 14rpx 0px;
	}
</style>
