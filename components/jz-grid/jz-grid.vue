<template>
	<div class="jz-grid">
		<swiper class="swiper" @change="change">
			<swiper-item>
				<u-grid :col="5" :border="false">
					<u-grid-item v-for="(item,index) in one_list" :key="index"
						@click="$notMoreTap(tomore,'notTap',item)">
						<u-image width="50px" height="50px" loading-icon="/static/center/nologin.png"
							error-icon="/static/center/nologin.png" :src="imageUrl(item)"></u-image>
						<view class="grid-text">{{item.name}}</view>
					</u-grid-item>
				</u-grid>
			</swiper-item>
			<swiper-item v-if="gridList.length>5">
				<u-grid :col="5" :border="false">
					<u-grid-item v-for="(item,index) in two_list" :key="index"
						@click="$notMoreTap(tomore,'notTap',item)">
						<u-image width="50px" height="50px" loading-icon="/static/center/nologin.png"
							error-icon="/static/center/nologin.png" :src="imageUrl(item)"></u-image>
						<view class="grid-text">{{item.name}}</view>
					</u-grid-item>
				</u-grid>
			</swiper-item>
		</swiper>
		<view class="indicator-dots" v-if="gridList.length>5">
			<view class="indicator-dots-item" :class="[current == 0 ? 'indicator-dots-active' : '']">
			</view>
			<view class="indicator-dots-item" :class="[current == 1 ? 'indicator-dots-active' : '']">
			</view>
		</view>
	</div>
</template>
<script>
	import dealimage from "@/common/dealimage.js"
	const db = uniCloud.database();
	export default {
		data() {
			return {
				current: 0,
				notTap: true, //一定要设置为true
				gridList: [],
				one_list: [],
				two_list: []
			}
		},
		created() {
			this.getList();
		},
		mixins:[dealimage],
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
			imageUrl(item) {
				if(item.icon){
					if (Array.isArray(item.icon)&&item.icon[0]) {
						return item.icon[0].url;
					} else {
						return item.icon.url||"";
					}
				}else{
					return "";
				}
				
			},
			tomore(item) {
				if(item.path){
					uni.navigateTo({
						url:item.path
					});
					// uni.navigateTo({
					// 	url: '/pages/resource/list?title=' + item.name
					// });
				}
			},
			async getList() {
				var categories = await db.collection("opendb-news-categories").get({
					getTree: {
						startWith: "flbm=='400000'" ////分类顶级编码
					}
				});
				if (categories.result && categories.result.data.length > 0) {
					// debugger;
					var gridList=categories.result.data[0].children;
					this.gridList = this.dealImgResource(gridList)
					this.one_list=this.gridList.slice(0,5);
					this.two_list=this.gridList.slice(5);
					console.log("one_list",this.one_list);
				}
			}
		}
	}
</script>
<style lang="scss">
	.grid-text {
		color: $u-type-primary;
		margin-top: 4px;
		font-size: 14px;
	}
	.jz-grid {
		padding: 0px 4px;
		background-color: #fff;
	}
	// .grid-text {
	// 		font-size: 28rpx;
	// 		margin-top: 4rpx;
	// 		color: $u-type-info;
	// 	}

	.swiper {
		height: 90px;
	}

	.indicator-dots {
		// margin-top: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.indicator-dots-item {
		background-color: $u-tips-color;
		height: 6px;
		width: 6px;
		border-radius: 10px;
		margin: 0 3px;
	}

	.indicator-dots-active {
		background-color: $u-type-primary;
	}
</style>
