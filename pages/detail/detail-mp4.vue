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
		<view class="detail-image-sl" style="text-align: right;color: #909399;">
			<!-- <view>
				<u-button v-show="!islike" size="mini" @click="toFavorite">收藏</u-button>
				<u-button v-show="islike" size="mini" disabled>已收藏</u-button>
			</view> -->
			<!-- <view>
				<u-icon name="heart"></u-icon><text style="margin-left: 2px;">收藏量：{{data.like_count||0}}</text>
				<u-icon name="eye" style="margin-left: 20px;"></u-icon><text style="margin-left: 2px;">浏览量：{{data.view_count||0}}</text>
			</view> -->
		</view>
		<!--<view class="detail-image-jj">
			 {{data.excerpt}} 
		</view>-->
		<view class="detail-image-item" v-for="(item,index) in data.resources" :key="index">
			<video id="myVideo" :src="item.url" controls></video>
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
		},
		
		mounted() {
			this.initImage();
		},
		watch:{
			"data.resources"(){
				this.initImage();
			}
		},
		methods: {
			initImage(){
				this.imgs.splice(0,this.imgs.length);
				if(this.data&&this.data.resources){
					this.data.resources.forEach((item)=>{
						this.imgs.push(item.url);
					})
				}
			},
			previewOpen(item){
				this.$refs.previewImage.open(item.url); 
			},
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

	.detail-image-item {
		margin: 20rpx 0;
	}
	.detail-image-item video{
		width: 100%;
		border-radius: 10px;
	}
</style>
