<template>
	<view class="jz-detail">
		<u-navbar :is-back="true" :title="title"></u-navbar>
		<view>
			<template v-if="!detaildata.aliyun_dz">
				<template v-if="zy_gs=='0'">
					<detail-image :data="detaildata"></detail-image>
				</template>
				<template v-else-if="zy_gs=='1'">
					<detail-mp4 :data="detaildata"></detail-mp4>
				</template>
				<template v-else-if="zy_gs=='2'">
					<detail-mp3 :data="detaildata"></detail-mp3>
				</template>
				<template v-else-if="zy_gs=='3'">
					<detail-image :data="detaildata"></detail-image>
					<!-- <detail-open :data="detaildata"></detail-open> -->
				</template>
			</template>
			<template v-else>
				<!-- &&detaildata.aliyun_dz.indexOf('.mp4')!=-1 -->
				<template v-if="zy_gs=='1'&&detaildata.aliyun_dz.indexOf('.mp4')!=-1">
					<detail-mp4 :data="detaildata"></detail-mp4>
				</template>
				<template v-else-if="zy_gs=='1'&&detaildata.aliyun_dz.indexOf('.mp4')==-1&&detaildata.resources.length>0">
					<detail-mp4 :data="detaildata"></detail-mp4>
				</template>
				<template v-else>
					<detail-open :data="detaildata"></detail-open>
				</template>
			</template>
		</view>
		<u-back-top :scroll-top="scrollTop" top="1000" mode="square" icon="arrow-up" tips="顶部"></u-back-top>
	</view>
</template>
<script>
	import {
		mapGetters
	} from 'vuex';
	import detailImage from "./detail-image.vue"
	import detailMp4 from "./detail-mp4.vue"
	import detailMp3 from "./detail-mp3.vue"
	import detailOpen from "./detail-open.vue"
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
			detailImage,
			detailMp4,
			detailMp3,
			detailOpen
		},
		created(){
			this.id=this.$Route.query.id;
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
		onUnload(){
			if(typeof plus!="undefined"){
			var pscreen = plus.webview.currentWebview().opener();
			mui.fire(pscreen, 'changescreen', {
				direction: "portrait-primary"
			});
			}
		},
		methods: {
			// 获取资源
			getResource(id) {
				var that=this;
				var uid=this.userInfo._id;
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'resource/getResource',
						data: {
							_id: id,
							uid:uid
						}
					},
				}).then((res) => {
					var res = res.result;
					if (res.state == "0000") {
						for(var key in res.rows[0]){
							that.$set(that.detaildata,key,res.rows[0][key]);
						}
						that.title = that.detaildata.title;
						that.zy_gs = that.detaildata.zy_gs;
						that.tohistory();
						uni.hideLoading()
					} else {
						console.log("res", res.msg);
					}
				}).catch((err)=>{
					console.log("网络错误，请重试——err",err);
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
					const collection = db.collection('opendb-news-history');
					var rows = await collection.where({
						article_id: this.detaildata._id,
						user_id: db.getCloudEnv('$cloudEnv_uid')
					}).get();
					if (rows.result && rows.result.data.length > 0) {
						await collection.where({
							_id: rows.result.data[0]._id
						}).update({
							buser_id: this.detaildata.user_id,
							update_date: db.getCloudEnv('$cloudEnv_now')
						});
					} else {
						await collection.add({
							article_id: this.detaildata._id,
							article_title: this.detaildata.title,
							user_id: db.getCloudEnv('$cloudEnv_uid'),
							buser_id: this.detaildata.user_id,
							create_date: db.getCloudEnv('$cloudEnv_now'),
							zy_gs: this.detaildata.zy_gs
						});
					}
				}
			}
		}
	}
</script>
<style>
	.jz-detail{
		height: 100vh;
		display: flex;
		    flex-direction: column;
			    background-color: #fff;
	}
	.jz-container-wl {
		/* text-indent: 2em; */
	}
</style>
