<template>
	<view class="wrap">
		<!-- <u-navbar :is-back="true" :title="title"></u-navbar> -->
		<view class="search-container">
			<!-- 搜索框 -->
			<view class="search-container-bar">

				<u-navbar :is-back="true" back-icon-name="arrow-leftward" :back-icon-size="40">
					<view style="width: 120rpx;">
						<u-dropdown>
							<u-dropdown-item @change="changedropItem" v-model="dvalue" :title="dtitle"
								:options="doptions"></u-dropdown-item>
						</u-dropdown>
					</view>
					<u-search border-color="#7275D3" bg-color="#fff" v-model="keyword" height="60"
						:placeholder="dplaceholder" @search="confirm" @custom="confirm" :show-action="true"></u-search>
				</u-navbar>
			</view>
		</view>
		<view>
			<u-tabs active-color="#7275D3" bar-width="0" :list="tabslist" :is-scroll="false" :current="currenttab"
				@change="changeTabs"></u-tabs>
		</view>
		<view class="search-row">
			<view :class="['search-row-col',item.selected?'selected':'']" v-for="(item,index) in searchrows"
				:key="index" >
				<u-button size="medium" @click="searchType(item)" shape="circle">{{item.name}}</u-button>
				<!-- <u-icon size="20" name="arrow-down-fill"></u-icon> -->
			</view>
		</view>
		<view v-if="showTag" style="margin-left: 10px;">
			<u-tag :text="tagname" mode="light" closeable :show="showTag" @close="closetagClick" />
		</view>
		<view v-if="currenttab!=2">
			<item-list :list="flowList"></item-list>
		</view>
		<view v-else>
			<music-list :list="flowList_mp3" :is-empty="isEmpty" :load-status="loadStatus" @loadmore="loadmoreList">
			</music-list>
		</view>
		<template v-if="currenttab!=2">
			<template v-if="isEmpty">
				<view style="margin-top: 100rpx;">
					<u-empty text="数据为空" mode="list"></u-empty>
				</view>
			</template>
			<template v-else>
				<u-loadmore :status="loadStatus" @loadmore="loadmoreList"></u-loadmore>
			</template>
		</template>
		<u-back-top :scroll-top="scrollTop" top="1000" mode="square" icon="arrow-up" tips="顶部"></u-back-top>
	</view>
</template>
<script>
	import itemList from "./item-list.vue"
	import musicList from "./musicList.vue"
	import search from "../list/search/search.js"
	export default {
		data() {
			return {
				dvalue: 1,
				dtitle: "资源",
				doptions: [{
						label: '资源',
						value: 1,
					},
					{
						label: '用户',
						value: 2,
					}
				],
				dplaceholder: "请输入...",
				tagname: "", ////tag标签
				showTag: false,
				keyword: "",
				scrollTop: 0,
				loadStatus: 'loadmore',
				flowList: [],
				flowList_mp3: [],
				list: [],
				categories: "", ///分类编码
				title: "列表", ///列表
				tabslist: [{
					name: '图片',
					type: "0"
				}, {
					name: '视频',
					type: "1"
				}, {
					name: '音乐',
					type: "2"
				}, {
					name: '文章',
					type: "3"
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
		mixins: [search],
		components: {
			itemList,
			musicList
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
				var url = "resource/getList";
				if (this.dvalue == 2) {
					url = "resource/getListByuser";
				}
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: url,
						data: {
							label: this.keyword,
							categories: this.categories || '',
							type: this.type || "zx",
							zy_gs: this.zy_gs,
							page: this.param.page,
							rows: this.param.rows,
							app_bbh: app_bbh
						}
					},
				}).then((res) => {
					// console.log("getList", res.result);
					var res = res.result;
					if (this.reset) {
						if (this.zy_gs == '2') {
							this.flowList_mp3.splice(0, this.flowList_mp3.length);
						} else {
							this.flowList.splice(0, this.flowList.length);
						}
					}
					if (res.state == "0000") {
						this.list = res.rows;
						this.list.forEach((item1, index) => {
							let item = JSON.parse(JSON.stringify(item1));
							if (this.zy_gs == '2') {
								this.flowList_mp3.push(item);
							} else {
								this.flowList.push(item);
							}

						});
						if (this.list.length < this.param.rows) {
							this.loadStatus = 'nomore';
						} else {
							this.loadStatus = 'loadmore';
							this.param.page++;
						}
						// console.log("this.flowList", this.flowList);
						var resultlength = 0;
						if (this.zy_gs == '2') {
							resultlength = this.flowList_mp3.length;
						} else {
							resultlength = this.flowList.length;
						}
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
