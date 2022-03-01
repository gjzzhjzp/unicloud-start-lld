<template>
	<view class="system-info">
		<u-navbar :is-back="true" :title="zwtype+'消息'"></u-navbar>
		<view class="">
			<scroll-view id="scroll-Y" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
				<view class="all-system-info" id="all-system-info">
					<view class="infos" v-for="(item,index) in infos" :key="index">
						<yd-chatitem class="infos-chatitem" ref="chatitem" :message="item.comment" :leftTime="item.comment_date"></yd-chatitem>
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
				zwtype:"系统",
				infotype:"",///消息类型
				message: "你的投稿视频【<span class='zyid' id='619ce4e1808fdd00017261d3'>蜀道难，难于上青天</span>】有宝子【】评论啦~~【啊啊啊啊啊啊啊这里是内容】"
			}
		},
		created(){
			this.infotype=this.$Route.query.type;///获取消息类型
			switch(this.infotype){
				case "1":
				this.zwtype="系统";
				break;
				case "2":
				this.zwtype="点赞";
				break;
				case "3":
				this.zwtype="评论";
				break;
				case "4":
				this.zwtype="收藏";
				break;
				case "5":
				this.zwtype="关注";
				break;
			}
			this.getinfos();
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			})
		},
		methods: {
			async getinfos() {
				// 按照最新消息排序,最新的显示在前面
				var userInfo = uni.getStorageSync("userInfo");
				if(userInfo&&userInfo._id){
					var res = await db.collection('jz-custom-systeminfo').where({
							user_id: userInfo._id,
							type: parseInt(this.infotype)||1
						}).field("comment,comment_date").orderBy("comment_date desc").get();
					if (res.result.data && res.result.data.length > 0) {
						this.infos = res.result.data;
						var curtime=new Date().getTime();
						uni.setStorageSync("systeminfo_time_" + this.infotype,curtime);
						uni.setStorageSync("systeminfo_last",curtime);
					}
				}
			}
		}
	}
</script>
<style>
	.infos-chatitem {
		padding: 6px;
		background-color: #fff;
	}
	.scroll-Y{
		height: calc(100vh - 88px);
	}
</style>
