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
					<u-image v-if="!item2.selected" width="60rpx" height="60rpx" src="/static/music/like.png"></u-image>
					<u-image v-else width="60rpx" height="60rpx" src="/static/music/like_sed.png"></u-image>
				</view>
				<view class="music-list-right-icon" @click="to_operate(item2,'download',index2)">
					<u-image width="60rpx" height="60rpx" src="/static/music/download.png"></u-image>
					<!-- <u-image v-else width="60rpx" height="60rpx" src="/static/music/download_sed.png"></u-image> -->
				</view>
				<view class="music-list-right-icon" @click="to_operate(item2,'play',index2)">
					<u-image v-if="!item2.play" width="60rpx" height="60rpx" src="/static/music/play.png"></u-image>
					<u-image v-else width="60rpx" height="60rpx" src="/static/music/play_sed.png"></u-image>
				</view>
			</view>
		</view>
		<view>
			<mp3 ref="mp3" :list="list"></mp3>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import detail from "../detail/detail.js"
	import mp3 from "./mp3.vue"
	export default {
		name: "musicList",
		mixins: [detail],
		components: {
			mp3
		},
		data() {
			return {
				data: {},
				allLove: []
			}
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
		methods: {
			initList() {
				this.list.forEach((item) => {
					if (this.allLove.indexOf(item._id) != -1) {
						this.$set(item, "selected", true);
					} else {
						this.$set(item, "selected", false);
					}
				});
			},
			to_operate(data, type,index) {
				// debugger;
				this.data = data;
				if (type == "like") {
					this.toFavorite().then(() => {
						this.initList();
					});
				}else if (type == "play") {
					this.$refs.mp3.play(index);
					this.$set(data,"play",!data["play"]);
				}
			},
			getAllLove() {
				// 获取当前登录人的所有收藏项
				var allLove = [];
				return new Promise(async (reslove) => {
					// debugger;
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
					reslove();
				});
			}
		}
	}
</script>
<style>
	.music-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 10px 10px 10px 20px;
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
