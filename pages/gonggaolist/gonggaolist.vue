<template>
	<view>
		<u-navbar :is-back="true" title="系统公告"></u-navbar>
		<view class="jz-container">
			<item-list ref="itemList" :list="list"></item-list>
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
	import itemList from "../resource/item-list.vue"
	export default{
		data(){
			return {
				scrollTop: 0,
				loadStatus: 'loadmore',
				list:[],
				isEmpty:false,
				reset:false,
				param:{
					type: "gonggao",
					zy_gs: [0, 1, 3],
					page: 1,
					rows: 10
				}
			}
		},
		components:{
			itemList
		},
		created(){
			this.addRandomData();
		},
		onReachBottom() {
			// debugger;
			if (this.loadStatus == 'loadmore') {
				this.loadStatus = 'loading';
				this.reset = false;
				this.addRandomData();
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.resetlist();
			uni.stopPullDownRefresh();
		},
		methods:{
			resetlist() {
				this.param.page = 1;
				this.reset = true;
				this.addRandomData();
			},
			addRandomData() {
				uni.showLoading({
					title: '加载中'
				});
				var app_bbh="115";
				//#ifdef APP-PLUS
				app_bbh = plus.runtime.versionCode;
				//#endif
				Object.assign(this.param,{
					app_bbh: app_bbh
				});
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'resource/getList',
						data: this.param
					},
				}).then((res) => {
					var res = res.result;
					if (res.state == "0000") {
						// this.list = res.rows;
						if(this.reset){
							this.list=[];	
						}
						res.rows.forEach((item1, index) => {
							this.list.push(item1);
						});
						if (res.rows.length < this.param.rows) {
							this.loadStatus = 'nomore';
						} else {
							this.loadStatus = 'loadmore';
							this.param.page++;
						}
						var resultlength = this.list.length;
						if (resultlength == 0) {
							this.isEmpty = true;
						} else {
							this.isEmpty = false;
						}
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						});
					}
					uni.hideLoading();
				}).catch((err)=>{
					console.log("网络错误，请重试——err",err);
					uni.showModal({
					  content: err.message || '网络错误，请重试',
					  showCancel: false
					});
				});
			},
		}
	}
</script>

<style>
</style>
