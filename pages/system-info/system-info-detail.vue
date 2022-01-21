<template>
	<view class="system-info">
		<u-navbar :is-back="true" title="系统消息"></u-navbar>
		<view class="jz-container">
			<scroll-view id="scroll-Y" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
				<!-- :style="{'visibility': showinfo?'':'hidden'}" -->
				<view class="all-system-info" id="all-system-info">
					<view class="infos" v-for="(item,index) in infos" :key="index">
						<yd-chatitem ref="chatitem" :message="item.comment" :leftTime="item.comment_date"></yd-chatitem>
					</view>
				</view>
			</scroll-view>
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
				scrollTop:0,
				infos: [],
				// showinfo:false,
				infotype:"",///消息类型
				message: "你的投稿视频【<span class='zyid' id='619ce4e1808fdd00017261d3'>蜀道难，难于上青天</span>】有宝子【】评论啦~~【啊啊啊啊啊啊啊这里是内容】"
			}
		},
		created(){
			this.infotype=this.$Route.query.type;///获取消息类型
			this.getinfos();
		},
		mounted() {
			// var that=this;
			// setTimeout(()=>{
			// 	// debugger;
			// 	var _height=$("#all-system-info").height();
			// 	that.scrollTop=_height;
			// 	that.showinfo=true;
			// },500)
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			});
		},
		methods: {
			async getinfos() {
				// 按照最新消息排序,最新的显示在前面
				var userInfo = uni.getStorageSync("userInfo");
				var res = await db.collection('jz-custom-systeminfo').where({
						user_id: userInfo._id,
						type: this.infotype||1
					})
					.field("comment,comment_date").orderBy("comment_date desc").get();
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
	.scroll-Y{
		height: calc(100vh - 88px);
	}
</style>
