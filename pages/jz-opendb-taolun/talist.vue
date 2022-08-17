<template>
	<view class="container jz-opendb-taolun-container">
		<u-navbar :is-back="true" title="TA的发帖"></u-navbar>
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}"
			collection="jz-opendb-taolun" @load="loadSuccess" :page-size="20"
			:where="where" orderby="last_modify_date desc"
			field="categories,article_status,comment_status,avatar,resources,excerpt">
			<!-- data:{{data}} -->
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="data">
				<view v-for="(item, index) in data" :key="item._id" class="item u-border-bottom" @click="$notMoreTap(todetail,'notTap',item)">
					
					<view class="title-wrap">
						<text class="title u-line-2" v-html="item.excerpt"></text>
					</view>
				</view>
			</view>
			<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
			
		<u-back-top :scroll-top="scrollTop" top="1000" mode="square" icon="arrow-up" tips="顶部"></u-back-top>
	</view>
</template>
<script>
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
		created(){
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
			// debugger;
			this.$refs.udb.loadMore()
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
		methods: {
			reload() {
				if (this.$refs.udb) {
					this.$refs.udb.loadData({
						clear: true
					}, () => {})
				}
			},
			todetail(item) {
				uni.navigateTo({
					url: "/pages/jz-opendb-taolun/detail/detail?id=" + item._id
				});
			},
			loadSuccess(data) {
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
		font-size: 18px;
		color: $u-content-color;
	}
	.u-icon{
		margin: 0 6px;
	}
	.jz-opendb-taolun-container{
		background-color: #fff;
	}
</style>
