<template>
	<view class="music-list-container">
		<view class="music-list" v-for="(item2,index2) in list" :key="index2">
			<view class="music-list-left">
				<text class="music-list-left-title">{{item2.title}}</text> <text
					class="music-list-left-title-1">—</text> <text
					class="music-list-left-author">{{item2.author}}</text>
			</view>
			<view class="music-list-right">
				<view class="music-list-right-icon" @click="to_operate(item2,'like',index2)">
					<u-image v-show="!item2.selected" width="60rpx" height="60rpx" src="/static/music/like.png">
					</u-image>
					<u-image v-show="item2.selected" width="60rpx" height="60rpx" src="/static/music/like_sed.png">
					</u-image>
				</view>     
				<!-- <view class="music-list-right-icon" @click="to_operate(item2,'download',index2)">
					<u-image v-show="!item2.download" width="60rpx" height="60rpx" src="/static/music/download.png"></u-image>
					<u-image v-show="item2.download" width="60rpx" height="60rpx" src="/static/music/download_sed.png"></u-image>
				</view> -->
				<view class="music-list-right-icon" @click="to_operate(item2,'play',index2)">
					<u-image v-show="!item2.play" width="60rpx" height="60rpx" src="/static/music/play.png"></u-image>
					<u-image v-show="item2.play" width="60rpx" height="60rpx" src="/static/music/play_sed.png">
					</u-image>
				</view>
			</view>
		</view>
		<view class="imt-audio" v-if="list.length>0">
			<imt-audio ref="imtaudio" @play="play" @pause="pause" continue :src="list[now].resources[0].url"
				:data="curdata" :now="now">
			</imt-audio>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import {
		mapGetters
	} from 'vuex';
	const db = uniCloud.database()
	export default {
		name: "musicList",
		// mixins: [detail],
		components: {
			// mp3
		},
		data() {
			return {
				data: {},
				allLove: [],
				now: 0
			}
		},
		computed: {
			curdata() {
				var data = this.list[this.now];
				console.log("data", data);
				return {
					title: data.title,
					author: data.author,
					avatarurl: data.avatar.url,
					selected: data.selected,
					play: data.play
				}
			},
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			})
		},
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		watch: {
			list() {
				if (this.allLove.length == 0) {
					this.getAllLove().then(() => {
						this.initList();
						console.log("this.list", this.list);
					});
				} else {

				}
			}
		},
		mounted() {
			console.log("this.list", this.list);
		},
		methods: {
			pause(index) {
				// debugger;
				this.$set(this.list[index], "play", false);
			},
			play(index) {
				// debugger;
				if (index == this.list.length) {
					index = 0;
				} else if (index < 0) {
					index = this.list.length - 1;
				}
				if (index < this.list.length && index >= 0) {
					this.now = index;
					this.$set(this.list[index], "play", true);
					this.tohistory(this.list[index]);
				}
			},
			initList() {
				this.list.forEach((item) => {
					if (this.allLove.indexOf(item._id) != -1) {
						this.$set(item, "selected", true);
					} else {
						this.$set(item, "selected", false);
					}
				});
			},
			to_operate(data, type, index) {

				this.data = data;
				if (type == "like") {
					this.toFavorite(data).then((resdata) => {
						this.initList();
					});
				} else if (type == "play") {
					// debugger;
					this.now = index;
					this.list.forEach((item, index1) => {
						if (index != index1) {
							this.$set(item, "play", false);
						}
					});
					if (!data["play"]) {
						this.$refs.imtaudio.play();
					} else {
						this.$refs.imtaudio.pause();
					}
				} else if (type == "download") {
					console.log("data", data);
					if(data.resources&&data.resources.length>0){
						window.open(data.resources[0].url);
					}
				}
			},
			// 历史记录
			async tohistory(data) {
				// debugger;
				if (this.hasLogin) {
					
					const uid = db.getCloudEnv('$cloudEnv_uid');
					const collection = db.collection('opendb-news-history');
					var rows = await collection.where({
						article_id: data._id,
						user_id: db.getCloudEnv('$cloudEnv_uid')
					}).get();
					if (rows.result && rows.result.data.length > 0) {
						await collection.where({
							_id: rows.result.data[0]._id
						}).update({
							update_date: db.getCloudEnv('$cloudEnv_now')
						});
					} else {
						await collection.add({
							article_id: data._id,
							article_title: data.title,
							user_id: db.getCloudEnv('$cloudEnv_uid'),
							create_date: db.getCloudEnv('$cloudEnv_now'),
							zy_gs: data.zy_gs
						});
					}
				} else {
					// uni.navigateTo({
					// 	url: "/pages/ucenter/login-page/index/index"
					// })
				}
			},
			async toFavorite(data) {
				if (this.hasLogin) {
					if(data.selected){
						this.$refs.uToast.show({
							title: '已收藏',
							type: 'warning'
						});
						return;
					}
					const collection = db.collection('opendb-news-favorite');
					return new Promise(async (reslove) => {
						var resultdata = await collection.add({
							article_id: data._id,
							article_title: data.title,
							zy_gs: data.zy_gs,
							user_id: db.getCloudEnv('$cloudEnv_uid'),
							create_date: db.getCloudEnv('$cloudEnv_now')
						});
						this.add_like(data).then(() => {
							this.allLove.push(data._id);
							reslove(data);
						});
					});
				} else {
					uni.navigateTo({
						url: "/pages/ucenter/login-page/index/index"
					})
				}
			},
			add_like(data) {
				return new Promise((reslove) => {
					if (!data.like_count) {
						data.like_count = 0;
					}
					uniCloud.callFunction({
						name: 'jzfunction',
						data: {
							action: 'resource/add_like',
							data: {
								_id: data._id,
								like_count: data.like_count || 0
							}
						},
					}).then((res) => {
						var res = res.result;
						if (res.state == "0000") {
							this.$refs.uToast.show({
								title: '收藏成功',
								type: 'success'
							});
							this.$set(data, "like_count", ++data.like_count);
						} else {
							console.log("res", res.msg);
						}
						reslove();
					});
				});
			},
			getAllLove() {
				// 获取当前登录人的所有收藏项
				var allLove = [];

				return new Promise(async (reslove) => {
					if (this.hasLogin) {
						const db = uniCloud.database();
						const uid = db.getCloudEnv('$cloudEnv_uid');
						const collection = db.collection('opendb-news-favorite');
						var resultdata = await collection.where({
							user_id: uid
						}).field('article_id').get();
						var rows = resultdata.result.data;
						rows.forEach((item) => {
							this.allLove.push(item.article_id);
						})
						// this.allLove=rows;
						console.log("rows111", this.allLove);
					} else {
						// uni.navigateTo({
						// 	url: "/pages/ucenter/login-page/index/index"
						// })
					}
					reslove();
				});
			}
		}
	}
</script>
<style>
	page {
		background-color: #fff;
	}

	.imt-audio {
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.music-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 10px 10px 10px 20px;
		border-bottom: 1px solid #e5e5e5;
	}

	.music-list-right {
		display: flex;
	}

	.music-list-right-icon {
		margin: 0px 5px;
	}

	.music-list-left-title {
		font-size: 16px;
		margin-right: 5px;
	}

	.music-list-left-author {
		margin-left: 5px;
		color: #BDBDBD;
	}

	.music-list-left-title-1 {
		color: #BDBDBD;
	}
</style>
