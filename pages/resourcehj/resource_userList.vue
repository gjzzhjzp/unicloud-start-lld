<template>
	<view class="container jz-opendb-taolun-container">
		<u-navbar :is-back="true" title="我的合集"></u-navbar>
		<view style="margin: 4px 0px;">
			<u-alert-tips type="warning" description="向左滑动可编辑/删除合集"></u-alert-tips>
		</view>
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}"
			collection="jz-opendb-resourceshj" @load="loadSuccess" :page-size="10" where="user_id == $cloudEnv_uid&&parent_id==null"
			orderby="create_date desc" field="hj_id,parent_id,article_id,resourceshj_title,sort,create_date,status">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="data">
				<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in data" :key="item._id"
					@click="click" @open="open" :options="options">
					<view class="item u-border-bottom" @click="$notMoreTap(todetail,'notTap',item)">
						<u-icon size="20" color="#18b566" v-if="item.status!=0" name="checkmark"></u-icon>
						<u-icon size="20" v-else name="/static/lock.png"></u-icon>
						<view class="title-wrap">
							<text class="title u-line-1" v-html="item.resourceshj_title"></text>
						</view>
					</view>
				</u-swipe-action>
			</view>
			<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
		<uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false"
			@fabClick="$notMoreTap(fabClick,'notTap')" />
		<u-back-top :scroll-top="scrollTop" top="1000" mode="square" icon="arrow-up" tips="顶部"></u-back-top>
		<u-modal v-model="showadd" @confirm="confirmadd" :show-cancel-button="true" title="请输入合集标题">
			<view class="slot-content" style="padding: 10px;">
				<u-input v-model="addvalue" type="text" placeholder="请输入标题" :border="true" />
			</view>
		</u-modal>
		<u-modal v-model="showedit" @confirm="confirmedit" :show-cancel-button="true" title="编辑合集标题">
			<view class="slot-content" style="padding: 10px;">
				<u-input v-model="editvalue" type="text" placeholder="请输入标题" :border="true" />
			</view>
		</u-modal>
		<u-modal v-model="showhjManage" width="100%" @cancel="showhjManage==false" :show-cancel-button="true"
			title="合集管理" @confirm="addhjzy" confirm-text="添加">
			<view style="color: red;padding: 0px 10px;">
				提示：新添加默认排序号为0，可手动修改
			</view>
			<view class="uni-container" style="height: 500px;overflow: auto;">
				<uni-table ref="table1" emptyText="'没有更多数据'" border stripe>
					<uni-tr>
						<uni-th align="center">资源</uni-th>
						<uni-th align="center" style="width: 100px;">排序</uni-th>
						<uni-th align="center" style="width: 120px;">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in hjdata" :key="item.hj_id">
						<uni-td align="center">{{item.article_id[0]?item.article_id[0].title:''}}</uni-td>

						<uni-td align="center" >
							<view style="justify-content:space-between;display:flex;align-content:center;">
								<view class="px" @contextmenu.stop.prevent="changepx(item)">
									<uni-easyinput v-if="item.xgpx" placeholder="排序号" type="number" v-model="item.sort">
									</uni-easyinput>
									<view v-else>
										{{item.sort}}
									</view>
								</view>
								<view style="display: flex;align-items: center;">
									<u-icon @click="changepx(item)" size="16" v-if="item.xgpx" name="checkmark-circle-fill"></u-icon>
									<u-icon @click="changepx(item)" size="16" v-else name="edit-pen-fill"></u-icon>
								</view>
							</view>
						</uni-td>
						<uni-td align="center" >
							<button @click="deletehjzy(item._id)" class="uni-button" size="mini"
								type="warn">删除</button>
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>

		</u-modal>
		<u-modal v-model="showaddhjzy" width="100%" @cancel="showaddhjzy==false" :show-cancel-button="true"
			title="新增合集资源" @confirm="confirmaddhjzy">
			<view class="uni-container" style="height: 500px;overflow: auto;">
				<view style="display: flex;padding: 10px;">
					<view style="flex: 3;">
						<u-input style="width: 100%;" v-model="searchvalue" type="text" :border="true" />
					</view>
					<view style="flex: 1;margin-left: 6px;">
						<u-button @click="searchValue" size="medium" type="primary">搜索</u-button>
					</view>
				</view>
				<!-- :where="listwhere" -->
				<unicloud-db ref="listudb" collection="jz-opendb-resources" field="title"
				:where="listwhere"
					 page-data="replace" orderby="publish_date desc" :getcount="true"
					:page-size="20" :page-current="options.pageCurrent"
					v-slot:default="{data,pagination,loading,error,options}" :options="options" loadtime="manual">
					<uni-table ref="listtable" :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe
						type="selection" @selection-change="listselectionChange">
						<uni-tr>
							<uni-th align="center">标题</uni-th>
						</uni-tr>
						<uni-tr v-for="(item,index) in data" :key="index">
							<uni-td align="center">{{item.title}}</uni-td>
						</uni-tr>
					</uni-table>
					<view class="uni-pagination-box">
						<uni-pagination show-icon :page-size="pagination.size" v-model="pagination.current"
							:total="pagination.count" @change="listonPageChanged" />
					</view>
				</unicloud-db>
			</view>
		</u-modal>
		<u-modal v-model="showdelete" :show-cancel-button="true" @confirm="confirmdelete">
			<view class="slot-content" style="padding: 10px;">
				确认删除吗？
			</view>
		</u-modal>
	</view>
</template>
<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				listwhere:{
					user_id : db.getCloudEnv('$cloudEnv_uid'),
					article_status: db.command.neq(0),
					is_off: db.command.neq(1)
				},
				searchvalue:"",
				showdelete: false,
				selectedIndexs: [],
				listselectedIndexs: [], ///多选处理
				showaddhjzy: false,
				showhjManage: false, //显示合集
				hjdata: [],
				curhjid: "", //正在编辑的id
				curhjzyid: "", ///当前的合集资源id
				showadd: false,
				showedit: false,
				editvalue: "",
				addvalue: "", ////合集标题
				scrollTop: 0,
				notTap: true, //一定要设置为true
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
					}, {
						text: '管理',
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
			// debugger;
			this.$refs.udb.loadMore()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow() {
			this.reload();
		},
		created() {},
		methods: {
			async deletehjzy(id) {
				var that = this;
				this.showdelete = true;
				this.curhjzyid = id;
			},
			async confirmdelete() {
				// debugger;
				var id=this.curhjzyid;
				var that=this;
				uni.showLoading({
					title: '操作中'
				});
				await db.collection("jz-opendb-resourceshj").where({
					"_id": id
				}).remove();
				await that.openhjgl(that.curhjid);
				uni.hideLoading();
			},
			// 多选
			listselectionChange(e) {
				this.selectedIndexs = e.detail.index
			},
			listonPageChanged(e) {
				this.listselectedIndexs.length = 0;
				if (this.$refs.listtable) {
					this.$refs.listtable.clearSelection()
				}
				this.$refs.listudb.loadData({
					current: e.current
				})
			},
			addhjzy() {
				this.showaddhjzy = true;
				this.showhjManage = true;
				setTimeout(() => {
					if (this.$refs.listudb) {
						this.$refs.listudb.loadData({
							clear: true
						}, () => {})
					}
				}, 500);
			},
			async confirmaddhjzy() {
				this.showhjManage = true;
				this.showaddhjzy = true;
				var lists = this.listselectedItems(this.curhjid);
				if (lists.length == 0) {
					uni.showToast({
						title: "请选择资源",
						icon: "none"
					});
					return;
				}
				uni.showLoading({
					title: '操作中'
				});
				this.showaddhjzy = false;
				await db.collection("jz-opendb-resourceshj").add(lists);
				// this.$refs.udb.loadData({
				// 	current: 1
				// });
				await this.openhjgl(this.curhjid);
				uni.hideLoading();
			},
			// 多选处理
			listselectedItems(hj_id) {
				debugger;
				var list = [];
				var dataList = this.$refs.listudb.dataList;
				// var sortinit = this.hjdata.length - 1 || 0;
				dataList.forEach((item, index) => {
					if (this.selectedIndexs.indexOf(index) != -1) {
						list.push({
							parent_id: hj_id,
							hj_id: hj_id + index,
							sort: parseInt(item.sort) || 0,
							article_id: item._id
						});
					}
				});
				return list;
			},
			async changepx(item) {
				this.$set(item, "xgpx", !(item.xgpx))
				if (!item.xgpx) {
					await db.collection("jz-opendb-resourceshj").where({
						"_id": item._id
					}).update({
						sort: parseInt(item.sort)
					})
					// debugger;
					this.openhjgl(item.parent_id);
				}
				// item.xgpx=!(item.xgpx);
			},
			async openhjgl(hj_id) {
				if (hj_id) {
					debugger;
					this.showhjManage = true;
					this.curhjid = hj_id;
					// 获取合集数据
					var res = await db.collection("jz-opendb-resourceshj,jz-opendb-resources").where({
						"parent_id": hj_id
					}).field("resourceshj_title,parent_id,sort,article_id{title,zy_gs,author},hj_id").orderBy(
						"sort asc").get();
					console.log("合集数据", res);
					if (res.result && res.result.data && res.result.data.length > 0) {
						this.hjdata = res.result.data;
					} else {
						this.hjdata = [];
					}
				}
			},
			searchValue(){
				Object.assign(this.listwhere,{
					title: new RegExp(this.searchvalue, 'gi')
				})
				this.$nextTick(() => {
					this.$refs.listudb.loadData()
				})
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
				uni.navigateTo({
					url: "/pages/resourcehj/resourcehj?id=" + item.hj_id
				});
			},
			loadSuccess(data) {
				data.forEach((item) => {
					var url = "";
					if (item.avatar) {
						if (Array.isArray(item.avatar)) {
							url = item.avatar[0].url;
						} else {
							url = item.avatar.url;
						}
					}
					this.$set(item, "images", url);
					this.$set(item, "show", false);
				});
				this.list = data;
				return data;
			},
			async click(index, index1) {
				// ;
				var item = this.list[index];
				console.log("debuggeritem",item);
				// var id = this.list[index]._id;
				var id = this.list[index].hj_id;
				if (index1 == 2) { ///删除
					this.handleDelete(id);
				} else if (index1 == 1) { ///管理
					uni.showLoading({
						title: '操作中'
					});
					await this.openhjgl(id);
					uni.hideLoading();
				} else { ///编辑
					this.handleItemClick(id, item);
					this.$set(this.list[index], "show", false);
				}
			},
			handleDelete(id) {
				this.$refs.udb.remove(id, {
					"confirmContent": "删除后不可恢复，确定删除？",
					success: async (res) => {

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
			// 编辑
			handleItemClick(id, item) {
				this.showedit = true;
				this.curhjid = id;
				this.editvalue = item.resourceshj_title;
			},
			fabClick() {
				this.addvalue = "";
				this.showadd = true;
			},
			// 新增合集
			async confirmadd() {
				this.showadd = true;
				if (!this.addvalue) {
					uni.showToast({
						title: "请输入合集标题",
						icon: "none"
					});
					return;
				}
				var hj_id = Math.random().toString(36).substr(2);
				var add = {
					resourceshj_title: this.addvalue,
					status: 1,
					hj_id: hj_id
				};
				uni.showLoading({
					title: '操作中'
				});
				this.showadd = false;
				await db.collection("jz-opendb-resourceshj").add(add);
				this.addvalue = "";
				this.reload();
				uni.hideLoading();
			},
			async confirmedit() {
				this.showedit = true;
				if (!this.editvalue) {
					uni.showToast({
						title: "请输入合集标题",
						icon: "none"
					});
					return;
				}
				uni.showLoading({
					title: '操作中'
				});
				this.showedit = false;
				// debugger;
				await db.collection("jz-opendb-resourceshj").where({
					hj_id: this.curhjid
				}).update({
					resourceshj_title: this.editvalue
				});
				this.editvalue = "";
				this.reload();
				uni.hideLoading();
			}
		}
	}
</script>

<style>
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
		font-size: 18px;
		color: $u-content-color;
	}

	.u-icon {
		margin: 0 6px;
	}
</style>
