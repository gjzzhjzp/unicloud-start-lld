<template>
	<view :class="['detailhead','detailhead'+data.zy_gs]">
		<slot name="content">

		</slot>
		<u-sticky>
			<view v-if="tablist.length>1||(showdanmu&&showsendDanmu)" class="detailtabs" style="">
				<view style="flex: 1;">
					<u-tabs :font-size="32" active-color="#7275D3" :list="tablist" :is-scroll="false" :bar-width="100"
						:current="current" @change="changeTab">
					</u-tabs>
				</view>
				<view style="background-color: #fff;" v-if="showdanmu&&showsendDanmu">
					<slot name="danmubutton"></slot>
				</view>
			</view>
		</u-sticky>
		<view v-show="current==0">
			<view class="detail-image-title">
				<view class="title">
					{{data.title}}
				</view>
				<view style="text-align: right;color: #909399;width: 120px;">
					<uni-dateformat class="last_modify_date" :date="data.last_modify_date" format="yyyy-MM-dd"
						:threshold="[60000, 2592000000]" />
				</view>
			</view>
			<view class="detail-image-sx3">
				<view class="showllsc" v-show="showllsc">
					<view class="detail-image-sx31">
						<u-icon name="eye" :size="30"></u-icon>浏览量：{{data.view_count||0}}
					</view>
					<view class="detail-image-sx32">
						<u-icon name="heart" :size="30"></u-icon>收藏量：{{data.like_count||0}}
					</view>
				</view>
				<view class="detail-image-sc">
					<view class="detail-image-sc1" v-show="!checkisLike" @click="toFavorite">
						<u-icon :size="30" name="heart"></u-icon> 收藏
					</view>
					<view class="detail-image-sc1" v-show="checkisLike" @click="cancelFavorite">
						<u-icon :size="30" name="heart-fill" color="red"></u-icon> 已收藏
					</view>
					<view class="detail-image-sc1" v-if="data.zy_gs=='1'&&showmp4Xz">
						<template v-if="data.resources.length>0">
							<a class="download-head" :download="data.title" :href="data.resources[0].url">
								<u-icon :size="30" name="download"></u-icon> 下载
							</a>
						</template>
					</view>
				</view>
			</view>
			<view class="detail-image-sx">
				<view class="detail-image-ly">
					<view class="detail-image-ly1">来源：{{data.author}}</view>
					<view class="detail-image-ly2">投稿人：{{tgr}}</view>
				</view>
			</view>
			<view class="detail-image-jj">
				<view class="detail-image-jj1">简介：</view>
				<view class="detail-image-jj2" v-html="data.excerpt||'无'"></view>
			</view>
			<view class="detail-open " style="" v-if="data.aliyun_dz&&data.aliyun_dz.indexOf('/jzmp4/')==-1">
				<view>
					外链地址：
				</view>
				<view>
					<u-link :href="data.aliyun_dz" color="rgb(114, 117, 211)">点击跳转</u-link>
				</view>
			</view>
			<view class="detail-image-bq">
				<view class="detail-image-bq1" v-for="(item,index) in labels" :key="index">
					<u-tag :text="'# '+item" type="primary" shape="circle" />
				</view>
			</view>
			<view style="margin-top: 40rpx;">
				<jz-sy-list ref="sylist" :label="tjcategories" :ignore="data._id" title="推荐资源" :showright="false"
					:zy_gs="data.zy_gs"></jz-sy-list>

			</view>
		</view>
		<view v-show="current==1">
			<slot name="comment"></slot>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import detail from "./detail.js"
	export default {
		mixins: [detail],
		data() {
			return {
				showmp4Xz: false,
				// labels: [],
				showllsc: true,
				current: 0,
				tablist: [{
					name: '简介'
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
				this.tablist.forEach((item) => {
					if (item.name.indexOf('评论') != -1) {
						item.name = "评论" + this.plNumber
					}
				})
				// this.tablist.push({
				// 	name: '评论'
				// });
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
			if (this.showpl) {
				this.tablist.push({
					name: '评论'
				});
			}
			this.showmp4Xz = t_800005 == '1' ? true : false;
			this.showllsc = t_800011 == '1' ? true : false;
			
			// console.log("labels", this.labels);
		},
		
		computed: {
			labels(){
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
				var islike=false;
				if (this.islike||(this.data && this.data.favorite && this.data.favorite.length > 0)) {
					islike = true;
				} else {
					islike = false;
				}
				return islike;
			},
		},
		methods: {
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

	.detail-image-jj1 {
		width: 3.5em;
	}

	.detail-image-jj2 {
		flex: 1;
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
.detail-image-bq1{
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
		color: #909399;
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
