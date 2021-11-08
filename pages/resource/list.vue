<template>
	<view class="wrap">
		<u-navbar :is-back="true" :title="title"></u-navbar>
		<!-- <jz-search></jz-search> -->
		<!-- <uni-search-bar @click="searchClick" class="uni-search-box" v-model="keyword" ref="searchBar" radius="100"
			cancelButton="none" disabled :placeholder="inputPlaceholder" /> -->
		<u-waterfall v-model="flowList" ref="uWaterfall">
			<template v-slot:left="{leftList}">
				<item-list :list="leftList"></item-list>
			</template>
			<template v-slot:right="{rightList}">
				<item-list :list="rightList"></item-list>
			</template>
		</u-waterfall>
		<template v-if="flowList.length==0">
			<view style="margin-top: 100rpx;">
				<u-empty text="数据为空" mode="list"></u-empty>
			</view>
		</template>
		<template v-else>
			<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		</template>
		<u-back-top :scroll-top="scrollTop" top="1000" mode="square" icon="arrow-up" tips="顶部"></u-back-top>
	</view>
</template>
<script>
	import itemList from "./item-list.vue"
	export default {
		data() {
			return {
				// where:"",
				keyword:"",
				scrollTop: 0,
				loadStatus: 'loadmore',
				flowList: [],
				list: [],
				categories:"",///分类编码
				title:"列表"///列表
			}
		},
		components: {
			itemList
		},
		onLoad(e) {
			console.log("onLoad",e);
			this.categories=e.categories||"";
			this.keyword = getApp().globalData.searchText;
			getApp().globalData.searchText = '';
			if(!this.keyword){
				this.keyword=e.title||"";
			}
			this.addRandomData();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			setTimeout(() => {
				this.addRandomData();
			}, 1000);
		},
		methods: {
			addRandomData() {
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'resource/getList',
						data:{
							// title:this.keyword,
							label:this.keyword,
							categories:this.categories||''
						}
					},
				}).then((res) => {
					var res = res.result;
					if (res.state == "0000") {
						this.list = res.rows;
						this.flowList = JSON.parse(JSON.stringify(this.list));
						this.loadStatus = 'loadmore';
					} else {
						console.log("res.msg",res.msg);
					}	
				});
			}
		}
	}
</script>

<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>
