<template>
	<view>
		<u-navbar :is-back="true" :title="title"></u-navbar>
		<view class="jz-container">
			<item-list ref="itemList" :list="flowList"></item-list>
		</view>
		<u-toast ref="uToast" />
		<template v-if="isEmpty">
			<view style="margin-top: 100rpx;">
				<u-empty text="数据为空" mode="list"></u-empty>
			</view>
		</template>
		<template v-else>
			<u-loadmore :status="loadStatus" @loadmore="loadmoreList"></u-loadmore>
		</template>
		<u-back-top :scroll-top="scrollTop" top="1000" mode="square" icon="arrow-up" tips="顶部"></u-back-top>
	</view>
</template>
<script>
	const db = uniCloud.database();
	import itemList from "../resource/item-list.vue"
	export default {
		data() {
			return {
				scrollTop: 0,
				loadStatus: 'loadmore',
				flowList:[],
				list: [],
				isEmpty: false,
				reset: false,
				title: "资源合集",
				param: {
					page: 1,
					rows: 10
				},
				hjTitle: "" ///合集标题
			}
		},
		components: {
			itemList
		},
		created() {
			// 获取当前合集资源
			this.id = this.$Route.query.id;
			this.init();
		},
		onReachBottom() {
			// debugger;
			if (this.loadStatus == 'loadmore') {
				this.loadStatus = 'loading';
				// this.reset = false;
				this.addRandomData();
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.resetlist();
			uni.stopPullDownRefresh();
		},
		methods: {
			loadmoreList() {
				this.reset = false;
				this.addRandomData();
			},
			async init() {
				var dbres = await db.collection("jz-opendb-resourceshj").where({
					hj_id: this.id
				}).get();
				if (dbres.result.data.length > 0) {
					this.hjTitle = dbres.result.data[0].resourceshj_title;
					this.title = this.hjTitle;
				}
				this.addRandomData();
			},
			resetlist() {
				this.param.page = 1;
				this.reset = true;
				this.addRandomData();
			},
			async addRandomData() {
				var that = this;
				uni.showLoading({
					title: '加载中'
				});
				var userInfo = uni.getStorageSync("userInfo");
				uniCloud.callFunction({
					name: 'jzresourcehj',
					data: {
						action: "jzresourcehj/getList",
						data: {
							parent_id: this.id,
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
						if (obj) {
							this.flowList.push(obj);
						}
					});
					this.flowList = this.AryDeleteMore(this.flowList);
					// console.log("this.flowList",this.flowList);
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
					console.log('type error!')
					return
				}
				var array = [];
				var array_id = [];
				for (var i = 0; i < arr.length; i++) {
					if (array_id.indexOf(arr[i]._id) == -1) {
						array.push(arr[i]);
						array_id.push(arr[i]._id);
					}else{
						// console.log(arr[i]);
					}
				}	
				// console.log(array,array_id);
				// console.log("array",array);
				return array;
			}
			
		}
	}
</script>

<style>
</style>
