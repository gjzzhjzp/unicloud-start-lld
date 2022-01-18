<template>
	<view :class="['detailhead','detailhead'+data.zy_gs]">
		<view style="background-color: #fff;border-radius: 8px;padding: 10px;margin-top: 10px;">
			<view class="detail-image-title">
				<view class="title">
					<commont-image
						:src="(data.userinfo&&data.userinfo[0]&&data.userinfo[0].avatar_file)?data.userinfo[0].avatar_file.url:''"
						:isoriginal="!!(data.userinfo&&data.userinfo[0].original==1)">
					</commont-image>
					<view class="original-title">
						<view @click="tgrHref()" style="color: #333333;font-size: 14px;">{{tgr}}</view>
						<uni-dateformat class="publish_date" :date="data.publish_date" format="yyyy-MM-dd"
							:threshold="[60000, 2592000000]" />
					</view>
				</view>
				<view class="er-item-list-gz">
					<u-button size="medium" shape="circle">关注</u-button>
				</view>
			</view>
			<!-- <view class="detail-title">
				{{data.title}}
			</view> -->
			<view class="detail-image-jj">
				<view class="detail-image-jj2" v-html="data.excerpt||'无'"></view>
			</view>
			<slot name="content">

			</slot>
		</view>


		<view class="detailhead-tabs">
			<u-tabs :list="tablist" :is-scroll="false" active-color="#777BCE" :current="current" @change="changeTab"></u-tabs>
			<view v-if="current==0">
				<slot name="comment"></slot>
			</view>
		</view>
		<!-- <view class="detail-image-sx3">
			<view class="showllsc" v-show="showllsc">
				<view class="detail-image-sx31">
					<u-icon name="eye" :size="30"></u-icon>浏览量：{{data.view_count||0}}
				</view>
				<view class="detail-image-sx32">
					<u-icon name="heart" :size="30"></u-icon>收藏量：{{data.like_count>0?data.like_count:0}}
				</view>
			</view>
			<view class="detail-image-sc">
				<view class="detail-image-sc1" v-show="!checkisLike" @click="toFavorite">
					<u-icon :size="30" name="heart"></u-icon> 收藏
				</view>
				<view class="detail-image-sc1" v-show="checkisLike" @click="cancelFavorite">
					<u-icon :size="30" name="heart-fill" color="red"></u-icon> 已收藏
				</view>
			</view>
		</view> -->

		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import detail from "./detail.js"
	import commontImage from "./commontImage.vue"
	export default {
		mixins: [detail],
		components: {
			commontImage
		},
		data() {
			return {
				showmp4Xz: false,
				showllsc: true,
				current: 0,
				tablist: [{
					name: '评论'
				}, {
					name: '点赞'
				}, {
					name: '收藏'
				}],
				showpl: true,
				showdanmu: true,
				showsendDanmu: true
			}
		},
		props: {
			data: {
				type: Object,
				default () {
					return {}
				}
			},
			plNumber: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		watch: {
			plNumber() {
				// this.tablist.forEach((item) => {
				// 	if (item.name.indexOf('评论') != -1) {
				// 		item.name = "评论" + this.plNumber
				// 	}
				// })
			}
		},
		created() {
			var config = getApp().globalData.systemconfig;
			var t_800005 = config["800005"];
			var t_800011 = config["800011"];
			var t_800017 = config["800017"];
			var t_800018 = config["800018"];
			var t_800019 = config["800019"];
			if (t_800017 == 1) {
				this.showpl = true;
			} else {
				this.showpl = false;
			}
			if (t_800018 == 1) {
				this.showdanmu = true;
			} else {
				this.showdanmu = false;
			}
			if (t_800019 == 1) {
				this.showsendDanmu = true;
			} else {
				this.showsendDanmu = false;
			}
			// if (this.showpl) {
			// 	this.tablist.push({
			// 		name: '评论'
			// 	});
			// }
			this.showmp4Xz = t_800005 == '1' ? true : false;
			this.showllsc = t_800011 == '1' ? true : false;
			// console.log("labels", this.labels);
		},
		computed: {
			labels() {
				var labels = this.data.labels;
				if (labels) {
					return labels.split("，")
				}
				return [];
			},
			tgr() {
				if (this.data.userinfo && this.data.userinfo.length > 0) {
					return this.data.userinfo[0].nickname || "佚名"
				}
				return "佚名"
			},
			tjcategories() {
				// debugger;
				var tjcategories = "";
				if (this.data.categorieszw) {
					tjcategories = this.data.categorieszw.split(",")[0];
				}
				return tjcategories;
			},
			checkisLike() {
				// debugger;
				var islike = false;
				if (this.islike || (this.data && this.data.favorite && this.data.favorite.length > 0)) {
					islike = true;
				} else {
					islike = false;
				}
				return islike;
			},
		},
		methods: {
			tgrHref() {
				if (this.data.userinfo && this.data.userinfo.length > 0) {
					var tgr = this.data.userinfo[0].nickname;
					if (tgr) {
						uni.navigateTo({
							url: "/pages/resource/list?user=" + tgr
						});
					}
				}
			},
			changenumber(plNumber) {
				this.$emit("changenumber", plNumber);
				// debugger;
				// var tabs=this.$parent.tablist;
				// console.log("tabs",tabs);
			},
			changeTab(index) {
				this.current = index;
			}
		}
	}
</script>

<style>
	.detailhead-tabs {
		margin-top: 10px;
		background-color: #fff;
		border-radius: 8px;
	}

	.original-title {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
	}

	.publish_date {
		font-size: 10px;
		color: #888888;
	}

	.detail-image-ly2 {
		display: flex;
	}

	.detail-image-ly2 .u-link {
		margin-top: 4px;
	}

	.showllsc {
		display: flex;
		flex-direction: row;
	}

	.detail-open {
		display: flex;
		flex-direction: row;
		text-align: center;
	}

	.detailtabs {
		border-bottom: 1px solid #ddd;
		display: flex;
		flex-direction: row;
	}

	.detail-title {
		font-size: 50rpx;
	}

	.detail-image-jj2 {
		font-size: 28rpx;
		line-height: 22px;
	}

	.detail-open {
		display: flex;
		flex-direction: row;
		margin: 10px 6px;
		font-size: 1em;
		color: #909399;
	}

	.detail-image-bq {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 6px;
	}

	.detail-image-bq1 {
		margin: 6px;
	}

	.detail-image-sx3 {
		display: flex;
		flex-direction: row;
		color: #909399;
		margin: 10px 6px;
		justify-content: space-between;
	}

	.detail-image-sx31,
	.detail-image-sx32 {
		display: flex;
		flex-direction: row;
	}

	.detail-image-sx32 {
		margin-left: 20px;
	}

	.detail-image-sc1 {
		display: flex;
		flex-direction: row;

	}

	.detail-image-sc1 .u-icon,
	.detail-image-sx3 .u-icon {
		margin-top: 3px;
		margin-right: 2px;
	}

	.detail-image-ly {
		display: flex;
		flex-direction: row;
		width: 100%;
		font-size: 1em;
		color: #909399;
	}

	.detail-image-ly1 {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 50%;
	}

	.detail-image-ly2 {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 50%;
		margin-left: 10px;
	}

	.detail-image-title {
		margin-top: 10px;
		margin-left: 6px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.detail-image-title .title {
		font-size: 36rpx;
		flex: 1;
		display: flex;
	}

	.detail-image-sx {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 10px;
		margin-left: 6px;
		font-size: 1em;
	}

	.detail-image-jj {
		display: flex;
		flex-direction: row;
		margin-top: 10px;
		margin-left: 6px;
		font-size: 1em;
		color: #333;
	}

	.detailhead1 .detail-image-ly {
		/* width: calc(100% - 110px); */
	}

	.detail-image-sc {
		display: flex;
		flex-direction: row;
	}

	.detail-image-sc .download-head {
		display: flex;
		flex-direction: row;
		text-decoration: none;
		/* color: inherit; */
		margin-left: 8px;
	}
</style>
