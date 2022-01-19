<template>
	<view class="er-item-list-operation">
		<view class="er-item-list-icon" @click="topl()">
			<u-icon name="chat" size="50"></u-icon>
			<text class="er-item-list-icon-text">99</text>
		</view>
		<view class="er-item-list-icon" @click="tolike()">
			<u-icon v-show="!islike" name="thumb-up" size="50"></u-icon>
			<u-icon v-show="islike" name="thumb-up-fill" size="50"></u-icon>
			<text class="er-item-list-icon-text">99</text>
		</view>
		<view class="er-item-list-icon" @click="tofavator()">
			<u-icon v-show="!isfavator" name="heart" size="50"></u-icon>
			<u-icon v-show="isfavator" name="heart-fill" size="50"></u-icon>
			<text class="er-item-list-icon-text">99</text>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	const db = uniCloud.database();
	const uid = db.getCloudEnv('$cloudEnv_uid');
	const collection = db.collection('opendb-news-favoriteTaolun');
	const collection_like = db.collection('opendb-news-likeTaolun');
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
			}
		},
		methods: {
			topl() {
				this.$emit("topl", this.data);
			},
			tolike() {
				await this.tolikeTaolun();
				this.$emit("tolike", this.data);
			},
			tofavator() {
				await this.toFavorite();
				this.$emit("tofavator", this.data);
			},
			async tolikeTaolun() {
				// debugger;
				return new Promise(async (reslove) => {
					var resultdata = await collection_like.add({
						article_id: this.data._id,
						article_title: this.data.title,
						categories: this.data.categories,
						user_id: db.getCloudEnv('$cloudEnv_uid'),
						create_date: db.getCloudEnv('$cloudEnv_now')
					});
					this.add_like_taolun().then(async () => {
						var add_value = {
							type: 4,
							user_id: this.data.user_id,
							comment: "你的帖子【<span class='ftid' id='" + this.data._id +
								"'>" + this.data.title + "</span>】被宝子【" + this.userInfo
								.nickname + "】点赞啦~~"
						}
						await db.collection("jz-custom-systeminfo").add(add_value);
						reslove();
					});
				});
			},
			async cancelFavorite_like() {
				return new Promise(async (reslove) => {
					var resultdata = await collection_like.where({
						article_id: this.data._id,
						user_id: db.getCloudEnv('$cloudEnv_uid')
					}).remove();
					this.cancel_like().then(() => {
						reslove()
					});
				});
			},
			cancel_like_like() {
				return new Promise((reslove) => {
					uniCloud.callFunction({
						name: 'jzlike',
						data: {
							action: 'like/cancel_likeTaolun',
							data: {
								_id: this.data._id,
								like_count: this.data.like_count || 0
							}
						},
					}).then((res) => {
						var res = res.result;
						if (res.state == "0000") {
							this.$set(this, "islike", false);
							this.$set(this.data, "like_count", --this.data.like_count);
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
			add_like_taolun() {
				return new Promise((reslove) => {
					if (!this.data.like_count) {
						this.data.like_count = 0;
					}
					uniCloud.callFunction({
						name: 'jzlike',
						data: {
							action: 'like/add_likeTaolun',
							data: {
								_id: this.data._id,
								like_count: this.data.like_count || 0
							}
						},
					}).then((res) => {
						var res = res.result;
						if (res.state == "0000") {
							this.$set(this, "islike", true);
							this.$set(this.data, "like_count", ++this.data.like_count);
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
			,
			async toFavorite() {
				// debugger;
				return new Promise(async (reslove) => {
					var resultdata = await collection.add({
						article_id: this.data._id,
						article_title: this.data.title,
						categories: this.data.categories,
						user_id: db.getCloudEnv('$cloudEnv_uid'),
						create_date: db.getCloudEnv('$cloudEnv_now')
					});
					this.add_Favorite().then(async () => {
						var add_value = {
							type: 4,
							user_id: this.data.user_id,
							comment: "你的帖子【<span class='ftid' id='" + this.data._id +
								"'>" + this.data.title + "</span>】被宝子【" + this.userInfo
								.nickname + "】收藏啦~~"
						}
						await db.collection("jz-custom-systeminfo").add(add_value);
						reslove();
					});
				});
			},
			async cancelFavorite() {
				return new Promise(async (reslove) => {
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
						name: 'jztaolun',
						data: {
							action: 'taolun/cancel_like',
							data: {
								_id: this.data._id,
								like_count: this.data.favator_count || 0
							}
						},
					}).then((res) => {
						var res = res.result;
						if (res.state == "0000") {
							this.$refs.uToast.show({
								title: '已取消',
								type: 'success'
							});
							this.$set(this, "isfavator", false);
							this.$set(this.data, "favator_count", --this.data.favator_count);
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
			add_Favorite() {
				return new Promise((reslove) => {
					if (!this.data.like_count) {
						this.data.like_count = 0;
					}
					uniCloud.callFunction({
						name: 'jztaolun',
						data: {
							action: 'taolun/add_like',
							data: {
								_id: this.data._id,
								like_count: this.data.like_count || 0
							}
						},
					}).then((res) => {
						var res = res.result;
						if (res.state == "0000") {
							this.$refs.uToast.show({
								title: '收藏成功',
								type: 'success'
							});
							this.$set(this, "isfavator", true);
							this.$set(this.data, "favator_count", ++this.data.favator_count);
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
		}
	}
</script>

<style>
	.er-item-list-operation {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		background: #EFEFF7;
		border-radius: 6px;
		margin-top: 20px;
	}

	.er-item-list-icon {
		display: flex;
	}

	.er-item-list-icon-text {
		line-height: 50rpx;
		margin-left: 4px;
	}
</style>
