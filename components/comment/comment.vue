<template>
	<view class="comment-container">
		<view style="display:flex;justify-content: space-between;padding: 20rpx 20rpx;">
			<view>{{topleft}}</view>
			<view style="display:flex;" @click="toggleType()">
				<u-icon size="40" name="/static/comment/liebiao.png"></u-icon>
				{{topright}}
			</view>
		</view>
		<view  :class="['comment-container1','slot-gonggao_content',showsendpl?'':'nosendpl']">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" >
			<view class="comment" v-for="(res, index) in commentList" :key="res.id">
				<view class="left">
					<commont-image :src="res.user_id[0].avatar_file.url" :isoriginal="!!(res.user_id[0].original==1)">
					</commont-image>
				</view>
				<view class="right">
					<view class="top">
						<view class="name">{{ res.user_id[0].nickname }}</view>
					</view>
					<view class="content">{{ res.comment_content }}</view>
					<view class="reply-box">
						<view class="item" @tap="toAllReply(res)" v-if="index<3" v-for="(item, index) in res.children"
							:key="item.index">
							<text class="username">{{ item.user_id[0].nickname }}:</text>
							<text class="text">{{ item.comment_content }}</text>
						</view>
						<view class="all-reply" @tap="toAllReply(res)" v-if="res.children&&res.children.length>3">
							共{{ res.children.length }}条回复
							<u-icon class="more" name="arrow-right" :size="26"></u-icon>
						</view>
					</view>
					<view class="bottom">
						<uni-dateformat :threshold="[]" :date="res.comment_date" format="'yyyy-MM-dd hh:mm:ss">
						</uni-dateformat>
						<view class="bottom-right">
							<view class="itemb">
								<view class="like" :class="{ highlight: res.isLike }">
									<u-icon v-if="!res.isLike" name="/static/comment/like.png" :size="40" color="#A0A0A0"
										@click="getLike(index)">
									</u-icon>
									<u-icon v-if="res.isLike" name="thumb-up-fill" :size="40" color="rgb(114, 117, 211)"
										@click="getLike(index)"></u-icon>
									<view class="num" v-show="res.like_count>0">{{ res.like_count }}</view>
								</view>
								<!-- <u-icon size="40" name="/static/comment/like.png"></u-icon> -->
							</view>
							<view class="itemb">
								<u-icon size="40" @click="replycomment(res)" name="/static/comment/reply.png"></u-icon>
							</view>
							<view class="itemb">
								<u-icon size="40" @click="openmore(res)" name="/static/comment/more.png"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		</view>
		<u-popup v-model="showreply" mode="bottom" border-radius="30" height="90%">
			<view class="reply-container">
				<reply :res="currentData" :showsendpl="showsendpl" @reload="getComment" :zydata="zydata" @close="closepopup"></reply>
			</view>
		</u-popup>
		<view class="comment-container2" v-show="showsendpl">
			<view class="comment-input1">
				<u-input v-model="inputvalue" height="60" type="text" :border="true" :placeholder="placeholder" />
			</view>
			<text class="comment-input-button" @click="sendComment()">
				发送
			</text>
		</view>
		<operator ref="operator" @reload="getComment"></operator>
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
	export default {
		data() {
			return {
				scrollTop:0,
				toptype: "zx",
				topleft: "最新评论",
				topright: "按时间",
				commentList: [],
				inputvalue: "",
				showreply: false,
				currentData: {},
				placeholder: "发送一条友善的评论...",
				relaydata: {},
				showpl:true,
				showsendpl:true
			};
		},

		components: {
			reply,
			operator,
			commontImage
		},
		created() {
			var config = getApp().globalData.config;
			var t_800017 = config["800017"];//、显示评论
			var t_800018 = config["800018"];//、显示弹幕
			var t_800020 = config["800020"];//、显示发评论
			if(t_800017==1){
				this.showpl=true;
			}else{
				this.showpl=false;
			}
			if(t_800020==1){
				this.showsendpl=true;
			}else{
				this.showsendpl=false;
			}
			if(this.showpl){
				this.getComment();
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
		methods: {
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
				this.$refs.operator.curcomment=res;
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
				this.showreply = false;
			},
			// 发送评论
			async sendComment() {
				if(this.userInfo.forbiddenwords){
					this.$refs.uToast.show({
						title: '你已被禁言，请联系管理员',
						type: 'error'
					});
					return;
				}
				const uid = db.getCloudEnv('$cloudEnv_uid');
				await db.collection("opendb-news-comments").add({
					article_id: this.zydata._id,
					user_id: uid,
					comment_content: this.inputvalue,
					like_count: 0,
					comment_cj:this.relaydata.comment_cj||1,///评论层级
					comment_type: this.relaydata.comment_type || 0,
					reply_user_id: this.relaydata.reply_user_id || "0",
					reply_comment_id: this.relaydata.reply_comment_id || "0",
					all_reply_comment_id:this.relaydata.all_reply_comment_id || "0",
				});
				this.inputvalue = "";
				this.getComment();
			},
			// 回复
			replycomment(item) {
				console.log("item", item);
				this.placeholder = "回复 @" + item.user_id[0].nickname + ":";
				this.relaydata = {
					comment_cj:item.comment_cj+1,
					comment_type: 1,
					reply_user_id: item.user_id[0]._id,
					reply_comment_id: item._id,
					all_reply_comment_id:item.all_reply_comment_id+","+item._id
				}
			},
			// 跳转到全部回复
			toAllReply(item) {
				this.currentData = item;
				this.showreply = true;
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
						comment_id: that.commentList[index]._id,
						comment_content: that.commentList[index].comment_content
					});
				} else {
					that.commentList[index].like_count--;
					await db.collection("opendb-news-likepl").where({
						user_id: uid,
						comment_id: that.commentList[index]._id
					}).remove();
				}
				await db.collection("opendb-news-comments").where({
					_id: that.commentList[index]._id
				}).update({
					like_count: that.commentList[index].like_count
				});
			},
			// 评论列表
			async getComment() {
				uni.showLoading({
					title:"加载中"
				});
				var that = this;
				var comments = {};
				var dbcomments = db.collection("opendb-news-comments,uni-id-users").where({
					article_id: that.zydata._id
				}).field(
					"article_id,user_id{nickname,avatar_file,original},reply_user_id{nickname,avatar_file},comment_content,like_count,comment_type,comment_date,reply_comment_id,comment_cj,all_reply_comment_id"
				);
				if (that.toptype == "zx") {
					comments = await dbcomments.orderBy("comment_date", "desc").get();
				} else {
					comments = await dbcomments.orderBy("like_count", "desc").get();
				}
				console.log("comments",comments);
				if (comments.result && comments.result.data.length > 0) {
					// 获取当前登录用户点赞的评论列表
					var like_pl = [];
					var likepl = await db.collection("opendb-news-likepl").where({
						article_id: that.zydata._id,
						user_id: uid
					}).get();
					if (likepl.result && likepl.result.data.length > 0) {
						var likelist = likepl.result.data;
						likelist.forEach((item1) => {
							if (item1.comment_id) {
								like_pl.push(item1.comment_id);
							}
						})
					}
					comments.result.data.forEach((item2) => {
						if (like_pl.indexOf(item2._id) != -1) {
							this.$set(item2, "isLike", true);
						} else {
							this.$set(item2, "isLike", false);
						}
					});
					that.commentList = that.getTree(comments.result.data);
					if (that.currentData._id) {
						that.commentList.forEach((item) => {
							if (item._id == that.currentData._id) {
								that.currentData = item;
							}
						})
					}
					uni.hideLoading();
				}else{
					uni.hideLoading();
				}
			},
			getTree(data) {
				let result = [];
				let map = {};
				data.forEach(item => {
					map[item._id] = item;
				});
				data.forEach(item => {
					if (item.reply_comment_id[0] && item.reply_comment_id[0]._id) {
						let parent = map[item.reply_comment_id[0]._id];
						if (parent) {
							(parent.children || (parent.children = [])).push(item);
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
	.slot-gonggao_content {
		overflow: auto;
	}
	.slot-gonggao_content>uni-scroll-view{
		max-height: calc(100vh - 920rpx);
	}
	.slot-gonggao_content.nosendpl>uni-scroll-view{
		max-height: calc(100vh - 820rpx);
	}
	.bottom-right {
		display: flex;

		.itemb {
			margin: 0 10rpx;

			.like {
				display: flex;
			}
		}
	}

	.comment-input-button {
		line-height: 36px;
		margin: 0 16rpx;
		color: #909399;
	}

	.comment-container2 {
		display: flex;
		position: fixed;
		bottom: 0px;
		width: 100%;
		background-color: #fff;
		margin-left: -10px;
		padding: 10px;
		border-top: 1px solid #ddd;
	}

	.comment {
		display: flex;
		padding: 30rpx;

		.left {}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #9A9A9A;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
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
				margin-bottom: 10rpx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						color: #7275D3;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 28rpx;
				color: #9a9a9a;
				justify-content: space-between;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
