<template>
	<view class="er-item-list-operation" :style="{'background':background}">
		<view class="er-item-list-icon" @click.stop="tolike1()">
			<u-icon v-show="!islike" name="thumb-up" size="50"></u-icon>
			<u-icon v-show="islike" color="#777BCE" name="thumb-up-fill" size="50"></u-icon>
			<text class="er-item-list-icon-text">{{showtext?('点赞'+(data.like_count1||'')):data.like_count1||''}}</text>
		</view>
		<view class="er-item-list-icon" @click.stop="tofavator1()">
			<u-icon v-show="!isfavator" name="heart" size="50"></u-icon>
			<u-icon v-show="isfavator" color="#777BCE" name="heart-fill" size="50"></u-icon>
			<text class="er-item-list-icon-text">{{showtext?('收藏'+(data.like_count||'')):data.like_count||''}}</text>
		</view>
	</view>
</template>
<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	const db = uniCloud.database();
	const uid = db.getCloudEnv('$cloudEnv_uid');
	const collection = db.collection('opendb-news-favorite');
	const collection_like = db.collection('opendb-news-like');
	export default {
		data() {
			return {
				islike: false,
				isfavator: false
			}
		},
		props: {
			data: {
				type: Object,
				default () {
					return {}
				}
			},
			showtext:{
				type:Boolean,
				default(){
					return true
				}
			},
			background:{
				type:String,
				default(){
					return ""
				}
			}
		},
		computed:{
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			})
		},
		watch:{
			"data.like":{
				deep:false,
				handler(){
					this.initdata();
				}
			}
		},
		created(){
			
		},
		mounted(){
			this.initdata();
		},
		methods: {
			initdata(){
				// debugger;
				if(this.data.like&&this.data.like.length>0){
					this.$set(this,"islike",true)
				}else{
					this.$set(this,"islike",false)
				}
				if(this.data.favorite&&this.data.favorite.length>0){
					this.$set(this,"isfavator",true)
				}else{
					this.$set(this,"isfavator",false)
				}
			},
			topl() {
				this.$emit("topl", this.data);
			},
			async tolike1() {
				if(this.islike){
					await this.cancelFavorite_like();
				}else{
					await this.tolike();
				}
				this.$emit("tolike", this.data);
			},
			async tofavator1() {
				if(this.isfavator){
					await this.cancelFavorite();
				}else{
					await this.toFavorite();
				}
				this.$emit("tofavator", this.data);
			},
			async tolike() {
				// debugger;
				return new Promise(async (reslove) => {
					if (!this.data.like_count1) {
						this.data.like_count1 = 0;
					}
					this.$set(this, "islike", true);
					this.$set(this.data, "like", [{}]);
					this.$set(this.data, "like_count1", ++this.data.like_count1);
					var resultdata = await collection_like.add({
						article_id: this.data._id,
						article_title: this.data.title,
						zy_gs: this.data.zy_gs,
						user_id: db.getCloudEnv('$cloudEnv_uid'),
						buser_id: this.data.user_id,
						create_date: db.getCloudEnv('$cloudEnv_now')
					});
					
					this.add_like().then(async () => {
						var add_value = {
							type: 2,
							user_id: this.data.user_id,
							comment: this.userInfo.nickname+"点赞了你的作品【<span class='zyid' id='" + this.data._id +
								"'>" + this.data.title + "</span>】"
						}
						await db.collection("jz-custom-systeminfo").add(add_value);
						reslove();
					});
				});
			},
			async cancelFavorite_like() {
				return new Promise(async (reslove) => {
					this.$set(this, "islike", false);
					this.$set(this.data, "like", []);
					this.$set(this.data, "like_count1", --this.data.like_count1);
					var resultdata = await collection_like.where({
						article_id: this.data._id,
						user_id: db.getCloudEnv('$cloudEnv_uid')
					}).remove();
					this.cancel_like().then(() => {
						reslove()
					});
				});
			},
			cancel_like() {
				return new Promise((reslove) => {
					uniCloud.callFunction({
						name: 'jzlike',
						data: {
							action: 'like/cancel_like',
							data: {
								_id: this.data._id,
								like_count1: this.data.like_count1 || 0,
								type:"1"
							}
						},
					}).then((res) => {
						var res = res.result;
						if (res.state == "0000") {
							this.$set(this, "islike", false);
							// this.$set(this.data, "like", []);
							// this.$set(this.data, "like_count1", --this.data.like_count1);
						} else {
							console.log("res", res.msg);
							this.$set(this, "islike", true);
						}
						reslove();
					}).catch((err) => {
						this.$set(this, "islike", true);
						console.log("网络错误，请重试——err", err);
						uni.showModal({
							content: err.message || '网络错误，请重试',
							showCancel: false
						});
					});
				});
			},
			add_like() {
				return new Promise((reslove) => {
					
					uniCloud.callFunction({
						name: 'jzlike',
						data: {
							action: 'like/add_like',
							data: {
								_id: this.data._id,
								like_count1: this.data.like_count1 || 0,
								type:"1"
							}
						},
					}).then((res) => {
						var res = res.result;
						if (res.state == "0000") {
							this.$set(this, "islike", true);
							// this.$set(this.data, "like", [{}]);
							// this.$set(this.data, "like_count1", ++this.data.like_count1);
						} else {
							console.log("res", res.msg);
						}
						reslove();
					}).catch((err) => {
						console.log("网络错误，请重试——err", err);
						uni.showModal({
							content: err.message || '网络错误，请重试',
							showCancel: false
						});
					});
				});
			},
			async toFavorite() {
				// debugger;
				return new Promise(async (reslove) => {
					if (!this.data.like_count) {
						this.data.like_count = 0;
					}
					this.$set(this, "isfavator", true);
					this.$set(this.data, "favorite", [{}]);
					this.$set(this.data, "like_count", ++this.data.like_count);
					var resultdata = await collection.add({
						article_id: this.data._id,
						article_title: this.data.title,
						zy_gs: this.data.zy_gs,
						user_id: db.getCloudEnv('$cloudEnv_uid'),
						buser_id: this.data.user_id,
						create_date: db.getCloudEnv('$cloudEnv_now')
					});
					this.add_Favorite().then(async () => {
						var add_value = {
							type: 4,
							user_id: this.data.user_id,
							comment: this.userInfo.nickname+"收藏了你的作品【<span class='zyid' id='" + this.data._id +
								"'>" + this.data.title + "</span>】"
						}
						await db.collection("jz-custom-systeminfo").add(add_value);
						reslove();
					});
				});
			},
			async cancelFavorite() {
				return new Promise(async (reslove) => {
					this.$set(this, "isfavator", false);
					this.$set(this.data, "favorite", []);
					this.$set(this.data, "like_count", --this.data.like_count);
					var resultdata = await collection.where({
						article_id: this.data._id,
						user_id: db.getCloudEnv('$cloudEnv_uid')
					}).remove();
					this.cancel_Favorite().then(() => {
						reslove()
					});
				});
			},
			cancel_Favorite() {
				return new Promise((reslove) => {
					uniCloud.callFunction({
						name: 'jzfavator',
						data: {
							action: 'favator/cancel_favator',
							data: {
								_id: this.data._id,
								like_count: this.data.like_count || 0,
								type:"1"
							}
						},
					}).then((res) => {
						var res = res.result;
						if (res.state == "0000") {
							this.$set(this, "isfavator", false);
							// this.$set(this.data, "favorite", []);
							// this.$set(this.data, "like_count", --this.data.like_count);
						} else {
							console.log("res", res.msg);
							this.$set(this, "isfavator", true);
						}
						reslove();
					}).catch((err) => {
						this.$set(this, "isfavator", true);
						console.log("网络错误，请重试——err", err);
						uni.showModal({
							content: err.message || '网络错误，请重试',
							showCancel: false
						});
					});
				});
			},
			add_Favorite() {
				return new Promise((reslove) => {
				
					uniCloud.callFunction({
						name: 'jzfavator',
						data: {
							action: 'favator/add_favator',
							data: {
								_id: this.data._id,
								like_count: this.data.like_count || 0,
								type:"1"
							}
						},
					}).then((res) => {
						var res = res.result;
						if (res.state == "0000") {
							
							this.$set(this, "isfavator", true);
							// this.$set(this.data, "favorite", [{}]);
							// this.$set(this.data, "like_count", ++this.data.like_count);
						} else {
							console.log("res", res.msg);
							this.$set(this, "isfavator", false);
						}
						reslove();
					}).catch((err) => {
						this.$set(this, "isfavator", false);
						console.log("网络错误，请重试——err", err);
						uni.showModal({
							content: err.message || '网络错误，请重试',
							showCancel: false
						});
					});
				});
			},
		}
	}
</script>

<style>
	.er-item-list-operation {
		display: flex;
		justify-content: space-between;
		padding: 10px 80px;
		background: #EFEFF7;
		border-radius: 6px;
		margin-top: 5px;
	}

	.er-item-list-icon {
		display: flex;
	}

	.er-item-list-icon-text {
		line-height: 50rpx;
		margin-left: 4px;
	}
</style>
