<template>
	<view class="wrap">
		<u-navbar :is-back="true" title="我的足迹"></u-navbar>
		<u-waterfall v-model="flowList" ref="uWaterfall">
			<template v-slot:left="{leftList}">
				<item-list :list="leftList"></item-list>
			</template>
			<template v-slot:right="{rightList}">
				<item-list :list="rightList"></item-list>
			</template>
		</u-waterfall>
		<u-loadmore v-show="flowList.length!=0" bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		<u-back-top :scroll-top="scrollTop" top="1000" mode="square" icon="arrow-up" tips="顶部"></u-back-top>
	<view style="margin-top: 20px;" v-show="flowList.length==0">
		<u-empty  text="无历史记录" mode="history"></u-empty>
	</view>
	
	</view>
</template>
<script>
	import itemList from "../resource/item-list.vue"
	export default {
		data() {
			return {
				scrollTop: 0,
				loadStatus: 'loadmore',
				flowList: [],
				list: []
			}
		},
		components: {
			itemList
		},
		onLoad() {
			this.addRandomData();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			setTimeout(() => {
				this.addRandomData();
			}, 1000)
		},
		methods: {
			async addRandomData() {
				this.flowList.splice(0,this.flowList.length);
				const db = uniCloud.database()
				const uid = db.getCloudEnv('$cloudEnv_uid');
				const collection = db.collection('opendb-news-history,jz-opendb-resources');
				var resultdata = await collection.where({
					user_id: uid
				}).field('article_title,article_id{title,avatar,author}').get();
				console.log("足迹",resultdata);
				var rows=resultdata.result.data;
				rows.forEach((item)=>{
					var obj=item.article_id[0];
					if(obj){
						this.flowList.push(obj);
					}
				});
				console.log("this.flowList",this.flowList);
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
