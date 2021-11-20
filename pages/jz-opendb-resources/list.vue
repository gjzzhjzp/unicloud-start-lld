<template>
	<view class="container">
		<u-navbar :is-back="true" title="我的投稿"></u-navbar>
		<view style="margin: 4px 0px;">
			<u-alert-tips type="warning" description="向左滑动可编辑/删除投稿资源"></u-alert-tips>
		</view>
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}"
			collection="jz-opendb-resources" @load="loadSuccess"
			where="user_id == $cloudEnv_uid"
			field="categories,labels,author,title,article_status,comment_status,avatar,resources,zy_gs,excerpt,content">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="data">
				<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item._id"
					@click="click" @open="open" :options="options">
					<view class="item u-border-bottom" @click="todetail(item)">
						<u-icon size="40" color="#18b566" v-if="item.article_status==1" name="checkmark"></u-icon>
						<u-icon size="40" color="#fa3534" v-else name="close"></u-icon>
						<image mode="aspectFill" :src="item.images" />
						<view class="title-wrap">
							<text class="title u-line-2">{{ item.title }}</text>
						</view>
					</view>
				</u-swipe-action>
			</view>
			<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
		<uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: ''
				},
				options: [{
						text: '编辑',
						style: {
							backgroundColor: '#7275D3'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
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
			this.$refs.udb.loadMore()
		},
		onShow() {
			this.reload();
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
					url: "/pages/detail/detail?id=" + item._id
				});
			},
			loadSuccess(data) {
				console.log("loadSuccess", data);
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
			},
			click(index, index1) {
				var id = this.list[index]._id;
				if (index1 == 1) {
					this.handleDelete(id);
				} else {
					this.handleItemClick(id);
					this.$set(this.list[index], "show", false);
				}
			},
			handleDelete(id) {
				this.$refs.udb.remove(id, {
					success: (res) => {
						// 删除数据成功后跳转到list页面
						uni.navigateTo({
			 			url: './list'
						})
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
			},
			handleItemClick(id) {
				uni.navigateTo({
					url: './edit?id=' + id
				})
			},
			fabClick() {
				// 打开新增页面
				uni.navigateTo({
					url: './add',
					events: {
						// 监听新增数据成功后, 刷新当前页面数据
						refreshData: () => {
							this.$refs.udb.loadData({
								clear: true
							})
						}
					}
				})
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
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
	.u-icon{
		margin: 0 6px;
	}
</style>
