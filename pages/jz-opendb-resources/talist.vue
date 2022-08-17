<template>
	<view class="container jz-opendb-resources-container">
		<u-navbar :is-back="true" title="TA的投稿"></u-navbar>
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}"
			collection="jz-opendb-resources" @load="loadSuccess" :page-size	="10"
			:where="where" orderby="last_modify_date desc"
			field="categories,labels,author,title,article_status,comment_status,avatar,resources,zy_gs,excerpt,content">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="data">
				<view v-for="(item, index) in data" :key="item._id" class="item u-border-bottom" @click="$notMoreTap(todetail,'notTap',item)">
					<image mode="aspectFill" :src="item.images" />
					<view class="title-wrap">
						<text class="title u-line-2">{{ item.title }}</text>
					</view>
				</view>
			</view>
			<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
		<u-back-top :scroll-top="scrollTop" top="1000" mode="square" icon="arrow-up" tips="顶部"></u-back-top>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import dealimage from "@/common/dealimage.js"
	const db=uniCloud.database();
	export default {
		data() {
			return {
				openAdd:false,
				scrollTop:0,
				notTap:true,//一定要设置为true
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: ''
				},
				list: [],
				where:{},
				curuserinfo: {}, ////当前用户
			}
		},
		mixins:[dealimage],
		created(){
			// this.getUserinfo();
			// debugger;
			var _id = this.$Route.query.id;
			this.where={
				user_id:_id,
				article_status:1,
				is_off:db.command.neq(1)
			}
		},
		onPullDownRefresh() {
			this.$refs.udb.loadData({
				clear: true
			}, () => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			this.$refs.udb.loadMore()
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
		onShow() {
			// this.reload();
		},
		methods: {
			///获取用户信息
			async getUserinfo() {
				var _id = this.$Route.query.id;
				const usersTable = db.collection('uni-id-users')
				var userdata = await usersTable.where({
					_id: _id
				}).field(
					"username,weiboname,resources,weibocontent,nickname,isbdwb,original,forbiddenwords,status,avatar,avatar_file,role,register_date,token"
				).get();
				var userinf = userdata.result.data[0];
				this.curuserinfo = userinf;
			},
			reload() {
				// debugger;
				if (this.$refs.udb) {
					this.$refs.udb.loadData({
						clear: true
					}, () => {})
				}
			},
			todetail(item) {
				if(item.zy_gs=='2'){
					this.$refs.uToast.show({
						title: '音乐不支持查看详情',
						type: 'error'
					});
					return;
				}
				uni.navigateTo({
					url: "/pages/detail/detail?id=" + item._id
				});
			},
			loadSuccess(data) {
				data= this.dealImgResource(data);
				data.forEach((item) => {
					var url="";
					if(item.avatar){
						if(Array.isArray(item.avatar)){
							url=item.avatar[0].url;
						}else{
							url=item.avatar.url;
						}
					}
					this.$set(item, "images", url);
					this.$set(item, "show", false);
				});
				this.list = data;
				return data;
			}
		}
	}
</script>

<style>
	.jz-opendb-resources-container{
		background-color: #fff;
	}
	.item {
		display: flex;
		padding: 20rpx;
	}

	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}

	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
	.u-icon{
		margin: 0 6px;
	}
</style>
