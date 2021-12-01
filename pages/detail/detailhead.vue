<template>
	<view :class="['detailhead','detailhead'+data.zy_gs]">
		<view class="detail-image-title">
			<view class="title">
				{{data.title}}
			</view>
			<view style="text-align: right;color: #909399;width: 120px;">
				<uni-dateformat class="last_modify_date" :date="data.last_modify_date" format="yyyy-MM-dd"
					:threshold="[60000, 2592000000]" />
			</view>
		</view>
		<view class="detail-image-sx">
			<view class="detail-image-ly">
				<view class="detail-image-ly1">来源：{{data.author}}</view>
				<view class="detail-image-ly2">投稿人：{{tgr}}</view>
			</view>
			<view class="detail-image-sc">
				<view class="detail-image-sc1" v-show="!islike" @click="toFavorite">
					<u-icon :size="30" name="heart"></u-icon> 收藏
				</view>
				<view class="detail-image-sc1" v-show="islike" @click="cancelFavorite">
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
		<!-- showllsc：{{showllsc}} -->
		<view class="detail-image-sx3" v-show="showllsc">
			<view class="detail-image-sx31">
				<u-icon name="eye" :size="30"></u-icon>浏览量：{{data.view_count||0}}
			</view>
			<view class="detail-image-sx32">
				<u-icon name="heart" :size="30"></u-icon>收藏量：{{data.like_count||0}}
			</view>
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
				showllsc: true
			}
		},
		props: {
			data: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		mounted() {
			// debugger;
			var config = getApp().globalData.config;
			var t_800005 = config["800005"];
			var t_800011 = config["800011"];
			this.showllsc = t_800011 == '1' ? true : false;
			this.showmp4Xz = t_800005 == '1' ? true : false;
			// console.log("this.showllsc",this.showllsc);
		},
		computed: {
			tgr() {
				if (this.data.userinfo && this.data.userinfo.length > 0) {
					return this.data.userinfo[0].nickname || "佚名"
				}
				return "佚名"
			}
		},
		methods: {

		}
	}
</script>

<style>
	.detail-image-sx3 {
		display: flex;
		color: #909399;
		margin: 10px 6px;
		justify-content: space-between;
	}

	.detail-image-sx31,
	.detail-image-sx32 {
		display: flex;
	}

	.detail-image-sc1 {
		display: flex;
	}

	.detail-image-sc1 .u-icon,
	.detail-image-sx3 .u-icon {
		margin-top: 3px;
		margin-right: 2px;
	}

	.detail-image-ly {
		display: flex;
		width: calc(100% - 65px);
	}

	.detail-image-ly1 {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 120px;
	}

	.detail-image-ly2 {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-left: 10px;
		max-width: 150px;
	}

	.detail-image-title {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
	}

	.detail-image-title .title {
		font-size: 36rpx;
	}

	.detail-image-sx,
	.detail-image-jj {
		display: flex;
		justify-content: space-between;
		margin: 10px 6px;
		color: #909399;
	}

	.detailhead1 .detail-image-ly {
		width: calc(100% - 110px);
	}

	.detail-image-sc {
		display: flex;
	}

	.detail-image-sc a {
		display: flex;
		text-decoration: none;
		color: inherit;
		margin-left: 8px;
	}
</style>
