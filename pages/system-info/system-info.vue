<template>
	<view class="system-info">
		<u-navbar :is-back="true" title="我的消息"></u-navbar>
		<view class="">
			<uni-list class="center-list">
				<uni-list-item v-for="(item,i) in ucenterList" :title="item.title" link :key="i"
					:class="[item.isnewinfo?item.class:'']" :clickable="true" :to="item.to" :thumb="item.thumb">
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>
<script>
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
				notTap: true, //一定要设置为true
				ucenterList: [{
						"title": "点赞消息",
						"to": '/pages/system-info/system-info-detail?type=2',
						"thumb": "/static/newpage/like.png",
						"isnewinfo": false,
						"class": "systeminfo",
						"type": 2
					},
					{
						"title": "评论消息",
						"to": '/pages/system-info/system-info-detail?type=3',
						"thumb": "/static/center/user.png",
						"type": 3,
						"isnewinfo": false,
						"class": "systeminfo"
					},
					{
						"title": "收藏消息",
						"to": '/pages/system-info/system-info-detail?type=4',
						"thumb": "/static/center/sc.png",
						"type": 4,
						"isnewinfo": false,
						"class": "systeminfo"
					},
					{
						"title": "关注消息",
						"to": '/pages/system-info/system-info-detail?type=5',
						"thumb": "/static/center/info.png",
						"type": 5,
						"isnewinfo": false,
						"class": "systeminfo"
					},
					{
						"title": "系统消息",
						"to": '/pages/system-info/system-info-detail?type=1',
						"thumb": "/static/center/question.png",
						"type": 1,
						"isnewinfo": false,
						"class": "systeminfo"
					}
				]
			}
		},
		onShow() {
			this.checknewinfo(1);
			this.checknewinfo(2);
			this.checknewinfo(3);
			this.checknewinfo(4);
			this.checknewinfo(5);
		},
		mounted() {
			var that = this;
			setTimeout(() => {
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
			async checknewinfo(type) {
				var userInfo = uni.getStorageSync("userInfo");
				var last_time = uni.getStorageSync("systeminfo_time_" + type);
				var _obj = {
					user_id: userInfo._id,
					type: type
				}
				if (last_time) {
					Object.assign(_obj, {
						comment_date: db.command.gt(last_time)
					})
				}
				var res = await db.collection('jz-custom-systeminfo').where(_obj).field("comment").get();
				if (res.result.data && res.result.data.length > 0) {
					// debugger;
					this.ucenterList.forEach((item) => {
						if (item.type == type) {
							this.$set(item, "isnewinfo", true);
						}
					});
				} else {
					this.ucenterList.forEach((item) => {
						if (item.type == type) {
							this.$set(item, "isnewinfo", false);
						}
					});
				}
			},
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
