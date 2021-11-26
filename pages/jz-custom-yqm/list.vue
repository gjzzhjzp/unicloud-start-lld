<template>
	<view class="container jz-container">
		<u-navbar :is-back="true" title="我的邀请码"></u-navbar>
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}"
			where="user_id==$cloudEnv_uid" collection="jz-custom-yqm"
			field="user_name_type,user_name,value,status,date">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="data">
				<u-table>
					<u-tr class="u-tr">
						<u-th class="u-th" width="60%">邀请码</u-th>
						<u-th class="u-th" width="10%">状态</u-th>
						<u-th class="u-th" width="30%">时间</u-th>
					</u-tr>
					<u-tr v-for="(item, index) in data" class="u-tr">
						<template v-if="item.value">
							<u-td class="u-td u-td-flex" width="60%">
								<view class="u-td1">
									{{item.value}}
								</view>
								<view class="u-td2">
									<u-button type="primary" size="mini" @click="copyvalue(item.value,$event)">复制
									</u-button>
								</view>
							</u-td>
							<u-td class="u-td" width="10%">
								<view class="u-td3">
								<u-icon size="36" v-show="item.status" name="checkmark"></u-icon>
								<u-icon size="36" v-show="!item.status" name="close"></u-icon>
								</view>
							</u-td>
							<u-td class="u-td" width="30%">
								<view class="u-td3">{{item.date}}</view>
							</u-td>
						</template>
					</u-tr>
				</u-table>
			</view>
			<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
		<view class="yqm-button">
			<view>
				<u-button type="primary" size="medium" @click="$notMoreTap(fabClick,'notTap')">申请邀请码</u-button>
			</view>
			<view style="margin-left: 20px;">
				<u-button type="warning" size="medium" @click="$notMoreTap(clearYqm,'notTap')">清除无效邀请码</u-button>
			</view>
		</view>
		
		<!-- <uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false"
			@fabClick="$notMoreTap(fabClick,'notTap')" /> -->
		<u-toast ref="uToast" />
		<u-modal v-model="showadd" title="申请邀请码" :show-cancel-button="true" @confirm="confirmAdd">
			<view class="slot-content" style="padding: 20px;">
				<u-alert-tips type="warning" :description="description"></u-alert-tips>
				<view style="margin-top: 10px;">
					<text style="margin-right: 20px;">申请个数</text>
					<u-number-box v-model="number" :max="5" :min="1" :size="32"></u-number-box>
				</view>
			</view>
		</u-modal>
	</view>
</template>
<script>
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	const db = uniCloud.database();
	const dbCollectionName = 'jz-custom-yqm';
	const uid = db.getCloudEnv('$cloudEnv_uid');
	export default {
		data() {
			return {
				number: 1,
				description: "邀请码用于查看加密资源详情，一天最多申请5个，每个邀请码用一次失效，且只能申请账号在申请当天使用，过期失效",
				showadd: false,
				notTap: true, //一定要设置为true
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
			// 确认申请邀请码
			async confirmAdd() {
				var number=this.number;
				var addvalues=[];
				for(var i=0;i<number;i++){
					var value={
						status:true,
						date:new Date().toLocaleDateString(),
						value:Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2)
					};
					addvalues.push(value);
				}
				
				var yqmlist = await db.collection(dbCollectionName).where({
					user_id:uid,
					date:new Date().toLocaleDateString()
				}).get();
				console.log("yqmlist",yqmlist);
				if(yqmlist.result.data&&yqmlist.result.data.length>5){
					uni.showToast({
					  title: '今日邀请码申请已达上线',
					  icon:"none"
					});
				}else{
					return db.collection(dbCollectionName).add(addvalues).then((res) => {
					  uni.showToast({
					    title: '新增成功'
					  });
					  if (this.$refs.udb) {
					  	this.$refs.udb.loadData({
					  		clear: true
					  	}, () => {});
					  }
					}).catch((err) => {
					  uni.showModal({
					    content: err.message || '请求服务失败',
					    showCancel: false
					  });
					});
				}
			},
			copyvalue(val) {
				uniCopy({
					content: val,
					success: (res) => {
						// #ifdef H5
						this.$refs.uToast.show({
							title: '复制成功',
							type: 'success'
						})
						// #endif
					},
					error: (e) => {
						this.$refs.uToast.show({
							title: '复制失败',
							type: 'error'
						})
					}
				});
			},
			// 清除无效邀请码
			async clearYqm(){
				var yqmlist = await db.collection(dbCollectionName).where({
					user_id:uid,
					status:false
				}).remove();
				console.log("yqmlist",yqmlist);
				uni.showToast({
				  title: '已清除',
				  icon:"none"
				});
				if (this.$refs.udb) {
					this.$refs.udb.loadData({
						clear: true
					}, () => {});
				}
			},
			handleItemClick(id) {
				uni.navigateTo({
					url: './detail?id=' + id
				})
			},
			fabClick() {
				this.showadd = true;
				// 打开新增页面
				// uni.navigateTo({
				// 	url: './add',
				// 	events: {
				// 		// 监听新增数据成功后, 刷新当前页面数据
				// 		refreshData: () => {
				// 			this.$refs.udb.loadData({
				// 				clear: true
				// 			})
				// 		}
				// 	}
				// })
			}
		}
	}
</script>

<style>
	.yqm-button{
		position: fixed;
		    bottom: 30px;
		    display: flex;
		    width: 100%;
		    left: 0;
		    justify-content: space-between;
		    padding: 20px;
	}
	.u-td-flex {
		position: relative;
		/* flex-direction: row;
		justify-c ontent: space-between;*/
	}

	.u-td {
		/* height: 36px; */
	}

	.u-td3 {
		height: 30px;
	}

	.u-td1 {
		height: 30px;
		display: inline-block;
		text-align: left;
	}

	.u-td2 {
		height: 30px;
		display: inline-block;
		position: absolute;
		right: 4px;
	}

	.u-td2 .u-btn {
		display: inline-block;
	}
</style>
