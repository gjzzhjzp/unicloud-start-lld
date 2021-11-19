<template>
	<view class="wrap">
		<u-navbar :is-back="true" title="我的收藏"></u-navbar>
		<view>
			<u-tabs active-color="#7275D3" bar-width="0" :list="tabslist" :is-scroll="false" :current="currenttab"
				@change="changeTabs"></u-tabs>
		</view>
		<view v-if="currenttab!=2">
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<item-list :list="leftList"></item-list>
				</template>
				<template v-slot:right="{rightList}">
					<item-list :list="rightList"></item-list>
				</template>
			</u-waterfall>
		</view>
		<view v-else>
			<music-list :list="flowList"></music-list>
		</view>
		<u-loadmore v-show="flowList.length!=0" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		<u-back-top :scroll-top="scrollTop" top="1000" mode="square" icon="arrow-up" tips="顶部"></u-back-top>
		<view style="margin-top: 20px;" v-show="flowList.length==0">
			<u-empty text="无收藏" mode="favor"></u-empty>
		</view>
	</view>
</template>
<script>
	import itemList from "../resource/item-list.vue"
	import musicList from "../resource/musicList.vue"
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
		components: {
			itemList,
			musicList
		},
		onLoad() {
			this.addRandomData();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
			if(this.loadStatus != 'nomore'){
				this.loadStatus = 'loading';
				setTimeout(() => {
					this.addRandomData();
				}, 1000)
			}
		},
		methods: {
			changeTabs(index) {
				console.log("index", index);
				this.currenttab = index;
				this.zy_gs = index;
				// this.reset=true;
				this.flowList.splice(0, this.flowList.length);
				this.addRandomData();
			},
			async addRandomData() {
				if (this.$refs.uWaterfall) {
					this.$refs.uWaterfall.clear();
				}
				const db = uniCloud.database();
				const uid = db.getCloudEnv('$cloudEnv_uid');
				const collection = db.collection('opendb-news-favorite,jz-opendb-resources,uni-id-users');
				var skip = (this.param.page - 1) * this.param.rows || 0;
				var resultdata = await collection.where({
					user_id: uid,
					zy_gs: this.zy_gs
				}).field('article_title,article_id,create_date{title,avatar,author,resources}').orderBy('create_date','desc').skip(skip).get();
				var rows = resultdata.result.data;
				if (rows.length < this.param.rows) {
					this.loadStatus = 'nomore';
				} else {
					this.param.page++;
					this.loadStatus = 'loadmore';
				}
				console.log("rows111", rows);
				rows.forEach((item) => {
					var obj = item.article_id[0];
					if (obj) {
						delete obj.is_encryption;
						this.flowList.push(obj);
					}
				});
			} ///,user_id{nickname,avatar}
		}
	}
</script>
<style>

</style>
