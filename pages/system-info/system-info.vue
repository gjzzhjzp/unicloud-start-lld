<template>
	<view class="system-info">
		<u-navbar :is-back="true" title="我的消息"></u-navbar>
		<view class="">
			<uni-list class="center-list" v-for="(sublist , index) in ucenterList" :key="index">
				<uni-list-item v-for="(item,i) in sublist" :title="item.title" link :key="i"
					:class="[isnewinfo?item.class:'']" :clickable="true" :to="item.to"
					:thumb="item.thumb">
				</uni-list-item>
			</uni-list>
			<!-- <scroll-view id="scroll-Y" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
				<view class="all-system-info" id="all-system-info" :style="{'visibility': showinfo?'':'hidden'}">
					<view class="infos" v-for="(item,index) in infos" :key="index">
						<yd-chatitem ref="chatitem" :message="item.comment" :leftTime="item.comment_date"></yd-chatitem>
					</view>
				</view>
			</scroll-view> -->
		</view>
	</view>
</template>
<script>
	//
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	const db = uniCloud.database();
	const systeminfoTable = db.collection('jz-custom-systeminfo')
	export default {
		data() {
			return {
				scrollTop: 0,
				infos: [],
				showinfo: false,
				isnewinfo: false, ///是否有新的系统消息
				notTap: true, //一定要设置为true
				ucenterList: [
					[{
							"title": "点赞消息",
							"to": '/pages/system-info/system-info-detail?type=2',
							"thumb": "/static/newpage/like.png",
							"type":2
						},
						{
							"title": "评论消息",
							"to": '/pages/system-info/system-info-detail?type=3',
							"thumb": "/static/center/user.png",
							"type":3
						},
						{
							"title": "收藏消息",
							"to": '/pages/system-info/system-info-detail?type=4',
							"thumb": "/static/center/sc.png",
							"type":4
						},
						{
							"title": "关注消息",
							"to": '/pages/system-info/system-info-detail?type=5',
							"thumb": "/static/center/info.png",
							"type":5
						},
						{
							"title": "系统消息",
							"to": '/pages/system-info/system-info-detail?type=1',
							"thumb": "/static/center/question.png",
							"type":1
						}
					]
				],
				// message: "你的投稿视频【<span class='zyid' id='619ce4e1808fdd00017261d3'>蜀道难，难于上青天</span>】有宝子【】评论啦~~【啊啊啊啊啊啊啊这里是内容】"
			}
		},
		mounted() {
			var that = this;
			this.getinfos();
			setTimeout(() => {
				// debugger;
				var _height = $("#all-system-info").height();
				that.scrollTop = _height;
				that.showinfo = true;
			}, 500)
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			})
		},
		methods: {
			async getinfos() {
				var userInfo = uni.getStorageSync("userInfo");
				var res = await db.collection('jz-custom-systeminfo').where({
						user_id: userInfo._id,
						type: 1
					})
					.field("comment,comment_date").get();
				// console.log("res",res);
				if (res.result.data && res.result.data.length > 0) {
					this.infos = res.result.data;
					var ids = [];
					this.infos.forEach((item) => {
						ids.push(item._id);
					});
					uni.setStorageSync("systeminfo_" + this.userInfo._id, ids.join(","));
				}
			}
		}
	}
</script>
<style>
	.infos {
		margin-top: 20rpx;
	}

	.scroll-Y {
		height: calc(100vh - 88px);
	}
</style>
