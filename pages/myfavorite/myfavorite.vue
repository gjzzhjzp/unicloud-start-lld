<template>
	<view class="wrap">
		<u-navbar :is-back="true" title="我的收藏"></u-navbar>
		<u-tabs active-color="#7275D3" bar-width="0" :list="wraptabslist" :is-scroll="false" :current="wrapcurrenttab"
			@change="changeWrapTabs"></u-tabs>

		<view v-if="wrapcurrenttab==0">
			<view>
				<u-tabs active-color="#7275D3" bar-width="0" :list="tabslist" :is-scroll="false" :current="currenttab"
					@change="changeTabs"></u-tabs>
			</view>
			<view v-if="currenttab!=2">
				<item-list :list="flowList"></item-list>
			</view>
			<view v-else>
				<music-list :list="flowList" :loadStatus="loadStatus" @loadmore="addRandomData"></music-list>
			</view>
			<view v-if="currenttab!=2">
				<u-loadmore v-show="flowList.length!=0" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
			</view>
			<view style="margin-top: 20px;text-align: center;" v-show="flowList.length==0">
				<u-empty text="无收藏" mode="favor"></u-empty>
			</view>
		</view>
		<view v-else>
			<gitem-list :showoperation="false" :list="gflowList" :isgz="true"></gitem-list>
			<u-loadmore v-show="gflowList.length!=0" :status="loadStatus" @loadmore="addgRandomData"></u-loadmore>
			<view style="margin-top: 20px;text-align: center;" v-show="gflowList.length==0">
				<u-empty text="无历史记录" mode="history"></u-empty>
			</view>
		</view>
		<u-back-top :scroll-top="scrollTop" top="1000" mode="square" icon="arrow-up" tips="顶部"></u-back-top>
	</view>
</template>
<script>
	import itemList from "../resource/item-list.vue"
	import musicList from "../resource/musicList.vue"
	import userinfo from "../common/common/userinfo.js"
import gitemList from "../guangchang/item-list.vue"
	export default {
		data() {
			return {
				scrollTop: 0,
				loadStatus: 'loadmore',
				flowList: [],
				gflowList:[],
				list: [],
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
				wraptabslist:[{
					name: '作品',
					type: "0"
				}, {
					name: '帖子',
					type: "1"
				}],
				wrapcurrenttab:0,
				currenttab: 0,
				zy_gs: 0,
				param: {
					page: 1,
					rows: 10
				}
			}
		},
		components: {
			itemList,
			musicList,
			gitemList
		},
		mixins: [userinfo],
		mounted() {
			this.addRandomData();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.param.page = 1;
			this.addRandomData();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			if (this.loadStatus != 'nomore') {
				this.loadStatus = 'loading';
				setTimeout(() => {
					this.addRandomData();
				}, 1000)
			}
		},
		methods: {
			changeTabs(index) {
				this.currenttab = index;
				this.zy_gs = index;
				// this.reset=true;
				this.param.page = 1;
				this.flowList.splice(0, this.flowList.length);
				this.addRandomData();
			},
			changeWrapTabs(index){
				this.wrapcurrenttab = index;
				this.param.page = 1;
				if(index==1){
					this.gflowList.splice(0, this.gflowList.length);
					this.addgRandomData();
				}else{
					this.flowList.splice(0, this.flowList.length);
					this.addRandomData();
				}
			},
			async addRandomData() {
				var that = this;
				uni.showLoading({
					title: '加载中'
				});
				var userInfo = uni.getStorageSync("userInfo");
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: "resource/getMyfavoriteList",
						data: {
							uid: userInfo._id,
							zy_gs: this.zy_gs,
							page: this.param.page,
							rows: this.param.rows
						}
					},
				}).then((res) => {
					var rows = res.result.rows;
					if (rows.length < this.param.rows) {
						this.loadStatus = 'nomore';
					} else {
						this.param.page++;
						this.loadStatus = 'loadmore';
					}
					// console.log("rows111", rows);
					rows.forEach((item) => {
						var obj = item.article_id[0];
						// debugger;
						var roles = that.getuserrole();
						if (roles && (roles.indexOf("Master") != -1 || roles.indexOf("AUDITOR") != -
								1)) {
							if (obj) {
								delete obj.is_encryption;
								that.flowList.push(obj);
							}
						} else {
							if (obj && obj.article_status == 1 && obj.is_off != 1) {
								delete obj.is_encryption;
								that.flowList.push(obj);
							}
						}
					});
					this.flowList = this.AryDeleteMore(this.flowList);
					uni.hideLoading();
				}).catch((err) => {
					console.log("网络错误，请重试——err", err);
					uni.showModal({
						content: err.message || '网络错误，请重试',
						showCancel: false
					});
				});


				// const db = uniCloud.database();
				// const uid = db.getCloudEnv('$cloudEnv_uid');
				// const collection = db.collection('opendb-news-favorite,jz-opendb-resources,uni-id-users');
				// var skip = (this.param.page - 1) * this.param.rows || 0;
				// var resultdata = await collection.where({
				// 		user_id: uid,
				// 		zy_gs: this.zy_gs
				// 	}).field(
				// 		'article_title,article_id,create_date{title,avatar,author,resources,is_off,article_status}')
				// 	.orderBy('create_date', 'desc')
				// 	.skip(skip).limit(this.param.rows).get();

			},
			async addgRandomData() {
				var that = this;
				uni.showLoading({
					title: '加载中'
				});
				var userInfo = uni.getStorageSync("userInfo");
				uniCloud.callFunction({
					name: 'jzfavator',
					data: {
						action: "favator/getMyFavatorTaolunList",
						data: {
							uid: userInfo._id,
							page: this.param.page,
							rows: this.param.rows
						}
					},
				}).then((res) => {
					// debugger;
					var rows = res.result.rows;
					if (rows.length < this.param.rows) {
						this.loadStatus = 'nomore';
					} else {
						this.param.page++;
						this.loadStatus = 'loadmore';
					}
					rows.forEach((item) => {
						// debugger;
						var obj = item.article_id[0];
						if(obj){
						obj.userinfo=item.userinfo;
						var roles = that.getuserrole();
						if (roles && (roles.indexOf("Master") != -1 || roles.indexOf("AUDITOR") != -1)) {
							if (obj) {
								this.gflowList.push(obj);
							}
						} else {
							if (obj && obj.article_status == 1 && obj.is_off != 1) {
								this.gflowList.push(obj);
							}
						}
						}
					});
					this.gflowList=this.AryDeleteMore(this.gflowList);
					uni.hideLoading();
				}).catch((err)=>{
					console.log("网络错误，请重试——err",err);
					uni.showModal({
					  content: err.message || '网络错误，请重试',
					  showCancel: false
					});
				});
			},
			// 资源数组去重
			AryDeleteMore(arr) {

				if (!Array.isArray(arr)) {
					console.log('type error!')
					return
				}
				var array = [];
				var array_id = [];
				for (var i = 0; i < arr.length; i++) {
					if (array_id.indexOf(arr[i]._id) == -1) {
						array.push(arr[i]);
						array_id.push(arr[i]._id);
					}
				}
				// console.log("array",array);
				return array;
			}
		}
	}
</script>
<style>

</style>
