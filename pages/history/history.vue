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
			<music-list :list="flowList"></music-list>
		</view>
		<u-loadmore v-show="flowList.length!=0" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
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
				param:{
					page:1,
					rows:10
				}
			}
		},
		mixins:[userinfo],
		components: {
			itemList,
			musicList
		},
		onLoad() {
			this.addRandomData();
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.param.page=1;
			this.addRandomData();
			uni.stopPullDownRefresh();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
			if(this.loadStatus != 'nomore'){
				this.loadStatus = 'loading';
				this.addRandomData();
			}
		},
		methods: {
			changeTabs(item) {
				this.currenttab = item.index;
				this.zy_gs = item.index;
				// this.reset=true;
				this.param.page=1;
				this.flowList.splice(0, this.flowList.length);
				this.addRandomData();
			},
			async addRandomData() {
				var that=this;
				if (this.$refs.uWaterfall) {
					this.$refs.uWaterfall.clear();
				}
				uni.showLoading({
					title: '加载中...'
				});
				const db = uniCloud.database()
				const uid = db.getCloudEnv('$cloudEnv_uid');
				const collection = db.collection('opendb-news-history,jz-opendb-resources');
				var skip = (this.param.page-1)*this.param.rows||0;
				var resultdata = await collection.where({
					user_id: uid,
					zy_gs: this.zy_gs
				}).field('article_title,update_date,article_id{title,avatar,author,resources,is_off,article_status}').orderBy('update_date','desc')
				.skip(skip).limit(this.param.rows).get();
				var rows = resultdata.result.data;
				if(rows.length<this.param.rows){
					this.loadStatus = 'nomore';
				}else{
					this.param.page++;
					this.loadStatus = 'loadmore';
				}
				rows.forEach((item) => {
					var obj = item.article_id[0];
					var roles = that.getuserrole();
					if (roles.indexOf("Master") != -1 || roles.indexOf("AUDITOR") != -1) {
						if (obj) {
							this.flowList.push(obj);
						}
					} else {
						if (obj && obj.article_status == 1 && obj.is_off != 1) {
							this.flowList.push(obj);
						}
					}
				});
				uni.hideLoading();
			}
		}
	}
</script>
<style>
</style>
