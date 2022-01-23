<template>
	<view class="jz-container">
		<u-navbar :is-back="true" :title="title"></u-navbar>
		<view>
			<detail-image :data="detaildata"></detail-image>
		</view>
		<u-back-top :scroll-top="scrollTop" top="1000" mode="square" icon="arrow-up" tips="顶部"></u-back-top>
	</view>
</template>
<script>
	import {
		mapGetters
	} from 'vuex';
	import detailImage from "./detail-image.vue"
	export default {
		data() {
			return {
				scrollTop: 0,
				title: "",
				detaildata: {},
				id: "",
				zy_gs: "0" ///当前资源格式
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		components: {
			detailImage
		},
		created() {
			this.id = this.$Route.query.id;
			this.getResource(this.id);
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			})
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getResource(this.id);
			uni.stopPullDownRefresh();
		},
		onUnload() {
			if (typeof plus != "undefined") {
				var pscreen = plus.webview.currentWebview().opener();
				mui.fire(pscreen, 'changescreen', {
					direction: "portrait-primary"
				});
			}
		},
		methods: {
			// 获取资源
			getResource(id) {
				uni.showLoading({
					title:"加载中"
				})
				var that = this;
				var uid = this.userInfo._id;
				uniCloud.callFunction({
					name: 'jztaolun',
					data: {
						action: 'taolun/getResource',
						data: {
							_id: id,
							uid: uid
						}
					},
				}).then((res) => {
					var res = res.result;
					if (res.state == "0000") {
						for (var key in res.rows[0]) {
							that.$set(that.detaildata, key, res.rows[0][key]);
						}
						that.title = that.detaildata.title;
						that.tohistory();
						uni.hideLoading()
					} else {
						console.log("res", res.msg);
					}
				}).catch((err) => {
					console.log("网络错误，请重试——err", err);
					uni.showModal({
						content: err.message || '网络错误，请重试',
						showCancel: false
					});
				});
			},
			// 历史记录
			async tohistory() {
				if (this.hasLogin) {
					const db = uniCloud.database()
					const uid = db.getCloudEnv('$cloudEnv_uid');
					const collection = db.collection('opendb-news-historyTaolun');
					var rows = await collection.where({
						article_id: this.detaildata._id,
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
							article_id: this.detaildata._id,
							article_title: this.detaildata.title,
							user_id: db.getCloudEnv('$cloudEnv_uid'),
							create_date: db.getCloudEnv('$cloudEnv_now'),
							categories: this.detaildata.categories
						});
					}
				}
			}
		}
	}
</script>
<style>
	.jz-container-wl {
		/* text-indent: 2em; */
	}
</style>
