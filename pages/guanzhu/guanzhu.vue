<template>
	<view class="container jz-opendb-resources-container">
		<u-navbar :is-back="true" title="我的关注"></u-navbar>
		<view style="margin: 4px 0px;">
			<u-alert-tips type="warning" description="向左滑动可管理关注列表"></u-alert-tips>
		</view>
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}"
			collection="opendb-news-guanzhu,uni-id-users" @load="loadSuccess" :page-size="10"
			where="user_id == $cloudEnv_uid" orderby="guanzhu_date desc"
			field="guanzhu_date,buser_id{nickname,username,avatar_file}">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="data">
				<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in data" :key="item._id"
					@click="click" @open="open" :options="options">
					<view class="item u-border-bottom" @click="$notMoreTap(todetail,'notTap',item)">
						<image mode="aspectFill" :src="item.buser_id[0].avatar_file?item.buser_id[0].avatar_file.url:''" />
						<view class="title-wrap">
							<text class="title u-line-2">{{ item.buser_id[0].nickname||item.buser_id[0].username }}</text>
						</view>
					</view>
				</u-swipe-action>
			</view>
			<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
		<u-back-top :scroll-top="scrollTop" top="1000" mode="square" icon="arrow-up" tips="顶部"></u-back-top>
	</view>
</template>
<script>
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
				options: [{
						text: '取关',
						style: {
							backgroundColor: '#7275D3'
						}
					}],
				list: []
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
		onShow() {
			this.reload();
		},
		methods: {
			reload() {
				// debugger;
				if (this.$refs.udb) {
					this.$refs.udb.loadData({
						clear: true
					}, () => {})
				}
			},
			todetail(item) {
				uni.navigateTo({
					url: "/pages/ucenter/tacenter?id=" + item.buser_id[0]._id
				});
			},
			loadSuccess(data) {
				data.forEach((item) => {
					// var url="";
					// if(item.avatar){
					// 	if(Array.isArray(item.avatar)){
					// 		url=item.avatar[0].url;
					// 	}else{
					// 		url=item.avatar.url;
					// 	}
					// }
					// this.$set(item, "images", url);
					this.$set(item, "show", false);
				});
				this.list = data;
				return data;
			},
			click(index, index1) {
				var id = this.list[index]._id;
				this.handleDelete(id);
			},
			handleDelete(id) {
				this.$refs.udb.remove(id, {
					confirmContent:"是否取关该用户？",
					success: (res) => {
						// 删除数据成功后跳转到list页面
						// uni.navigateTo({
			 		// 	url: './list'
						// })
					}
				})
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
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
		padding: 10px;
	}

	image {
		width: 60px;
		flex: 0 0 60px;
		height: 60px;
		margin-right: 10px;
		border-radius: 6px;
	}

	.title {
		text-align: left;
		font-size: 14px;
		color: $u-content-color;
		margin-top: 10px;
	}
	.u-icon{
		margin: 0 6px;
	}
</style>
