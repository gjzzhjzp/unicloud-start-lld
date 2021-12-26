<template>
	<view class="wrap">
		<u-navbar :is-back="true" title="我的足迹"></u-navbar>
		<view>
			<u-tabs active-color="#7275D3" bar-width="0" :list="tabslist" :is-scroll="false" :current="currenttab"
				@change="changeTabs"></u-tabs>
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
			<music-list :list="flowList" :loadStatus="loadStatus"  @loadmore="addRandomData"></music-list>
		</view>
		<view v-if="currenttab!=2">
		<u-loadmore v-show="flowList.length!=0" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		</view>
		<u-back-top :scroll-top="scrollTop" top="1000" mode="square" icon="arrow-up" tips="顶部"></u-back-top>
		<view style="margin-top: 20px;text-align: center;" v-show="flowList.length==0">
			<u-empty text="无历史记录" mode="history"></u-empty>
		</view>
	</view>
</template>
<script>
	import itemList from "../resource/item-list.vue"
	import musicList from "../resource/musicList.vue"

	import userinfo from "../common/common/userinfo.js"
	export default {
		data() {
			return {
				scrollTop: 0,
				loadStatus: 'loadmore',
				flowList: [],
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
				currenttab: 0,
				zy_gs: 0,
				param: {
					page: 1,
					rows: 10
				}
			}
		},
		mixins: [userinfo],
		components: {
			itemList,
			musicList
		},
		mounted() {
			this.addRandomData();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.param.page = 1;
			this.addRandomData();
			uni.stopPullDownRefresh();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
			if (this.loadStatus != 'nomore') {
				this.loadStatus = 'loading';
				this.addRandomData();
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
			async addRandomData() {
				var that = this;
				uni.showLoading({
					title: '加载中...'
				});
				var userInfo = uni.getStorageSync("userInfo");
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: "resource/getHistoryList",
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
					rows.forEach((item) => {
						// debugger;
						var obj = item.article_id[0];
						var roles = that.getuserrole();
						if (roles && (roles.indexOf("Master") != -1 || roles.indexOf("AUDITOR") != -1)) {
							if (obj) {
								this.flowList.push(obj);
							}
						} else {
							if (obj && obj.article_status == 1 && obj.is_off != 1) {
								this.flowList.push(obj);
							}
						}
					});
					this.flowList=this.AryDeleteMore(this.flowList);
					uni.hideLoading();
				});
			},
			// 资源数组去重
			 AryDeleteMore(arr){
				
				 if (!Array.isArray(arr)) {
				        console.log('type error!')
				        return
				    }
				    var array = [];
					var array_id=[];
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
