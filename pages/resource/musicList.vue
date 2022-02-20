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
					<u-image v-show="!item2.selected" width="30px" height="30px" src="/static/music/like.png">
					</u-image>
					<u-image v-show="item2.selected" width="30px" height="30px" src="/static/music/like_sed.png">
					</u-image>
				</view>
				<view v-show="showMusicxz" class="music-list-right-icon" @click="to_operate(item2,'download',index2)">
					<!-- item2:{{item2.resources[0]}} -->
					<!-- <a :download='item2.title' :href="item2.resources?item2.resources[0].url:''"> -->
					<u-image @click="downloadfile(item2)" v-show="!item2.download"
						width="30px" height="30px" src="/static/music/download.png">
					</u-image>
					<!-- </a> -->
					<u-image v-show="item2.download" width="30px" height="30px" src="/static/music/download_sed.png">
					</u-image>
				</view>
				<view class="music-list-right-icon" @click="to_operate(item2,'play',index2)">
					<u-image v-show="!item2.play" width="30px" height="30px" src="/static/music/play.png"></u-image>
					<u-image v-show="item2.play" width="30px" height="30px" src="/static/music/play_sed.png">
					</u-image>
				</view>
			</view>
		</view>

		<template v-if="isEmpty">
			<view style="margin-top: 100rpx;">
				<u-empty text="数据为空" mode="list"></u-empty>
			</view>
		</template>
		<template v-else>
			<u-loadmore :status="loadStatus" @loadmore="loadmoreList"></u-loadmore>
		</template>
		<view class="imt-audio" v-if="list.length>0">
			<imt-audio ref="imtaudio" @togechi="togechi" @play="play" @pause="pause" continue
				:src="(list[now]&&list[now].resources)?list[now].resources[0].url:''" :data="curdata" :now="now">
			</imt-audio>
		</view>
		<u-popup v-model="showpopup" close-icon="/static/head/down.png" :close-icon-size="40" :mask="false"
			mode="bottom" height="80vh" @close="closePopup" :closeable="true" close-icon-color="#fff">
			<view>
				<gechi :curdata="list[now]" width="100%">
				</gechi>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import {
		mapGetters
	} from 'vuex';
	const db = uniCloud.database();
	import gechi from "@/components/gechi/gechi.vue"
	export default {
		name: "musicList",
		// mixins: [detail],
		components: {
			// mp3
			gechi
		},
		data() {
			return {
				showpopup: false,
				showMusicxz: true, ////是否显示音乐下载按钮
				data: {},
				allLove: [],
				now: 0
			}
		},
		created() {
			// debugger;
			var config = getApp().globalData.systemconfig;
			if (config) {
				var t_800006 = config["800006"];
				this.showMusicxz = t_800006 == '1' ? true : false;
			}
		},
		computed: {
			curdata() {
				var data = this.list[this.now];
				// console.log("data", data);
				var avatarurl = "";
				if (data) {
					if (Array.isArray(data.avatar)) {
						avatarurl = data.avatar[0].url;
					} else {
						avatarurl = data.avatar.url;
					}
					return {
						title: data.title,
						author: data.author,
						avatarurl: avatarurl,
						selected: data.selected,
						play: data.play
					}
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
			},
			isEmpty: {
				type: Boolean,
				default () {
					return false;
				}
			},
			loadStatus: {
				type: String,
				default () {
					return "";
				}
			}
		},
		watch: {
			list() {
				// debugger;
				if (this.allLove.length == 0) {
					this.getAllLove().then(() => {
						this.initList();
						// console.log("this.list", this.list);
					});
				} else {

				}
			}
		},
		mounted() {
			// console.log("this.list", this.list);
		},
		methods: {
			downloadfile(item2) {
				var url=item2.resources?item2.resources[0].url:'';
				var title=item2.title;
				if(!url){
					return;
				}
				axios({
				    method: 'get',
				    url: url,
				    // 必须显式指明响应类型是一个Blob对象，这样生成二进制的数据，才能通过window.URL.createObjectURL进行创建成功
				    responseType: 'blob',
				}).then((res) => {
				    if (!res) {
				        return
				    }
				    // 将lob对象转换为域名结合式的url
				    let blobUrl = window.URL.createObjectURL(res.data)
				    let link = document.createElement('a')
				    document.body.appendChild(link)
				    link.style.display = 'none'
				    link.href = blobUrl
				    // 设置a标签的下载属性，设置文件名及格式，后缀名最好让后端在数据格式中返回
				    link.download = title+'.mp3'
				    // 自触发click事件
				    link.click()
				    document.body.removeChild(link)
				    window.URL.revokeObjectURL(blobUrl);
					})

			},

			togechi() {
				var that=this;
				this.showpopup = true;
				// var data=this.list[this.now];
				// uni.navigateTo({
				// 	url:"/pages/gechiAll/gechiAll?id="+data._id
				// })
				// 打开歌词,向父级窗口发送等待返回的消息,接收到消息否关闭该窗口
				if(typeof plus!="undefined"){
				var pscreen = plus.webview.currentWebview().opener();
				mui.fire(pscreen, 'waitclose', {
					waitclose: "1"
				});
				window.addEventListener('allowclose', function(e) {
					that.closePopup();
				});
				}
			},
			closePopup(){
				var that=this;
				that.showpopup = false;
				if(typeof plus!="undefined"){
				var pscreen = plus.webview.currentWebview().opener();
				mui.fire(pscreen, 'waitclose', {
					waitclose: "0"
				});
				}
			},
			loadmoreList() {
				// console.log("-------------------------")
				this.$emit("loadmore");
			},
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
					// debugger;
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
				// debugger;
				this.data = data;
				if (type == "like") {
					if (!data.selected) {
						this.toFavorite(data).then((resdata) => {
							this.initList();
						});
					} else {
						this.cancelFavorite(data).then((resdata) => {
							this.initList();
						});
					}
				} else if (type == "play") {
					// debugger;
					this.now = index;
					this.list.forEach((item, index1) => {
						if (index != index1) {
							this.$set(item, "play", false);
						}
					});
					// setTimeout(()=>{
					if (!data["play"] && this.$refs.imtaudio) {
						this.$refs.imtaudio.play(this.now);
					} else {
						this.$refs.imtaudio.pause(this.now);
					}
					// },1000)
				} else if (type == "download") {
					// this.$refs.uToast.show({
					// 	title: '暂不开放',
					// 	type: 'warning'
					// });
					// return;
					// console.log("data", data);
					// if (data.resources && data.resources.length > 0) {
					// 	window.open(data.resources[0].url);
					// }
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
					if (data.selected) {
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
						url: "/pages/ucenter/login-page/pwd-login/pwd-login"
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
					}).catch((err)=>{
					console.log("网络错误，请重试——err",err);
					uni.showModal({
					  content: err.message || '网络错误，请重试',
					  showCancel: false
					});
				});
				});
			},
			async cancelFavorite(data) {
				const collection = db.collection('opendb-news-favorite');
				return new Promise(async (reslove) => {
					var resultdata = await collection.where({
						article_id: data._id,
						user_id: db.getCloudEnv('$cloudEnv_uid')
					}).remove();
					this.cancel_like(data).then(() => {
						// debugger;
						this.allLove.forEach((item, index) => {
							if (item == data._id) {
								this.allLove.splice(index, 1);
							}
						});
						// this.allLove.push(data._id);
						reslove();
					});
				});
			},
			cancel_like(data) {
				return new Promise((reslove) => {
					uniCloud.callFunction({
						name: 'jzfunction',
						data: {
							action: 'resource/cancel_like',
							data: {
								_id: data._id,
								like_count: data.like_count || 0
							}
						},
					}).then((res) => {
						var res = res.result;
						if (res.state == "0000") {
							this.$refs.uToast.show({
								title: '已取消',
								type: 'success'
							});
							this.$set(this.data, "like_count", --this.data.like_count);
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
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 99;
	}

	.music-list-container .u-load-more-wrap {
		height: 90px !important;
		align-items: flex-start;
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
