<template>
	<view class="wrap">
		<jz-navbar :issy="false" ref="navbar">
			<view class="jz-navbar-title">广场</view>
		</jz-navbar>
		<view style="padding: 0px 120rpx;background: #fff;">
			<u-tabs active-color="#7275D3" bar-width="0" :font-size="18" :list="toptabs" :is-scroll="false" :current="topcurtab"
				@change="changeTopTabs"></u-tabs>
		</view>
		<view v-if="topcurtab==0">
			<view>
				<u-tabs active-color="#7275D3" bar-width="0" :list="tabslist" :is-scroll="false" :current="currenttab"
					@change="changeTabs"></u-tabs>
			</view>
			<view class="search-row">
				<view :class="['search-row-col',item.selected?'selected':'']" v-for="(item,index) in searchrows"
					:key="index" >
					<u-button size="medium" shape="circle" @click="searchType(item)">{{item.name}}</u-button>
			
					<!-- <u-icon size="20" name="arrow-down-fill"></u-icon> -->
				</view>
			</view>
			<view v-if="showTag" style="margin-left: 10px;">
				<u-tag :text="tagname" mode="light" closeable :show="showTag" @close="closetagClick" />
			</view>
			<view>
				<item-list type="2" v-show="currenttab==''" :list="zdflowList" :showzd="true"></item-list>
				<item-list type="1"  :list="flowList"></item-list>
			</view>
		</view>
		<view v-if="topcurtab==1">
			<view>
				<item-list type="3" :list="gzflowList" :isgz="true" :showzd="false"></item-list>
			</view>
		</view>
		<template v-if="isEmpty">
			<!-- <view style="margin-top: 100rpx;">
				<u-empty text="数据为空" mode="list"></u-empty>
			</view> -->
		</template>
		<template v-else>
			<u-loadmore :status="loadStatus" @loadmore="loadmoreList"></u-loadmore>
		</template>
		<u-back-top :scroll-top="scrollTop" top="1000" mode="square" icon="arrow-up" tips="顶部"></u-back-top>
		<jz-tabbar></jz-tabbar>
		<jz-gonggao ref="gonggao"></jz-gonggao>
	</view>
</template>
<script>
	import itemList from "./item-list.vue"
	import gonggao from "@/common/gonggao.js"
	// import search from "../list/search/search.js"
	export default {
		mixins: [gonggao],
		data() {
			return {
				zdflowList:[],//置顶资源
				tagname: "", ////tag标签
				showTag: false,
				keyword: "",
				scrollTop: 0,
				loadStatus: 'loadmore',
				flowList: [],
				gzflowList:[],////关注列表
				list: [],
				categories: "", ///分类编码
				title: "列表", ///列表
				tabslist: [{
					name: '全部',
					type: ""
				}, {
					name: '精华',
					type: "9"
				}, {
					name: '闲聊',
					type: "0"
				}, {
					name: '嗑糖',
					type: "1"
				}, {
					name: '分享',
					type: "2"
				}, {
					name: '其他',
					type: "3"
				}],
				toptabs: [{
					name: '全部发帖',
					type: "0"
				}, {
					name: '我的关注',
					type: "1"
				}],
				topcurtab: 0,
				currenttab: 0,
				searchrows: [{
						name: "最新评论",
						type: "zxpl",
						selected: true
					},{
						name: "最新内容",
						type: "zx",
						selected: false
					},
					{
						name: "热门内容",
						type: "rm",
						selected: false
					}
					// {
					// 	name: "收藏量高",
					// 	type: "sc",
					// 	selected: false
					// }
				],
				type: "zxpl",
				reset: false, ///重置
				isEmpty: false,
				zy_gs: "0", ////资源格式
				param: {
					page: 1,
					rows: 4
				},
				// curuser:""////当前用户
			}
		},
		// mixins: [search],
		components: {
			itemList
		},
		onShow(){
			if (this.$refs.navbar) {
				this.$refs.navbar.checknewinfo();
			} 
			this.getcuritem();
			// this.getZdlist();
			// this.resetlist();
		},
		// 下拉刷新
		onPullDownRefresh() {
			// this.getZdlist();
			this.resetlist();
			uni.stopPullDownRefresh();
		},
		created() {
			var e = this.$Route.query;
			if (e.flmc && e.flbm) {
				this.showTag = true;
			}
			this.type = e.type || "zxpl";
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
				this.dtitle = "用户";
			}
			this.getZdlist();
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
				if(this.topcurtab==0){
					this.addRandomData();
				}else{
					this.addgzRandomData();
				}
			}
		},
		methods: {
			async getcuritem(){
				var id=getApp().globalData.guangchang_curid;
				var type=getApp().globalData.guangchang_type;
				var data=getApp().globalData.guangchang_item;
				if(!id){
					return false;
				}
				// var db=uniCloud.database();
				// var res=await db.collection("jz-opendb-taolun").where({
				// 	_id:id
				// }).field("pl_count,like_count,like_count1").get();
				// if(res.result&&res.result.data.length>0){
				// 	data=res.result.data[0];
				// }
				///如果是置顶
				if(type=="2"){
					this.zdflowList.forEach((item)=>{
						if(item._id==id){
							Object.assign(item,data);
						}
					})
				}else if(type=="3"){
					///如果是关注列表
					this.gzflowList.forEach((item)=>{
						if(item._id==id){
							Object.assign(item,data);
						}
					})
				}else{
					///如果是普通广场列表
					this.flowList.forEach((item)=>{
						if(item._id==id){
							Object.assign(item,data);
						}
					})
				}
			},
			changeTopTabs(index) {
				this.topcurtab = index;
				this.resetlist();
			},
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
				if(this.topcurtab==0){
					this.addRandomData();
				}else{
					this.addgzRandomData();
				}
			},
			loadmoreList() {
				this.reset = false;
				if(this.topcurtab==0){
				this.addRandomData();
				}else{
					this.addgzRandomData();
				}
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
				// debugger;
				this.currenttab = index;
				this.categories = this.tabslist[index].type;
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
			getZdlist(){
				var url = "taolun/getList";
				var app_bbh = "115";
				var userinfo=uni.getStorageSync("userInfo");
				var uid = userinfo._id;
				uniCloud.callFunction({
					name: 'jztaolun',
					data: {
						action: url,
						data: {
							is_recommend:1,
							page: 1,
							rows: this.param.rows,
							uid:uid,
							app_bbh: app_bbh
						}
					},
				}).then((res) => {
					// debugger;
					this.zdflowList=res.result.rows;
				})
			},
			addRandomData() {
				// debugger;
				uni.showLoading({
					title: '加载中'
				});
				var app_bbh = "115";
				//#ifdef APP-PLUS
				app_bbh = plus.runtime.versionCode;
				//#endif
				var url = "taolun/getList";
				var userinfo=uni.getStorageSync("userInfo");
				var uid = userinfo._id;
				uniCloud.callFunction({
					name: 'jztaolun',
					data: {
						action: url,
						data: {
							label: this.keyword,
							categories: this.categories || '',
							type: this.type || "zxpl",
							page: this.param.page,
							rows: this.param.rows,
							uid:uid,
							app_bbh: app_bbh
						}
					},
				}).then((res) => {
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
						this.flowList=this.AryDeleteMore(this.flowList);
						this.flowList.forEach((item)=>{
							var list=[];
							item.resources.forEach((item1)=>{
								if(item1.fileType=="image"){
									if(item1.path.indexOf("blob:")==-1){
										list.push(item1);
									}
								}else{
									list.push(item1);
								}
							});
							this.$set(item,"resources",list);
						});
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
			},
			// 获取关注人的发帖
			addgzRandomData() {
				// debugger;
				uni.showLoading({
					title: '加载中'
				});
				var app_bbh = "115";
				//#ifdef APP-PLUS
				app_bbh = plus.runtime.versionCode;
				//#endif
				var url = "taolun/getgzList";
				var userinfo=uni.getStorageSync("userInfo");
				var uid = userinfo._id;
				uniCloud.callFunction({
					name: 'jztaolun',
					data: {
						action: url,
						data: {
							// label: this.keyword,
							// categories: this.categories || '',
							// type: this.type || "zx",
							page: this.param.page,
							rows: this.param.rows,
							uid:uid,
							app_bbh: app_bbh
						}
					},
				}).then((res) => {
					var res = res.result;
					if (this.reset) {
						this.gzflowList.splice(0, this.gzflowList.length);
					}
					if (res.state == "0000") {
						this.list = res.rows;
						this.list.forEach((item1, index) => {
							let item = JSON.parse(JSON.stringify(item1));
							this.gzflowList.push(item);
						});
						if (this.list.length < this.param.rows) {
							this.loadStatus = 'nomore';
						} else {
							this.loadStatus = 'loadmore';
							this.param.page++;
						}
						// console.log("this.flowList", this.flowList);
						this.gzflowList=this.AryDeleteMore(this.gzflowList);
						this.gzflowList.forEach((item)=>{
							var list=[];
							item.resources.forEach((item1)=>{
								if(item1.fileType=="image"){
									if(item1.path.indexOf("blob:")==-1){
										list.push(item1);
									}
								}else{
									list.push(item1);
								}
							});
							this.$set(item,"resources",list);
						});
						var resultlength = 0;
						resultlength = this.gzflowList.length;
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
			},
			// 资源数组去重
			AryDeleteMore(arr) {
				if (!Array.isArray(arr)) {
					return;
				}
				var array = [];
				var array_id = [];
				for (var i = 0; i < arr.length; i++) {
					if (array_id.indexOf(arr[i]._id) == -1) {
						array.push(arr[i]);
						array_id.push(arr[i]._id);
					}
				}
				return array;
			}
		}
	}
</script>
<style>
	.search-row {
		padding: 8px 10px;
		background: #fff;
		display: flex;
		margin-top: 5px;
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
