<template>
	<view class="wrap">
		<u-navbar :is-back="true" title="广场"></u-navbar>
		<view>
			<u-tabs active-color="#7275D3" bar-width="0" :list="tabslist" :is-scroll="false" :current="currenttab"
				@change="changeTabs"></u-tabs>
		</view>
		<view class="search-row">
			<view :class="['search-row-col',item.selected?'selected':'']" v-for="(item,index) in searchrows"
				:key="index" @click="searchType(item)">{{item.name}}
				<u-icon size="20" name="arrow-down-fill"></u-icon>
			</view>
		</view>
		<view v-if="showTag" style="margin-left: 10px;">
			<u-tag :text="tagname" mode="light" closeable :show="showTag" @close="closetagClick" />
		</view>
		<view >
			<item-list :list="flowList"></item-list>
		</view>
		<!-- <template v-if="currenttab!=2"> -->
			<template v-if="isEmpty">
				<view style="margin-top: 100rpx;">
					<u-empty text="数据为空" mode="list"></u-empty>
				</view>
			</template>
			<template v-else>
				<u-loadmore :status="loadStatus" @loadmore="loadmoreList"></u-loadmore>
			</template>
		<!-- </template> -->
		<u-back-top :scroll-top="scrollTop" top="1000" mode="square" icon="arrow-up" tips="顶部"></u-back-top>
	</view>
</template>
<script>
	import itemList from "./item-list.vue"
	// import search from "../list/search/search.js"
	export default {
		data() {
			return {
				tagname: "", ////tag标签
				showTag: false,
				keyword: "",
				scrollTop: 0,
				loadStatus: 'loadmore',
				flowList: [],
				list: [],
				categories: "", ///分类编码
				title: "列表", ///列表
				tabslist: [{
					name: '全部',
					type: "0"
				}, {
					name: '闲聊',
					type: "1"
				}, {
					name: '磕糖',
					type: "2"
				}, {
					name: '分享',
					type: "3"
				}, {
					name: '其他',
					type: "4"
				}],
				currenttab: 0,
				searchrows: [{
						name: "最新内容",
						type: "zx",
						selected: true
					},
					{
						name: "热门内容",
						type: "rm",
						selected: false
					},
					{
						name: "收藏量高",
						type: "sc",
						selected: false
					}
				],
				type: "zx",
				reset: false, ///重置
				isEmpty: false,
				zy_gs: "0", ////资源格式
				param: {
					page: 1,
					rows: 16
				},
				// curuser:""////当前用户
			}
		},
		// mixins: [search],
		components: {
			itemList
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.resetlist();
			uni.stopPullDownRefresh();
		},
		created() {
			var e = this.$Route.query;
			if (e.flmc && e.flbm) {
				this.showTag = true;
				this.tagname = e.flmc;
				this.categories = e.flbm || "";
			}
			// this.categories = e.categories || "";
			this.type = e.type || "zx";
			if (e.type) {
				this.searchrows.forEach((item) => {
					if (item.type == this.type) {
						this.$set(item, "selected", true);
					} else {
						this.$set(item, "selected", false);
					}
				})
			}
			this.keyword = getApp().globalData.searchText;
			getApp().globalData.searchText = '';
			if (!this.keyword) {
				this.keyword = e.title || "";
			}
			// debugger;
			if (!this.keyword && e.user) {
				this.keyword = e.user || "";
				this.dvalue = 2;
				this.dtitle="用户";
			}
			
			this.addRandomData();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
			// debugger;
			if (this.loadStatus == 'loadmore') {
				this.loadStatus = 'loading';
				this.reset = false;
				this.addRandomData();
			}
		},
		methods: {
			changedropItem(value) {
				this.dvalue = value;
				if (value == 1) {
					this.dtitle = "资源";
					this.dplaceholder = "请输入...";
				} else {
					this.dtitle = "用户";
					this.dplaceholder = "请输入用户名/昵称";
				}
			},
			closetagClick() {
				this.showTag = false;
				this.categories = "";
				this.resetlist();
			},
			resetlist() {
				this.param.page = 1;
				this.reset = true;
				this.addRandomData();
			},
			loadmoreList() {
				this.reset = false;
				this.addRandomData();
			},
			searchType(item) {
				// debugger;
				this.searchrows.forEach((item1) => {
					this.$set(item1, "selected", false);
				});
				this.$set(item, "selected", true);
				this.type = item.type;
				this.resetlist();
			},
			changeTabs(index) {
				this.currenttab = index;
				this.zy_gs = index;
				this.resetlist();
			},
			confirm() {
				var value = this.keyword;
				if (value && this.dvalue == 1) {
					// debugger;
					this.localSearchListManage(value);
					this.searchLogDbAdd(value)
				}
				this.resetlist();
			},
			addRandomData() {
				uni.showLoading({
					title: '加载中'
				});
				var app_bbh = "115";
				//#ifdef APP-PLUS
				app_bbh = plus.runtime.versionCode;
				//#endif
				var url = "taolun/getList";
				uniCloud.callFunction({
					name: 'jztaolun',
					data: {
						action: url,
						data: {
							label: this.keyword,
							categories: this.categories || '',
							type: this.type || "zx",
							page: this.param.page,
							rows: this.param.rows,
							app_bbh: app_bbh
						}
					},
				}).then((res) => {
					// console.log("getList", res.result);
					var res = res.result;
					if (this.reset) {
						this.flowList.splice(0, this.flowList.length);
					}
					if (res.state == "0000") {
						this.list = res.rows;
						this.list.forEach((item1, index) => {
							let item = JSON.parse(JSON.stringify(item1));
							this.flowList.push(item);

						});
						if (this.list.length < this.param.rows) {
							this.loadStatus = 'nomore';
						} else {
							this.loadStatus = 'loadmore';
							this.param.page++;
						}
						// console.log("this.flowList", this.flowList);
						var resultlength = 0;
						resultlength = this.flowList.length;
						if (resultlength == 0) {
							this.isEmpty = true;
						} else {
							this.isEmpty = false;
						}
					} else {
						console.log("res.msg", res.msg);
					}
					uni.hideLoading();
				}).catch((err) => {
					console.log("网络错误，请重试——err", err);
					uni.showModal({
						content: err.message || '网络错误，请重试',
						showCancel: false
					});
				});
			}
		}
	}
</script>

<style>
	.search-row {
		padding: 8px 10px;
		background: #fff;
		display: flex;
	}

	.search-row .u-icon {
		display: inline-block;
	}

	.search-row-col {
		margin: 0px 10px;
		color: #BABBCD;
	}

	.search-row-col.selected {
		color: #767BCD;
	}
</style>
