<template>
	<view class=" jz-container jz-sy-youxi">
		<view class="jz-sy-youxi-section">
			<u-section line-color="#7275D3" :show-line="false" :font-size="16" title="合成大西瓜" :right="showright" sub-title="查看更多>>"
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
								<u-image width="100px" height="100px" border-radius="20" :src="imageUrl(item)"
									loading-icon="/static/center/zheng.png" error-icon="/static/center/error_zheng.png">
								</u-image>
							</view>
						</view>
						<view class="jz-sy-youxi-text">{{item.name}}</view>
					</view>
				</u-col>
			</u-row>
			<u-modal v-model="showmodal" title="选择游戏模式" :show-confirm-button="false" :mask-close-able="true"
				:show-cancel-button="true">
				<view style="margin: 30px 20px 20px 20px;">
					<u-button @click="wudihref()">
						<!-- <u-link :href="wudihref()" color="rgb(114, 117, 211)"> -->
						无敌跳跳版
						<!-- </u-link> -->
					</u-button>
				</view>
				<view style="margin: 20px;">
					<u-button @click="putonghref()">
						<!-- <u-link :href="putonghref()" color="rgb(114, 117, 211)"> -->
						普通版
						<!-- </u-link> -->
					</u-button>
				</view>
			</u-modal>
			<u-toast ref="uToast" />
		</view>
		<view class="jz-sy-youxi-section">
			<u-section line-color="#7275D3" :show-line="false" :font-size="16" title="龚张小游戏" :right="showright" sub-title="查看更多>>"
				:arrow="false" @click="$notMoreTap(tomore,'notTap')"></u-section>
		</view>
		<view class="jz-sy-youxi">
			<u-row gutter="16">
				<u-col span="6" class="jz-sy-item" v-for="(item,index) in list1" :key="index">
					<view class="jz-sy-youxi-item">
						<view>
							<view @click="todetail1(item)">
								<u-image width="100px" height="100px" border-radius="20" :src="imageUrl(item)"
									loading-icon="/static/center/zheng.png" error-icon="/static/center/error_zheng.png">
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
				showmodal: false,
				notTap: true, //一定要设置为true
				list: [],
				list1:[],
				where: "",
				isEmpty: true,
				curitem: {}
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
					return false
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
			todetail1(item){
				// debugger;
				if (item.path) {
					var host=window.location.protocol+"//"+window.location.host;
					var path=host+item.path;
					uni.navigateTo({
						url: "/pages/youxidetail/youxidetail?src=" + encodeURIComponent(path)
					})
				}
			},
			todetail(item) {
				// debugger;
				this.showmodal = true;
				this.curitem = item;
				// uni.navigateTo({
				// 	url: "/pages/youxidetail/youxidetail?src=" + item.path
				// })
			},
			wudihref() {
				if (this.curitem.path) {
					// debugger;
					var host=window.location.protocol+"//"+window.location.host;
					var path=host+this.curitem.path + "?tiaotiao=1";
					// var path=this.curitem.path + "?tiaotiao=1";
					uni.navigateTo({
						url: "/pages/youxidetail/youxidetail?src=" + encodeURIComponent(path)
					})
				}

				// return this.curitem.path+"?tiaotiao=1";
			},
			putonghref() {
				if (this.curitem.path) {
					// var path=this.curitem.path + "?tiaotiao=0";
					var host=window.location.protocol+"//"+window.location.host;
					var path=host+this.curitem.path + "?tiaotiao=0";
					uni.navigateTo({
						url: "/pages/youxidetail/youxidetail?src=" + encodeURIComponent(path)
					})
				}
				// return this.curitem.path+"?tiaotiao=0";
			},
			imageUrl(item) {
				if (Array.isArray(item.icon)) {
					return item.icon[0].url;
				} else {
					return item.icon.url;
				}
			},
			async getList() {
				var db = uniCloud.database();
				var categories = await db.collection("opendb-news-categories").get({
					getTree: {
						startWith: "flbm=='300000'||flbm=='500000'" ////分类顶级编码
					}
				});
				console.log("categories.result",categories.result);
				if (categories.result && categories.result.data.length > 0) {
					this.list = categories.result.data[0].children;
					if(categories.result.data[1]){
						this.list1 = categories.result.data[1].children;
					}
				}
			},
		}
	}
</script>
<style lang="scss">
	.jz-sy-item {
		padding: 0px 20rpx !important;
	}

	.jz-sy-youxi {
		margin-top: 20rpx;
	}

	.jz-sy-youxi-item {
		margin: 20rpx 0px;
		width: 100%;
		text-align: center;
	}

	.u-image {
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
