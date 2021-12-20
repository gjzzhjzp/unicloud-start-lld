<template>
	<view>
		<view class="jz-sy-list-section">
			<u-row justify="space-between" >
				<u-col span="3">
					<u--text size="15" :text="title" :bold="true"></u--text>
				</u-col>
				<u-col span="3" class="space-between-right" justify="flex-end">
					<u--text size="15" type="info" text="查看更多>>" @click="$notMoreTap(tomore,'notTap')"></u--text>
				</u-col>
			</u-row>
		</view>
		<view class="jz-sy-list">
			<template v-show="!isEmpty">
				<u-grid :border="false" col="2">
					<u-grid-item v-for="(item,index) in list" :key="index">
						<view class="jz-sy-list-item" @click="$notMoreTap(toDetail,'notTap',item)">
							<view class="jz-sy-list-image">
								<!-- <o-lazy-load threshold="300" height="200rpx" border-radius="10" img-mode="aspectFill"
				               			:image="imageUrl(item)"></o-lazy-load> -->
								<u-image width="100%" height="200rpx" radius="6" :src="imageUrl(item)">
								</u-image>
							</view>
							<view class="jz-sy-list-text">{{item.title}}</view>
						</view>
					</u-grid-item>
				</u-grid>
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
					uni.navigateTo({
						url: '/pages/resource/list?type=' + this.type
					});
				} else {
					uni.navigateTo({
						url: '/pages/resource/list?title=' + this.title
					});
				}
			},
			getList() {
				var app_bbh = "115";
				//#ifdef APP-PLUS
				app_bbh = plus.runtime.versionCode;
				//#endif
				var param = {
					type: this.type,
					label: this.label,
					zy_gs: [0, 1, 3],
					page: 1,
					rows: 4,
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
						} else {
							this.isEmpty = true;
						}
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						});
					}
				});
			},
		}
	}
</script>
<style lang="scss">
	.jz-sy-list-item {
		width: 100%;
	}
	.jz-sy-list-image{
		padding: 6px 4px;
		
	}
	.jz-sy-list-text {
		color: $u-type-primary;
		padding: 6px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.jz-sy-list-section {
		margin: 14rpx 0px;
	}
</style>
