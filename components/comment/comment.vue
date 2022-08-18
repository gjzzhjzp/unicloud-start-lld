<template>
	<view class="comment-container" @click.stop="replyResource()">
		<view class="comment-container-top">
			<view>{{topleft}}</view>
			<view class="comment-container-lb" @click.stop="toggleType()">
				<u-icon size="20" name="/static/comment/liebiao.png"></u-icon>
				{{topright}}
			</view>
		</view>
		<u-empty v-if="commentList.length==0&&!isloading" mode="data"></u-empty>
		<view :class="['comment-container1','slot-gonggao_content',showsendpl?'':'nosendpl']">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
				<u-loadmore v-if="isloading" status="loading" />

				<view class="comment" v-for="(res, index) in commentList" :key="res.id">
					<view class="left" @click="tgrHref(res.user_id[0])">
						<commont-image
							:src="(res.user_id[0]&&res.user_id[0].avatar_file)?res.user_id[0].avatar_file.url:''"
							:isoriginal="!!(res.user_id[0].original==1)">
						</commont-image>
					</view>
					<view class="right">
						<view class="top">
							<view class="name">{{ res.user_id[0].nickname }}</view>
						</view>
						<view class="content">{{ res.comment_content }}</view>
						<view class="reply-box">
							<view class="item" @tap="toAllReply(res)" v-if="index<3"
								v-for="(item, index) in res.allchildren" :key="item.index">
								<text class="username">{{ item.user_id[0].nickname }}:</text>
								<text class="text">{{ item.comment_content }}</text>
							</view>
							<view class="all-reply" @tap="toAllReply(res)"
								v-if="res.allchildren&&res.allchildren.length>3">
								共{{ res.allchildren.length }}条回复
								<u-icon class="more" name="arrow-right" :size="13"></u-icon>
							</view>
						</view>
						<view class="bottom">
							<uni-dateformat :threshold="[]" :date="res.comment_date" format="'yyyy-MM-dd hh:mm:ss">
							</uni-dateformat>
							<view class="bottom-right">
								<view class="itemb">
									<view class="like" :class="{ highlight: res.isLike }" @click.stop="getLike(index)">
										<u-icon v-if="!res.isLike" name="/static/comment/like.png" :size="20"
											color="#A0A0A0">
										</u-icon>
										<u-icon v-if="res.isLike" name="thumb-up-fill" :size="20"
											color="rgb(114, 117, 211)"></u-icon>
										<view class="num" v-show="res.like_count>0">{{ res.like_count }}</view>
									</view>
									<!-- <u-icon size="20" name="/static/comment/like.png"></u-icon> -->
								</view>
								<view class="itemb" @click.stop="replycomment(res)">
									<u-icon size="20" name="/static/comment/reply.png">
									</u-icon>
								</view>
								<view class="itemb" @click.stop="openmore(res)">
									<u-icon size="20" name="/static/comment/more.png"></u-icon>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="height: 50px;">
				</view>
			</scroll-view>
		</view>
		<u-popup v-model="showreply" mode="bottom" border-radius="30" height="90%">
			<view class="reply-container">
				<reply :res="currentData" :showsendpl="showsendpl" @reload="getComment" :zydata="zydata"
					@close="closepopup"></reply>
			</view>
		</u-popup>
		<view class="comment-container2" v-show="showsendpl">
			<view class="comment-input1">
				<u-input v-model="inputvalue" height="30" type="text" :border="true" :placeholder="placeholder" />
			</view>
			<text class="comment-input-button" @click.stop="sendComment()">
				发送
			</text>
		</view>
		<operator ref="operator" @delete="deleteComment"></operator>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	const db = uniCloud.database();
	const uid = db.getCloudEnv('$cloudEnv_uid');
	import reply from "./reply.vue"
	import commontImage from "./commontImage.vue"
	import operator from "./operator.vue"
	import dealimage from "@/common/dealimage.js"
	export default {
		data() {
			return {
				isloading: false, ///是否正在加载中
				scrollTop: 0,
				toptype: "zx",
				topleft: "最新评论",
				topright: "按时间",
				commentList: [],
				commentArray: [],
				inputvalue: "",
				showreply: false,
				currentData: {},
				placeholder: "发送一条友善的评论...",
				relaydata: {},
				showpl: true,
				showsendpl: true,
				like_pl: [],
				plNumber: 0, ///评论数
				oldid: "",
				pl_count: 0 ////评论数
			};
		},
		mixins:[dealimage],
		components: {
			reply,
			operator,
			commontImage
		},
		created() {
			var config = getApp().globalData.systemconfig;
			var t_800017 = config["800017"]; //、显示评论
			var t_800018 = config["800018"]; //、显示弹幕
			var t_800020 = config["800020"]; //、显示发评论
			if (t_800017 == 1) {
				this.showpl = true;
			} else {
				this.showpl = false;
			}
			if (t_800020 == 1) {
				this.showsendpl = true;
			} else {
				this.showsendpl = false;
			}
			if (this.showpl) {
				if (this.zydata._id) {
					this.getComment();
					this.oldid = this.zydata._id;
				}
			}
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			})
		},
		props: {
			zydata: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		watch: {
			zydata: {
				deep: true,
				handler() {
					// debugger;
					if (this.zydata._id && this.zydata._id != this.oldid) {
						this.getComment();
						this.oldid = this.zydata._id;
						this.pl_count = this.zydata.pl_count || 0;
					}
				}
			}
		},
		methods: {
			// 获取评论id
			getplid() {
				var plid = Math.random().toString(36).substr(2);
				return "pl_" + plid;
			},
			tgrHref(item) {
				// debugger;
				var id = item._id;
				if (id) {
					var userinfo = uni.getStorageSync("userInfo");
					if (userinfo._id == id) {
						uni.navigateTo({
							url: "/pages/ucenter/ucenter"
						});
					} else {
						uni.navigateTo({
							url: "/pages/ucenter/tacenter?id=" + id
						});
					}
				}
			},
			// 删除某条评论
			deleteComment(id) {
				// var _index=0;
				var delnumber = 0;
				this.commentArray.forEach((item, index) => {
					if (item.comment_id == id || item.all_reply_comment_id.indexOf(id) != -1) {
						delnumber += 1;
						delete this.commentArray[index]
						// delnumber++;
					}
					// else{
					// 	_index++;
					// }
				});
				this._dealcomment();
				// 更新评论数
				this.zydata.pl_count = this.zydata.pl_count - delnumber;
				db.collection("jz-opendb-resources").where({
					_id: this.zydata._id
				}).update({
					pl_count: (this.zydata.pl_count || 0)
				});
			},
			// 点击回复当前资源
			replyResource() {
				// debugger;
				this.placeholder = "发送一条友善的评论...";
				this.relaydata = {};
			},
			openmore(res) {
				if (res.user_id[0]._id == this.userInfo._id) {
					this.$refs.operator.list = [{
						text: "删除"
					}];
				} else {
					this.$refs.operator.list = [{
						text: "举报"
					}];
				}
				this.$refs.operator.curcomment = res;
				this.$refs.operator.open();
			},
			// 切换评论的显示方式
			toggleType() {
				if (this.toptype == "zx") {
					this.topleft = "热门评论";
					this.topright = "按热度";
					this.toptype = "rm";
				} else {
					this.topleft = "最新评论";
					this.topright = "按时间";
					this.toptype = "zx";
				}
				this.getComment();
			},
			closepopup() {
				var that = this;
				that.showreply = false;
				if (typeof plus != "undefined") {
					var pscreen = plus.webview.currentWebview().opener();
					mui.fire(pscreen, 'waitclose', {
						waitclose: "0"
					});
				}
			},
			// 发送评论
			async sendComment() {
				// debugger;
				var that = this;
				if (this.userInfo.forbiddenwords) {
					this.$refs.uToast.show({
						title: '你已被禁言，请联系管理员',
						type: 'error'
					});
					return;
				}
				if (that.relaydata.all_reply_comment_id && that.relaydata.all_reply_comment_id.indexOf("undefined") !=
					-1) {
					that.$refs.uToast.show({
						title: '你的操作太快，请稍后再试',
						type: 'error'
					});
					return;
				}
				const uid = db.getCloudEnv('$cloudEnv_uid');
				var senddata = {
					article_id: this.zydata._id,
					user_id: uid,
					comment_id: this.getplid(),
					comment_content: this.inputvalue,
					like_count: 0,
					comment_cj: this.relaydata.comment_cj || 1, ///评论层级
					comment_type: this.relaydata.comment_type || 0,
					reply_user_id: this.relaydata.reply_user_id || "0",
					reply_comment_id: this.relaydata.reply_comment_id || "0",
					all_reply_comment_id: this.relaydata.all_reply_comment_id || "0",
					comment_date: new Date().getTime()
				}
				// 评论层级为1，先插入静态数据,再去请求动态数据
				// debugger;
				// 增加评论数
				that.$set(that.zydata, "pl_count", that.zydata.pl_count ? ++that.zydata.pl_count : 1);

				db.collection("jz-opendb-resources").where({
					_id: this.zydata._id
				}).update({
					pl_count: that.zydata.pl_count,
					last_modify_date:new Date().getTime()
				});
				
				// if(!this.relaydata.comment_cj||this.relaydata.comment_cj==1){
				var _addsenddata = Object.assign(JSON.parse(JSON.stringify(senddata)), {
					user_id: [JSON.parse(JSON.stringify(this.userInfo))],
					reply_user_id_info: that.relaydata.reply_user_id_info
				});
				this.commentArray.unshift(_addsenddata);
				this._dealcomment();
				// }

				var add_value = [];
				if (this.relaydata.comment_cj && this.relaydata.comment_cj > 1) {
					if (that.zydata.user_id != that.userInfo._id) {
						add_value.push({
							type: 3,
							user_id: that.zydata.user_id,
							comment: that.userInfo.nickname + "回复了评论【<span class='zyid' id='" + this.zydata._id +
								"'>" + that.relaydata.comment_content + "</span>】【" + that.inputvalue + "】"
						});
						
					}
					if (that.relaydata.reply_user_id != that.userInfo._id) {
						add_value.push({
							type: 3,
							user_id: that.relaydata.reply_user_id,
							comment: that.userInfo.nickname + "回复了你的评论【<span class='zyid' id='" + this.zydata._id +
								"'>" + that.relaydata.comment_content + "</span>】【" + that.inputvalue + "】"
						})
					}
					
				} else {
					if (this.zydata.user_id != that.userInfo._id) {
						add_value.push({
							type: 3,
							user_id: this.zydata.user_id,
							comment: this.userInfo.nickname + "评论了你的作品【<span class='zyid' id='" + this.zydata._id +
								"'>" + this.zydata.title +
								"</span>】【" + this.inputvalue + "】"
						})
					}
					
				}
				if (add_value) {
					db.collection("jz-custom-systeminfo").add(add_value);
				}
				this.inputvalue = "";
				await db.collection("opendb-news-comments").add(senddata);
				// this.inputvalue = "";
				// if (this.relaydata.comment_cj > 1) {
				// 	this.getComment(this.relaydata.reply_comment_id);
				// } else {
				// 	this.getComment();
				// }
			},
			// 回复
			replycomment(item) {
				this.placeholder = "回复 @" + item.user_id[0].nickname + ":";
				this.relaydata = {
					comment_cj: item.comment_cj + 1,
					comment_type: 1,
					comment_content: item.comment_content,
					reply_user_id: item.user_id[0]._id,
					reply_user_id_info: item.user_id,
					reply_comment_id: item.comment_id,
					all_reply_comment_id: item.all_reply_comment_id + "," + item.comment_id
				}
			},
			// 跳转到全部回复
			toAllReply(item) {
				var that = this;
				this.currentData = item;
				this.showreply = true;
				//向父级窗口发送等待返回的消息,接收到消息否关闭该窗口
				if (typeof plus != "undefined") {
					var pscreen = plus.webview.currentWebview().opener();
					mui.fire(pscreen, 'waitclose', {
						waitclose: "1"
					});
					window.addEventListener('allowclose', function(e) {
						that.closepopup();
					});
				}
			},
			// 点赞
			async getLike(index) {
				// debugger;
				var that = this;
				this.commentList[index].isLike = !this.commentList[index].isLike;
				if (that.commentList[index].isLike == true) {
					that.commentList[index].like_count++;
					await db.collection("opendb-news-likepl").add({
						article_id: this.zydata._id,
						user_id: uid,
						comment_id: that.commentList[index].comment_id,
						comment_content: that.commentList[index].comment_content
					});
					var add_value = {
						type: 2,
						user_id: this.zydata.user_id,
						comment: this.userInfo.nickname + "点赞了你的评论【" + that.commentList[index].comment_content +
							"】"
					}
					db.collection("jz-custom-systeminfo").add(add_value);
				} else {
					that.commentList[index].like_count--;
					await db.collection("opendb-news-likepl").where({
						user_id: uid,
						comment_id: that.commentList[index].comment_id
					}).remove();
				}
				await db.collection("opendb-news-comments").where({
					comment_id: that.commentList[index].comment_id
				}).update({
					like_count: that.commentList[index].like_count
				});
			},
			// 评论列表
			async getComment(comment_id) {
				// debugger;
				// uni.showLoading({
				// 	title: "加载中"
				// });
				var that = this;
				that.isloading = true;
				var comments = {};
				var param = {
					article_id: that.zydata._id
				};
				if (comment_id) {
					Object.assign(param, {
						all_reply_comment_id: new RegExp(comment_id, 'gi')
					})
				}
				if (!param.article_id) {
					uni.hideLoading();
					return;
				}

				// 获取统计数量
				var rescount = await db.collection('opendb-news-comments').where(param).count();
				this.plNumber = rescount.result.total;
				this.$set(this.zydata, "pl_count", this.plNumber);
				db.collection("jz-opendb-resources").where({
					_id: this.zydata._id
				}).update({
					pl_count: (this.zydata.pl_count || 0)
				});

				// var dbcomments = db.collection("opendb-news-comments,uni-id-users").where(param).field(
				// 	"article_id,comment_id,user_id{nickname,avatar_file,original},reply_user_id{nickname,avatar_file},comment_content,like_count,comment_type,comment_date,reply_comment_id,comment_cj,all_reply_comment_id"
				// );
				var dbcomments=null;
				var f_c = Math.ceil(this.plNumber / 100);
				var res_comment = [];
				const _user = db.collection('uni-id-users').field('_id,nickname,avatar_file,original').getTemp();
				for (var i = 0; i < f_c; i++) {
					if (that.toptype == "zx") {
						const _resource = db.collection("opendb-news-comments").where(param).orderBy("comment_date", "desc").skip(100 * i).limit(100).getTemp();
						
						comments = await db.collection(_resource, _user).get();
						
						// comments = await dbcomments.orderBy("comment_date", "desc").skip(100 * i).limit(100).get();
					} else {
						const _resource = db.collection("opendb-news-comments").where(param).orderBy("like_count", "desc").skip(100 * i).limit(100).getTemp();
						
						comments = await db.collection(_resource, _user).get();
						// comments = await dbcomments.orderBy("like_count", "desc").skip(100 * i).limit(100).get();
					}
					// var list = await this.db.collection("jz-opendb-danmu").where({
					// 	resource_id: event.id
					// }).skip(100*i).limit(100).get();
					res_comment = res_comment.concat(comments.result.data)
				}


				// console.log("comments", comments);
				if (res_comment.length > 0) {

					// 获取当前登录用户点赞的评论列表
					// var like_pl = [];
					if (!comment_id) {
						// this.plNumber = comments.result.data.length;
						// this.$emit("changenumber", this.plNumber);
						var likepl = await db.collection("opendb-news-likepl").where({
							article_id: that.zydata._id,
							user_id: uid
						}).get();
						if (likepl.result && likepl.result.data.length > 0) {
							var likelist = likepl.result.data;
							likelist.forEach((item1) => {
								if (item1.comment_id) {
									this.like_pl.push(item1.comment_id);
								}
							})
						}
						res_comment.forEach((item2) => {
							if (this.like_pl.indexOf(item2._id) != -1) {
								this.$set(item2, "isLike", true);
							} else {
								this.$set(item2, "isLike", false);
							}
						});
						that.commentArray = res_comment;
						that._dealcomment();
						// that.commentList = that.getTree(res_comment);
						// that.commentList.forEach((item2) => {
						// 	if (item2.children) {
						// 		if (!item2.allchildren) {
						// 			that.$set(item2, "allchildren", []);
						// 		}
						// 		that._dealChildren(item2, item2.children);
						// 	}
						// });
						// if (that.currentData._id) {
						// 	that.commentList.forEach((item) => {
						// 		if (item._id == that.currentData._id) {
						// 			that.currentData = item;
						// 		}
						// 	})
						// }
					} else {
						// this.plNumber++;
						// this.$emit("changenumber", this.plNumber);
						that._setcomment(that.commentList, res_comment[0], comment_id);
						// console.log("that.commentList",that.commentList);
						that.commentList.forEach((item2) => {
							if (item2.children) {
								that.$set(item2, "allchildren", []);
								that._dealChildren(item2, item2.children);
							}
						})
					}
					// uni.hideLoading();
					that.isloading = false;
				} else {
					// uni.hideLoading();
					that.isloading = false;
				}
			},
			_dealcomment() {
				var that = this;
				this.commentArray=that.dealImgResource(this.commentArray);
				that.commentList = that.getTree(this.commentArray);
				that.commentList.forEach((item2) => {
					if (item2.children) {
						// if (!item2.allchildren) {
						that.$set(item2, "allchildren", []);
						// }
						that._dealChildren(item2, item2.children);
					}
				});
				if (that.currentData._id) {
					that.commentList.forEach((item) => {
						if (item._id == that.currentData._id) {
							that.currentData = item;
						}
					})
				}
			},
			_setcomment(ary, data, comment_id) {
				ary.forEach((item) => {
					if (item._id == comment_id) {
						if (!item.children) {
							this.$set(item, "children", []);
						}
						item.children.push(data);
					} else if (item.children && item.children.length > 0) {
						this._setcomment(item.children, data, comment_id);
					}
				})
			},
			_dealChildren(item2, ary) {
				ary.forEach((item) => {
					item2.allchildren.push(item);
					if (item.children && item.children.length > 0) {
						this._dealChildren(item2, item.children);
					}
				});
			},
			getTree(data) {
				// debugger;
				var commentid = "comment_id";
				let result = [];
				let map = {};
				data.forEach(item => {
					// if(!item[commentid]){
					// 	commentid="_id";
					// }
					delete item.children;
					map[item[commentid]] = item;
				});
				data.forEach(item => {
					// if(!item[commentid]){
					// 	commentid="_id";
					// }
					var reply_comment_id = item.reply_comment_id || (item.reply_comment_id[0] && item
						.reply_comment_id[0][commentid]);
					if (reply_comment_id) {
						let parent = map[reply_comment_id];
						if (parent) {
							if (!parent.children) {
								parent.children = [];
							}
							var flag = false;
							// debugger;
							parent.children.forEach((item1) => {
								if (item1[commentid] == item[commentid]) {
									flag = true;
								}
							})
							if (!flag) {
								parent.children.push(item);
							}
						} else {
							result.push(item);
						}
					} else {
						result.push(item);
					}
				});
				return result;
			}
		}
	};
</script>

<style lang="scss" scoped>
	// .comment-container1{
	// 	position: fixed;
	// 	bottom: 50px;
	// }
	.comment-container {
		background-color: #fff;
	}

	.slot-gonggao_content {
		overflow: auto;
	}

	.comment-container-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10px;
	}

	.comment-container-lb {
		display: flex;
		flex-direction: row;
	}

	.comment-input1 {
		flex: 1;
	}

	/* #ifdef H5 */
	.slot-gonggao_content>uni-scroll-view {
		max-height: calc(100vh - 410px);
	}

	.slot-gonggao_content.nosendpl>uni-scroll-view {
		max-height: calc(100vh - 410px);
	}

	/* #endif */
	.bottom-right {
		display: flex;
		flex-direction: row;

		.itemb {
			margin: 0 5px;

			.like {
				display: flex;
				flex-direction: row;
			}
		}
	}

	.comment-input-button {
		line-height: 30px;
		margin: 0 8px;
		color: #909399;
	}

	.comment-container2 {
		display: flex;
		flex-direction: row;
		position: fixed;
		bottom: 0px;
		width: 100%;
		background-color: #fff;
		// margin-left: -10px;
		padding: 10px;
		border-top: 1px solid #ddd;
	}

	.comment {
		display: flex;
		flex-direction: row;
		padding: 10px;

		.left {}

		.right {
			flex: 1;
			padding-left: 10px;
			font-size: 14px;

			.top {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 5px;

				.name {
					color: #9A9A9A;
				}

				.like {
					display: flex;
					flex-direction: row;
					align-items: center;
					color: #9a9a9a;
					font-size: 13px;

					.num {
						margin-right: 2px;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				margin-bottom: 5px;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 6px;

				.item {
					display: flex;
					flex-direction: row;
					padding: 10px;
					border-bottom: solid 1px $u-border-color;
					flex-flow: wrap;

					.username {
						color: #7275D3;
					}
				}

				.all-reply {
					padding: 10px;
					display: flex;
					flex-direction: row;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 3px;
					}
				}
			}

			.bottom {
				margin-top: 10px;
				display: flex;
				flex-direction: row;
				font-size: 14px;
				color: #9a9a9a;
				justify-content: space-between;

				.reply {
					color: #5677fc;
					margin-left: 5px;
				}
			}
		}
	}
</style>
