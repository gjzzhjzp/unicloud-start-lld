<template>
	<view class="wrap reply_wrap">
		<view class="reply_head">
			<view class="reply_head1">
				<u-icon name="reload" :size="40" @click="reload()">
				</u-icon>
			</view>
			<view class="reply_head2">
				共 {{commentList.length}} 条回复
			</view>
			<view class="reply_head3">
				<u-icon name="close" :size="40" @click="close()">
				</u-icon>
			</view>
		</view>
		<u-gap height="4" bg-color="#E9E9E9"></u-gap>
		<view class="comment">
			<view class="top">
				<view class="left">
					<view class="heart-photo">
						<commont-image :src="res.user_id[0].avatar_file.url"
							:isoriginal="!!(res.user_id[0].original==1)">
						</commont-image>
						<!-- <image :src="res.user_id[0].avatar_file.url" mode=""></image> -->
					</view>
					<view class="user-info">
						<view class="name">{{ res.user_id[0].nickname }}</view>
						<view class="content">{{ res.comment_content }}</view>
					</view>
				</view>
			</view>
			<view style="display: flex;justify-content: space-between;margin-top:30rpx">
				<view class="date" style="margin-left: 70rpx;">
					<uni-dateformat :threshold="[]" :date="res.comment_date" format="'yyyy-MM-dd hh:mm:ss">
					</uni-dateformat>
				</view>
				<view class="bottom-right">
					<view class="itemb">
						<view class="like" :class="{ highlight: res.isLike }">
							<u-icon v-if="!res.isLike" name="thumb-up" :size="40" @click="getLike()">
							</u-icon>
							<u-icon v-if="res.isLike" name="thumb-up-fill" color="rgb(114, 117, 211)" :size="40"
								@click="getLike()"></u-icon>
							<view class="num" v-show="res.like_count>0">{{ res.like_count }}</view>
						</view>
					</view>
					<view class="itemb" @click="replycomment(res)">
						<u-icon size="40" name="/static/comment/reply.png"></u-icon>
					</view>
					<view class="itemb">
						<u-icon size="40" name="/static/comment/jubao.png"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<u-gap height="10" bg-color="#E9E9E9"></u-gap>
		<!-- <view style="display:flex;justify-content: space-between;padding: 20rpx 20rpx;">
			<view>{{topleft}}</view>
			<view style="display:flex;" @click="toggleType()">
				<u-icon size="40" name="/static/comment/liebiao.png"></u-icon>
				{{topright}}
			</view>
		</view> -->
		<view class="all-reply">
			<view class="item" v-for="(item, index) in commentList" :key="index">
				<view class="comment">
					<view class="top">
						<view class="left">
							<view class="heart-photo">
								<commont-image :src="item.user_id[0].avatar_file.url"
									:isoriginal="!!(item.user_id[0].original==1)">
								</commont-image>
								<!-- <image :src="item.user_id[0].avatar_file.url" mode=""></image> -->
							</view>
							<view class="user-info">
								<view class="name">{{ item.user_id[0].nickname }}</view>
								<view class="content" v-if="item.reply_comment_id[0]._id!=res._id">回复 <text
										style="color: #7275D3;">@{{item.reply_user_id[0].nickname}}</text>：{{ item.comment_content }}
								</view>
								<view class="content" v-else>{{ item.comment_content }}</view>
							</view>
						</view>
					</view>
					<!-- <view class="reply" v-if="item.reply_user_id.length>0">
						<view class="username">{{ item.reply_user_id[0].nickname }}</view>
						<view class="text">{{ item.reply_comment_id[0].comment_content }}</view>
					</view> -->
					<view style="display: flex;justify-content: space-between;margin-top:30rpx">
						<view class="date" style="margin-left: 70rpx;">
							<uni-dateformat :threshold="[]" :date="item.comment_date" format="'yyyy-MM-dd hh:mm:ss">
							</uni-dateformat>
						</view>
						<view class="bottom-right">
							<view class="itemb">
								<view class="like" :class="{ highlight: item.isLike }">
									<u-icon v-if="!item.isLike" name="thumb-up" :size="40" @click="getLike(index)">
									</u-icon>
									<u-icon v-if="item.isLike" name="thumb-up-fill" color="rgb(114, 117, 211)"
										:size="40" @click="getLike(index)">
									</u-icon>
									<view class="num" v-show="item.like_count>0">{{ item.like_count }}</view>
								</view>
							</view>
							<view class="itemb" @click="replycomment(item)">
								<u-icon size="40" name="/static/comment/reply.png"></u-icon>
							</view>
							<view class="itemb">
								<u-icon size="40" name="/static/comment/jubao.png"></u-icon>
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
		<view class="comment-container2">
			<view class="comment-input1">
				<u-input v-model="inputvalue" height="60" type="text" :border="true" :placeholder="placeholder" />
			</view>
			<text class="comment-input-button" @click="sendComment()">
				发送
			</text>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database();
	const uid = db.getCloudEnv('$cloudEnv_uid');
	import commontImage from "./commontImage.vue"
	export default {
		data() {
			return {
				toptype: "zx",
				topleft: "最新评论",
				topright: "按时间",
				commentList: [],
				comment: {},
				inputvalue: "",
				placeholder: "发送一条友善的评论...",
				relaydata: {},
				currentData: {},
			};
		},
		components: {
			commontImage
		},
		created() {
			this.getReply();
		},
		props: {
			res: {
				type: Object,
				default () {
					return {}
				}
			},
			zydata: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		watch: {
			res() {
				console.log("data11111111111", this.res);
				if (this.res.children) {
					this._dealChildren(this.res.children);
				}
				this.commentList.sort(function(a, b) {
					return b.comment_date > a.comment_date ? 1 : -1
				})
			}
		},
		mounted() {
			if (this.res.children) {
				this._dealChildren(this.res.children);
			}
			this.commentList.sort(function(a, b) {
				return b.comment_date > a.comment_date ? 1 : -1
			});
			// this.commentList = this.res.children;
			this.comment = this.res;
			console.log("this.commentList", this.commentList);
		},
		methods: {
			_dealChildren(ary) {
				ary.forEach((item) => {
					this.commentList.push(item);
					if (item.children && item.children.length > 0) {
						this._dealChildren(item.children);
					}
				});
			},
			// 回复
			replycomment(item) {
				console.log("item", item);
				this.placeholder = "回复 @" + item.user_id[0].nickname + ":";
				this.relaydata = {
					comment_type: 1,
					reply_user_id: item.user_id[0]._id,
					reply_comment_id: item._id
				}
			},
			// 发送评论
			async sendComment() {
				// debugger;
				var that = this;
				const uid = db.getCloudEnv('$cloudEnv_uid');
				await db.collection("opendb-news-comments").add({
					article_id: that.zydata._id,
					user_id: uid,
					comment_content: that.inputvalue,
					like_count: 0,
					comment_type: 1,
					reply_user_id: that.relaydata.reply_user_id || that.comment.user_id[0]._id,
					reply_comment_id: that.relaydata.reply_comment_id || that.comment._id
				});
				that.inputvalue = "";
				// this.getComment();
				that.$emit("reload");
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
				// this.getComment();
			},
			reload() {
				this.$emit("reload");
			},
			close() {
				this.$emit("close");
			},
			// 点赞
			async getLike(index) {
				// debugger;
				var that=this;
				if (typeof index != "undefined" && (index === 0 || index > 0)) {
					this.commentList[index].isLike = !this.commentList[index].isLike;
					if (this.commentList[index].isLike == true) {
						this.commentList[index].like_count++;
						await db.collection("opendb-news-likepl").add({
							article_id:this.zydata._id,
							user_id: uid,
							comment_id: that.commentList[index]._id,
							comment_content: that.commentList[index].comment_content
						});
					} else {
						this.commentList[index].like_count--;
						await db.collection("opendb-news-likepl").where({
							user_id: uid,
							comment_id: that.commentList[index]._id
						}).remove();
					}
					await db.collection("opendb-news-comments").where({
						_id: this.commentList[index]._id
					}).update({
						like_count: this.commentList[index].like_count
					});
				} else {
					if (this.comment.isLike == true) {
						this.comment.isLike = !this.comment.isLike;
						this.comment.like_count--;
						await db.collection("opendb-news-likepl").where({
							user_id: uid,
							comment_id: that.comment._id
						}).remove();
					} else {
						this.comment.isLike = !this.comment.isLike;
						this.comment.like_count++;
						await db.collection("opendb-news-likepl").add({
							article_id:this.zydata._id,
							user_id: uid,
							comment_id: this.comment._id,
							comment_content: this.comment.comment_content
						});
					}
					await db.collection("opendb-news-comments").where({
						_id: this.comment._id
					}).update({
						like_count: this.comment.like_count
					});
				}

			},
			// 回复列表
			getReply() {}
		}
	};
</script>

<style lang="scss" scoped>
	.comment-container2 {
		display: flex;
		position: fixed;
		bottom: 0px;
		width: 100%;
		background-color: #fff;
		padding: 10px;
		border-top: 1px solid #ddd;
	}

	.comment-input-button {
		line-height: 36px;
		margin: 0 16rpx;
		color: #909399;
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

	.reply_head {
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
	}

	.reply_head2 {
		font-size: 1.3em;
	}

	.comment {
		padding: 30rpx;
		font-size: 32rpx;
		background-color: #ffffff;

		.top {
			display: flex;
			justify-content: space-between;
		}

		.left {
			display: flex;

			.heart-photo {
				image {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					background-color: #f2f2f2;
				}
			}

			.user-info {
				margin-left: 10rpx;

				.name {
					color: #9A9A9A;
					font-size: 28rpx;
					margin-bottom: 4rpx;
				}

				.date {
					font-size: 20rpx;
					color: $u-light-color;
				}
			}
		}

		.right {
			display: flex;
			font-size: 20rpx;
			align-items: center;
			color: #9a9a9a;

			.like {
				margin-left: 6rpx;
			}

			.num {
				font-size: 26rpx;
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

	.all-reply {
		margin-top: 10rpx;
		padding-top: 20rpx;
		background-color: #ffffff;

		.all-reply-top {
			margin-left: 20rpx;
			padding-left: 20rpx;
			border-left: solid 4rpx #5677fc;
			font-size: 30rpx;
			font-weight: bold;
		}

		.item {
			border-bottom: solid 2rpx $u-border-color;
		}

		.reply {
			padding: 20rpx;
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			margin: 10rpx 0;

			.username {
				font-size: 24rpx;
				color: #7a7a7a;
			}
		}
	}
</style>
