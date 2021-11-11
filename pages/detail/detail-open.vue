<template>
	<view class="detail-image">
		<view class="detail-image-title">
			<view class="title">
				{{data.title}}
			</view>
			<view style="text-align: right;color: #909399;">
				<uni-dateformat class="last_modify_date" :date="data.last_modify_date" format="yyyy-MM-dd"
					:threshold="[60000, 2592000000]" />
			</view>
		</view>
		<view class="detail-image-sx">
			<view>
				<text>来源：{{data.author}}</text>
				<text style="margin-left: 20px;">投稿人：{{tgr}}</text>
			</view>
			<view>
				<view v-show="!islike" @click="toFavorite">
					<u-icon :size="30"  name="heart"  ></u-icon> 收藏
				</view>
				<view v-show="islike">
					<u-icon :size="30"  name="heart-fill" color="red"></u-icon> 已收藏
				</view>
			</view>
		</view>
		<view class="detail-image-item">
			<image :src="data.avatar.url"  mode="widthFix"></image></view>
		<view class="detail-open">
				<view>
					外链地址：
				</view>
				<view>
					<u-link :href="data.aliyun_dz">点击跳转</u-link>
				</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import detail from "./detail.js"
	export default {
		data() {
			return {
				imgs: []
			}
		},
		mixins:[detail],
		props: {
			data: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed:{
			tgr(){
				if(this.data.userinfo&&this.data.userinfo.length>0){
					return this.data.userinfo[0].nickname
				}
				return ""
			}
		}
	}
</script>
<style>
	.detail-image-title {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
	}
	.detail-image-title .title{
		font-size: 36rpx;
	}

	.detail-image-sx,
	.detail-image-jj {
		display: flex;
		justify-content: space-between;
		margin: 10px 6px;
		color: #909399;
	}
	.detail-open{
		display: flex;
		text-align: center;
		/* padding-left: 20px; */
	}
	
	.detail-image-item {
		margin: 20rpx 0;
	}
	.detail-image-item image{
		width: 100%;
		border-radius: 10px;
	}
</style>
