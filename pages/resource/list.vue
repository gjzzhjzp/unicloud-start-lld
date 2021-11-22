<template>
	<view class="wrap">
		<!-- <u-navbar :is-back="true" :title="title"></u-navbar> -->
		<view class="search-container">
			<!-- 搜索框 -->
			<view class="search-container-bar">
				<u-navbar :is-back="true" back-icon-name="arrow-leftward" :back-icon-size="40">
					<u-search border-color="#7275D3" bg-color="#fff" v-model="keyword" height="60" placeholder="请输入..."
						@search="confirm" @custom="confirm" :show-action="true"></u-search>
				</u-navbar>
			</view>
		</view>
		<view>
			<u-tabs active-color="#7275D3" bar-width="0" :list="tabslist" :is-scroll="false" :current="currenttab"
				@change="changeTabs"></u-tabs>
		</view>
		<view class="search-row">
			<text :class="['search-row-col',item.selected?'selected':'']" v-for="item in searchrows"
				@click="searchType(item)">{{item.name}}
				<u-icon size="20" name="arrow-down-fill"></u-icon>
			</text>
		</view>
		<view v-if="showTag" style="margin-left: 10px;">
			<u-tag :text="tagname" mode="light"  closeable :show="showTag" @close="closetagClick"/>
		</view>
		<view v-if="currenttab!=2">
			<item-list :list="flowList"></item-list>
			<!-- <u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<item-list :list="leftList"></item-list>
				</template>
				<template v-slot:right="{rightList}">
					<item-list :list="rightList"></item-list>
				</template>
			</u-waterfall> -->
		</view>
		<view v-else>
			<music-list :list="flowList_mp3" :is-empty="isEmpty" :load-status="loadStatus" @loadmore="loadmoreList"></music-list>
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
	export default {
		data() {
			return {
				tagname:"",////tag标签
				showTag:false,
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
				}
			}
		},
		components: {
			itemList,
			musicList
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.resetlist();
			uni.stopPullDownRefresh()
		},
		onLoad(e) {
			// debugger;
			console.log("onLoad", e);
			if(e.flmc&&e.flbm){
				this.showTag=true;
				this.tagname=e.flmc;
				this.categories=e.flbm||"";
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
			this.addRandomData();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
			if (this.loadStatus == 'loadmore') {
				this.loadStatus = 'loading';
				this.reset = false;
				this.addRandomData();
			}
		},
		methods: {
			closetagClick(){
				this.showTag=false;
				this.categories="";
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
				this.resetlist();
			},
			addRandomData() {
				uni.showLoading({
					title: '加载中...'
				});
				// debugger;
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'resource/getList',
						data: {
							label: this.keyword,
							categories: this.categories || '',
							type: this.type || "zx",
							zy_gs: this.zy_gs,
							page: this.param.page,
							rows: this.param.rows
						}
					},
				}).then((res) => {
					console.log("getList", res.result);
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
						console.log("this.flowList", this.flowList);
						var resultlength=0;
						if (this.zy_gs == '2') {
							resultlength=this.flowList_mp3.length;
						} else {
							resultlength=this.flowList.length;
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
