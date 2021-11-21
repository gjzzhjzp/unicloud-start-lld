<template>
	<view>
		<view class="jz-sy-list-section">
			<u-section line-color="#7275D3" :title="title" :right="true" sub-title="查看更多>>" :arrow="false"
				@click="tomore"></u-section>
		</view>
		<view class="jz-sy-list">
			<template v-show="!isEmpty">
				<u-row gutter="4">
					<u-col span="4" class="jz-sy-item" v-for="(item,index) in list" :key="index">
						<view class="jz-sy-list-item" @click="toDetail(item)">
							<view>
								<u-lazy-load  threshold="300" height="140rpx" border-radius="10" img-mode="aspectFill" :image="imageUrl(item)"></u-lazy-load>
								
								<!-- <u-image width="100%" height="140rpx" border-radius="10" :src="imageUrl(item)">
								</u-image> -->
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
			}
		},
		mixins: [yqm],
		mounted() {
			// this.where = 'article_status==1';
			this.getList();
		},
		methods: {
			imageUrl(item){
				if(Array.isArray(item.avatar)){
					return item.avatar[0].url;
				}else{
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
				var param= {
							type: this.type,
							label: this.label,
							zy_gs: [0, 1, 3],
							page: 1,
							rows: 6
						}
				console.log("param",param);
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'resource/getList',
						data:param
					},
				}).then((res) => {
					var res = res.result;
					console.log("res", res)
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
		margin: 6px 4px;
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
		margin: 10rpx 0px;
	}
</style>
