<template>
	<view class="container">
		<u-navbar :is-back="true" title="我的投稿"></u-navbar>
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}"
			collection="jz-opendb-resources" @load="loadSuccess"
			field="categories,labels,author,title,article_status,comment_status,avatar,resources,zy_gs,excerpt,content">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="data">
				<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item._id"
					@click="click" @open="open" :options="options">
					<view class="item u-border-bottom">
						<image mode="aspectFill" :src="item.images" />
						<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
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
						text: '编辑/查看',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				list:[]
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
		methods: {
			loadSuccess(data){
				console.log("loadSuccess",data);
				data.forEach((item)=>{
					this.$set(item,"images",item.avatar.url);
					this.$set(item,"show",false);
				});
				this.list=data;
				return data;
			},
			click(index, index1) {
				var id=this.list[index]._id;
				if (index1 == 1) {
					this.handleDelete(id);
				} else {
					this.handleItemClick(id);
					this.$set(this.list[index],"show",false);
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
</style>
