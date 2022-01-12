<template>
	<view class=" jz-container">
		<view class="jz-sy-youxi-section">
			<u-section line-color="#7275D3" :font-size="32" :title="title" :right="showright" sub-title="查看更多>>"
				:arrow="false" @click="$notMoreTap(tomore,'notTap')"></u-section>
		</view>
		<view class="jz-sy-youxi">
			<u-row gutter="16">
				<u-col span="6" class="jz-sy-item" v-for="(item,index) in list" :key="index">
					<view class="jz-sy-youxi-item">
						<view>
							<!-- <u-link :href="item.path">
								<u-image width="200rpx" height="200rpx" border-radius="20" :src="imageUrl(item)"
									loading-icon="/static/center/chang1.png" error-icon="/static/center/error_chang.png">
								</u-image>
							</u-link> -->
							<view @click="todetail(item)">
								<u-image width="200rpx" height="200rpx" border-radius="20" :src="imageUrl(item)"
									loading-icon="/static/center/chang1.png" error-icon="/static/center/error_chang.png">
								</u-image>
							</view>
						</view>
						<view class="jz-sy-youxi-text">{{item.name}}</view>
					</view>
				</u-col>
			</u-row>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>
<script>
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
		mounted() {
			this.getList();
		},
		methods: {
			todetail(item){
				uni.navigateTo({
					url:"/pages/youxidetail/youxidetail?src="+item.path
				})
			},
			imageUrl(item) {
				if (Array.isArray(item.icon)) {
					return item.icon[0].url;
				} else {
					return item.icon.url;
				}
			},
			async getList() {
				var db=uniCloud.database();
				var categories=await db.collection("opendb-news-categories").get({
					getTree:{
						startWith:"flbm=='300000'"////分类顶级编码
					}
				});
				console.log("categories",categories);
				if(categories.result&&categories.result.data.length>0){
					this.list=categories.result.data[0].children;
				}
				console.log("this.list",this.list);
			},
		}
	}
</script>
<style lang="scss">
	.jz-sy-item {
		padding: 0px 20rpx !important;
	}
.jz-sy-youxi{
	margin-top: 20rpx;
}
	.jz-sy-youxi-item {
		margin: 20rpx 0px;
		width: 100%;
		text-align: center;
	}
	.u-image{
		margin: 0 auto;
	}

	.jz-sy-youxi-text {
		color: $u-type-primary;
		margin-top: 20rpx;
		margin-left: 10rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: center;
	}

	.jz-sy-youxi-section {
		margin: 14rpx 0px;
	}
</style>
