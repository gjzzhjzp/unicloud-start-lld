<template>
	<view class="wrap reply_wrap">
		<view class="reply_head">
			<view class="reply_head1">
				<u-icon name="reload" :size="20" @click="reload()">
				</u-icon>
			</view>
			<view class="reply_head2">
				共 {{commentList.length}} 条回复
			</view>
			<view class="reply_head3">
				<u-icon name="close" :size="20" @click="close()">
				</u-icon>
			</view>
		</view>
		<u-gap height="4" bg-color="#E9E9E9"></u-gap>
		<view class="comment">
			<view class="top">
				<view class="left" >
					<view class="heart-photo"  @click="tgrHref(res.user_id[0])">
						<commont-image :src="imageUrl(res)"
							:isoriginal="!!(res.user_id[0].original==1)">
						</commont-image>
					</view>
					<view class="user-info">
						<view class="name">{{ res.user_id[0].nickname }}</view>
						<view class="content">{{ res.comment_content }}</view>
					</view>
				</view>
			</view>
			<view class="flex1">
				<view class="date" style="margin-left: 35px;">
					<uni-dateformat :threshold="[]" :date="res.comment_date" format="'yyyy-MM-dd hh:mm:ss">
					</uni-dateformat>
				</view>
				<view class="bottom-right">
					<view class="itemb">
						<view class="like" :class="{ highlight: res.isLike }">
							<u-icon v-if="!res.isLike" name="/static/comment/like.png" :size="20" @click="getLike()">
							</u-icon>
							<u-icon v-if="res.isLike" name="thumb-up-fill" color="rgb(114, 117, 211)" :size="20"
								@click="getLike()"></u-icon>
							<view class="num" v-show="res.like_count>0">{{ res.like_count }}</view>
						</view>
					</view>
					<view class="itemb" @click="replycomment(res)">
						<u-icon size="20" name="/static/comment/reply.png"></u-icon>
					</view>
					<!-- <view class="itemb" @click="openmore(res)">
						<u-icon size="20" name="/static/comment/more.png"></u-icon>
					</view> -->
				</view>
			</view>
		</view>
		<u-gap height="10" bg-color="#E9E9E9"></u-gap>
		<!-- <view style="display:flex;justify-content: space-between;padding: 20rpx 20rpx;">
			<view>{{topleft}}</view>
			<view style="display:flex;" @click="toggleType()">
				<u-icon size="20" name="/static/comment/liebiao.png"></u-icon>
				{{topright}}
			</view>
		</view> -->
		<view :class="['slot-gonggao_content1',showsendpl?'':'nosendpl1']">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
				<view class="all-reply">
					<view class="item" v-for="(item, index) in commentList" :key="index">
						<view class="comment">
							<view class="top">
								<view class="left">
									<view class="heart-photo" @click="tgrHref(item.user_id[0])">
										<commont-image :src="imageUrl(item)"
											:isoriginal="!!(item.user_id[0].original==1)">
										</commont-image>
										<!-- <image :src="item.user_id[0].avatar_file.url" mode=""></image> -->
									</view>
									<view class="user-info">
										<view class="name">{{ item.user_id[0].nickname }}</view>
										<view class="content" v-if="item.reply_comment_id[0]._id!=res._id">回复 <text
												style="color: #7275D3;">@{{replyname(item)}}：</text>{{ item.comment_content }}
										</view>
										<view class="content" v-else>{{ item.comment_content }}</view>
									</view>
								</view>
							</view>
							<!-- <view class="reply" v-if="item.reply_user_id.length>0">
						<view class="username">{{ item.reply_user_id[0].nickname }}</view>
						<view class="text">{{ item.reply_comment_id[0].comment_content }}</view>
					</view> -->
							<view class="flex2">
								<view class="date" style="margin-left: 35px;">
									<uni-dateformat :threshold="[]" :date="item.comment_date"
										format="'yyyy-MM-dd hh:mm:ss">
									</uni-dateformat>
								</view>
								<view class="bottom-right">
									<view class="itemb">
										<view class="like" :class="{ highlight: item.isLike }">
											<u-icon v-if="!item.isLike" name="/static/comment/like.png" :size="20"
												@click="getLike(index)">
											</u-icon>
											<u-icon v-if="item.isLike" name="thumb-up-fill" color="rgb(114, 117, 211)"
												:size="20" @click="getLike(index)">
											</u-icon>
											<view class="num" v-show="item.like_count>0">{{ item.like_count }}</view>
										</view>
									</view>
									<view class="itemb" @click="replycomment(item)">
										<u-icon size="20" name="/static/comment/reply.png"></u-icon>
									</view>
									<view class="itemb" @click="openmore(item)">
										<u-icon size="20" name="/static/comment/more.png"></u-icon>
									</view>
								</view>
							</view>

						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="comment-container2" v-if="showsendpl">
			<view class="comment-input1">
				<u-input v-model="inputvalue" height="30" type="text" :border="true" :placeholder="placeholder" />
			</view>
			<text class="comment-input-button" @click="sendComment()">
				发送
			</text>
		</view>
		<operator ref="operator" @delete="deleteComment" @reload="reload()"></operator>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	const db = uniCloud.database();
	const uid = db.getCloudEnv('$cloudEnv_uid');
	import commontImage from "./commontImage.vue"
	import operator from "./operator.vue"
	import dealimage from "@/common/dealimage.js"
	export default {
		data() {
			return {
				scrollTop: 0,
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
			commontImage,
			operator
		},
		mixins:[dealimage],
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
			},
			showsendpl: {
				type: Boolean,
				default () {
					return true
				}
			}
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			})
		},
		watch: {
			res: {
				deep: true,
				handler() {
					this.commentList.splice(0, this.commentList.length);
					if (this.res.children) {
						this._dealChildren(this.res.children);
					}
					this.commentList.sort(function(a, b) {
						return b.comment_date > a.comment_date ? 1 : -1
					})
				}
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
		},
		methods: {
			imageUrl(item){
				if(item.user_id&&item.user_id[0]&&item.user_id[0].avatar_file){
					return item.user_id[0].avatar_file.url;
				}else{
					return ""
				}
			},
			deleteComment(id){
				// debugger;
				var delnumber = 0;
				this.commentList.forEach((item, index) => {
					if (item.comment_id == id || item.all_reply_comment_id.indexOf(id) != -1) {
						delnumber += 1;
						delete this.commentList[index]
					}
				});
				var _commentList=[];
				this.commentList.forEach((item1)=>{
					if(item1){
						_commentList.push(item1);
					}
				});
				this.commentList=_commentList;
				// this.commentList=JSON.parse(JSON.stringify(this.commentList));
				// this._dealcomment();
				// 更新评论数
				this.zydata.pl_count = this.zydata.pl_count - delnumber;
				db.collection("jz-opendb-taolun").where({
					_id: this.zydata._id
				}).update({
					pl_count: (this.zydata.pl_count || 0)
				});
			},
			replyname(item){
				if(Array.isArray(item.reply_user_id)){
					return item.reply_user_id[0].nickname
				}else if(Array.isArray(item.reply_user_id_info)){
					return item.reply_user_id_info[0].nickname
				}
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
			// reloadcomment(){
			// 	this.$emit("reload");
			// },
			openmore(res) {
				// debugger;
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
			_dealChildren(ary) {
				ary=this.dealImgResource(ary);
				ary.forEach((item) => {
					this.commentList.push(item);
					if (item.children && item.children.length > 0) {
						this._dealChildren(item.children);
					}
				});
			},
			// 回复
			replycomment(item) {
				this.placeholder = "回复 @" + item.user_id[0].nickname + ":";
				this.relaydata = {
					comment_type: 1,
					reply_user_id: item.user_id[0]._id,
					reply_user_id_info:item.user_id,
					comment_content:item.comment_content,
					reply_comment_id: item.comment_id,
					comment_cj: item.comment_cj + 1,
					all_reply_comment_id: item.all_reply_comment_id + "," + item.comment_id
				}
			},
			// 获取评论id
			getplid(){
				var plid = Math.random().toString(36).substr(2);
				return "pl_"+plid;
			},
			// 发送评论
			async sendComment() {
				// debugger;
				if (this.userInfo.forbiddenwords) {
					this.$refs.uToast.show({
						title: '你已被禁言，请联系管理员',
						type: 'error'
					});
					return;
				}
				var that = this;
				if(that.relaydata.all_reply_comment_id&&that.relaydata.all_reply_comment_id.indexOf("undefined")!=-1){
					that.$refs.uToast.show({
						title: '你的操作太快，请稍后再试',
						type: 'error'
					});
					return;
				}
				var senddata={
					article_id: that.zydata._id,
					user_id: uid,
					comment_id:this.getplid(),
					comment_content: that.inputvalue,
					like_count: 0,
					comment_type: 1,
					comment_cj: that.relaydata.comment_cj || 2, ///评论层级
					reply_user_id: that.relaydata.reply_user_id || that.comment.user_id[0]._id,
					reply_comment_id: that.relaydata.reply_comment_id || that.comment.comment_id,
					all_reply_comment_id: that.relaydata.all_reply_comment_id || that.comment
						.all_reply_comment_id + "," + that.comment.comment_id,
				}
				
				that.$set(that.zydata,"pl_count",that.zydata.pl_count?++that.zydata.pl_count:1);
				db.collection("jz-opendb-taolun").where({
					_id:that.zydata._id
				}).update({
					pl_count:that.zydata.pl_count,
					last_modify_date:new Date().getTime()
				});
				var _addsenddata = Object.assign(JSON.parse(JSON.stringify(senddata)), {
					user_id: [JSON.parse(JSON.stringify(that.userInfo))],
					reply_user_id_info:that.relaydata.reply_user_id_info||that.comment.user_id
				});
				////临时新增评论
				that.commentList.unshift(_addsenddata);
				if (that.comment.user_id[0]._id != that.userInfo._id) {
					var add_value = {
						type: 3,
						user_id: that.comment.user_id[0]._id,
						comment: this.userInfo.nickname+"回复了你的评论【<span class='ftid' id='"+this.zydata._id+"'>"+that.comment.comment_content+"</span>】:【" + this.inputvalue + "】"
					}
					await db.collection("jz-custom-systeminfo").add(add_value);
				}
				that.inputvalue = "";
				await db.collection("opendb-news-commentsTaolun").add(senddata);
				// this.getComment();
				// that.$emit("reload", that.relaydata.reply_comment_id || that.comment._id);
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
				var that = this;
				if (typeof index != "undefined" && (index === 0 || index > 0)) {
					this.commentList[index].isLike = !this.commentList[index].isLike;
					if (this.commentList[index].isLike == true) {
						this.commentList[index].like_count++;
						await db.collection("opendb-news-likeplTaolun").add({
							article_id: this.zydata._id,
							user_id: uid,
							comment_id: that.commentList[index].comment_id,
							comment_content: that.commentList[index].comment_content
						});
						var add_value = {
							type: 2,
							user_id: that.comment.user_id[0]._id,
							comment: this.userInfo.nickname+"点赞了你的评论【<span class='ftid' id='"+this.zydata._id+"'>"+that.commentList[index].comment_content+"</span>】"
						}
						 db.collection("jz-custom-systeminfo").add(add_value);
					} else {
						this.commentList[index].like_count--;
						await db.collection("opendb-news-likeplTaolun").where({
							user_id: uid,
							comment_id: that.commentList[index].comment_id
						}).remove();
					}
					await db.collection("opendb-news-commentsTaolun").where({
						comment_id: this.commentList[index].comment_id
					}).update({
						like_count: this.commentList[index].like_count
					});
				} else {
					if (this.comment.isLike == true) {
						this.comment.isLike = !this.comment.isLike;
						this.comment.like_count--;
						await db.collection("opendb-news-likeplTaolun").where({
							user_id: uid,
							comment_id: that.comment.comment_id
						}).remove();
					} else {
						this.comment.isLike = !this.comment.isLike;
						this.comment.like_count++;
						await db.collection("opendb-news-likeplTaolun").add({
							article_id: this.zydata._id,
							user_id: uid,
							comment_id: this.comment.comment_id,
							comment_content: this.comment.comment_content
						});
					}
					await db.collection("opendb-news-commentsTaolun").where({
						comment_id: this.comment.comment_id
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
	.flex1,
	.flex2 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 6px;
	}

	.slot-gonggao_content1 {
		overflow: auto;
	}

	.comment-input1 {
		flex: 1;
	}

	.slot-gonggao_content1>uni-scroll-view {
		max-height: calc(100vh - 320px);
	}

	.slot-gonggao_content1.nosendpl1>uni-scroll-view {
		max-height: calc(100vh - 270px);
	}

	.comment-container2 {
		display: flex;
		flex-direction: row;
		position: fixed;
		bottom: 0px;
		width: 100%;
		background-color: #fff;
		padding: 10px;
		border-top: 1px solid #ddd;
	}

	.comment-input-button {
		line-height: 36px;
		margin: 0 8px;
		color: #909399;
	}

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

	.reply_head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 15px;
	}

	.reply_head2 {
		font-size: 1.3em;
	}

	.comment {
		padding: 10px;
		font-size: 16px;
		background-color: #ffffff;

		.top {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		.left {
			display: flex;
			flex-direction: row;

			.heart-photo {
				image {
					width: 32px;
					height: 32px;
					border-radius: 50%;
					background-color: #f2f2f2;
				}
			}

			.user-info {
				margin-left: 5px;

				.name {
					color: #9A9A9A;
					font-size: 14px;
					margin-bottom: 2px;
				}

				.content {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					font-size: 14px;
				}

				.date {
					font-size: 10px;
					color: $u-light-color;
				}
			}
		}

		.right {
			display: flex;
			flex-direction: row;
			font-size: 10px;
			align-items: center;
			color: #9a9a9a;

			.like {
				margin-left: 3px;
			}

			.num {
				font-size: 13px;
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
		margin-top: 5px;
		padding-top: 10px;
		background-color: #ffffff;

		.all-reply-top {
			margin-left: 10px;
			padding-left: 10px;
			border-left: solid 2px #5677fc;
			font-size: 14px;
			font-weight: bold;
		}

		.item {
			border-bottom: solid 1px $u-border-color;
		}

		.reply {
			padding: 10px;
			background-color: rgb(242, 242, 242);
			border-radius: 6px;
			margin: 5px 0;

			.username {
				font-size: 12px;
				color: #7a7a7a;
			}
		}
	}
</style>
