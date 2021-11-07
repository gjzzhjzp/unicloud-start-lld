<template>
	<view class="detail-image">
		<view class="detail-image-title">
			{{data.title}}
		</view>
		<view class="detail-image-sx">
			<view>
				<text>作者：{{data.author}}</text>
				<text style="margin-left: 10px;">投稿人：{{tgr}}</text>
			</view>
			<view>
				<uni-dateformat class="last_modify_date" :date="data.last_modify_date" format="yyyy-MM-dd"
					:threshold="[60000, 2592000000]" />
			</view>
		</view>
		<view class="detail-image-sx">
			<view>
				<u-button size="mini" @click="toFavorite">收藏</u-button>
			</view>
			<view>
				浏览数：{{data.view_count||0}}
				收藏数：{{data.like_count||0}}
			</view>
		</view>
		<view class="detail-image-jj">
			<!-- {{data.excerpt}} -->
		</view>
		<view class="detail-image-item" v-for="(item,index) in data.resources" :key="index">
			<image :src="item.url" lazy-load @click="previewOpen(item)" :index="index" mode="widthFix"></image>
			<!-- <u-lazy-load @click="previewOpen(item)" threshold="300" border-radius="10" :image="item.url" :index="index"></u-lazy-load> -->
		</view>
		<kxj-previewImage ref="previewImage" :imgs="imgs"></kxj-previewImage>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				imgs: []
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
			async toFavorite() {
				const db = uniCloud.database()
				const uid = db.getCloudEnv('$cloudEnv_uid');
				const collection = db.collection('opendb-news-favorite');
				var resultdata = await collection.add({
					article_id: this.data._id,
					article_title: this.data.title,
					user_id: db.getCloudEnv('$cloudEnv_uid'),
					create_date: db.getCloudEnv('$cloudEnv_now')
				});
				this.add_like();
			},
			add_like() {
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'resource/add_like',
						data: {
							_id: this.data._id,
							like_count: this.data.like_count || 0
						}
					},
				}).then((res) => {
					var res = res.result;
					if (res.state == "0000") {
						console.log("res", res);
						this.$set(this.data, "like_count", ++this.data.like_count);
					} else {
						console.log("res", res.msg);
					}
				});
			},
		}
	}
</script>
<style>
	.detail-image-title {
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
	.detail-image-item image{
		width: 100%;
		border-radius: 10px;
	}
</style>
