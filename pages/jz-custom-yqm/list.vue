<template>
	<view class="container jz-container">
		<u-navbar :is-back="true" title="我的邀请码"></u-navbar>
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}"
			where="status==true&&user_id==$cloudEnv_uid" collection="jz-custom-yqm"
			field="user_name_type,user_name,value,status">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="data">
				<u-table>
					<u-tr class="u-tr">
						<u-th class="u-th" width="70%">邀请码</u-th>
						<u-th class="u-th">状态</u-th>
					</u-tr>
					<u-tr v-for="(item, index) in data" class="u-tr">
						<template v-if="item.value">
							<u-td class="u-td u-td-flex" width="70%">
								<view class="u-td1">
									{{item.value}}
								</view>
								<view class="u-td2">
									<u-button type="primary" size="mini" @click="copyvalue(item.value,$event)">复制
									</u-button>
								</view>
							</u-td>
							<u-td class="u-td"><view class="u-td3">{{item.status?'可使用':'失效'}}</view></u-td>
						</template>
					</u-tr>
				</u-table>
			</view>
			<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
		<uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" />
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	export default {
		data() {
			return {
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: ''
				}
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
			copyvalue(val) {
				uniCopy({
					content: val,
					success: (res) => {
						this.$refs.uToast.show({
							title: '复制成功',
							type: 'success'
						})
					},
					error: (e) => {
						this.$refs.uToast.show({
							title: '复制失败',
							type: 'error'
						})
					}
				})
			},
			handleItemClick(id) {
				uni.navigateTo({
					url: './detail?id=' + id
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
	.u-td-flex{
		position: relative;
		/* flex-direction: row;
		justify-c ontent: space-between;*/
	}
	
	.u-td {
		/* height: 36px; */
	}
	.u-td3{
		height: 30px;
	}
	.u-td1 {
		height: 30px;
		    display: inline-block;
			text-align: left;
	}
	.u-td2{
		height: 30px;
		    display: inline-block;
			    position: absolute;
			    right: 4px;
	}
	.u-td2 .u-btn{
		display: inline-block;
	}
</style>
