<template>
	<view :class="['detailhead','detailhead'+data.zy_gs]">
		<slot name="content">

		</slot>
		<u-sticky>
			<view v-if="tablist.length>1||(showdanmu&&showsendDanmu)" class="detailtabs" style="margin-top: 10px;">
				<view style="flex: 1;">
					<u-tabs :font-size="32" active-color="#7275D3" :list="tablist" :is-scroll="false" :bar-width="100"
						:current="current" @change="changeTab">
					</u-tabs>
				</view>
				<view style="background-color: #fff;" v-if="showdanmu&&showsendDanmu">
					<slot name="danmubutton"></slot>
				</view>
			</view>
		</u-sticky>
		<view v-show="current==0">
			<view style="background-color: #fff;padding: 8px;">
				<view class="detail-image-title">
					<view class="title" @click="tgrHref()">
						<commont-image
							:src="(data.userinfo&&data.userinfo[0]&&data.userinfo[0].avatar_file)?data.userinfo[0].avatar_file.url:''"
							:isoriginal="!!(data.userinfo&&data.userinfo[0].original==1)">
						</commont-image>
						<view class="original-title">
							<view @click="tgrHref()" style="color: #333333;font-size: 14px;">{{tgr}}</view>
							<uni-dateformat class="publish_date" :date="data.publish_date" format="yyyy-MM-dd"
								:threshold="[60000, 2592000000]" />
						</view>
					</view>
					<view class="er-item-list-gz" v-if="showguanzhu(data)">
						<u-button size="medium" shape="circle" @click="guanzhu(data)">关注</u-button>
					</view>
				</view>
				<view class="detail-image-title">
					<view class="title" style="flex: 1;">
						{{data.title}}
					</view>
					<view style="color: #909399;display: flex;align-items: center;" v-show="showllsc">
						<u-icon name="eye" :size="30"></u-icon><text
							style="margin-left: 2px;">{{data.view_count||0}}</text>
						<!-- <uni-dateformat class="publish_date" :date="data.publish_date" format="yyyy-MM-dd"
							:threshold="[60000, 2592000000]" /> -->
					</view>
				</view>
				<view class="detail-image-sx">
					<view class="detail-image-ly">
						<view class="detail-image-ly1">来源：{{data.author}}</view>
						<!-- <view class="detail-image-ly2">投稿人：<view @click="tgrHref()" style="color: rgb(114, 117, 211);">
								{{tgr}}</view>
						</view> -->
					</view>
				</view>
				<view class="detail-image-jj">
					<view class="detail-image-jj1">简介：</view>
					<view class="detail-image-jj2" v-html="data.excerpt||'无'"></view>
				</view>
				<!-- <view class="detail-open " style="" v-if="data.aliyun_dz&&(data.aliyun_dz.indexOf('.mp4')==-1||data.aliyun_dz.indexOf('jzmp4')!=-1&&!plus)"> -->
				<view class="detail-open " style="" v-if="data.aliyun_dz&&(data.aliyun_dz.indexOf('.mp4')==-1)">
					<view>
						外链地址：
					</view>
					<view style="margin-top: 4px;">
						<u-link :href="data.aliyun_dz" color="rgb(114, 117, 211)">点击跳转</u-link>
					</view>
				</view>
				<view class="detail-open " style="" v-if="data.aliyun_dz&&(data.aliyun_dz.indexOf('jzmp4')!=-1&&!plus)">
					<view style="color: red;">提示：此视频暂不支持移动网页版播放</view>
				</view>
				<view class="detail-image-bq">
					<view class="detail-image-bq1" v-for="(item,index) in labels" :key="index">
						<u-tag :text="'# '+item" type="primary" shape="circle" />
					</view>
				</view>
				<view style="padding: 6px;" @click="tohjHref()" v-show="showhj">
					<view style="color: rgb(114, 117, 211);">点击查看系列合集</view>
				</view>
				<view class="detail-image-operation">
					<operation :data="data"></operation>
				</view>
			</view>
			<view style="margin-top: 20rpx;">
				<jz-sy-list ref="sylist" :label="tjcategories" :ignore="data._id" title="推荐资源" :showright="false"
					:zy_gs="data.zy_gs" :rows="6"></jz-sy-list>
			</view>
		</view>
		<view v-show="current==1">
			<slot name="comment"></slot>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import detail from "./detail.js"
	import commontImage from "../jz-opendb-taolun/detail/commontImage.vue"
	import operation from "./operation.vue"
	const db = uniCloud.database();
	export default {
		mixins: [detail],
		components: {
			operation,
			commontImage
		},
		data() {
			return {
				showhj:false,
				showmp4Xz: false,
				// labels: [],
				showllsc: true,
				current: 0,
				// tablist: [{
				// 	name: '简介'
				// }],
				showpl: true,
				showdanmu: true,
				showsendDanmu: true,
				plus: false,
				hjHref:""///合集地址
			}
		},
		props: {
			data: {
				type: Object,
				default () {
					return {}
				}
			},
			plNumber: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		created() {
			if (typeof plus != "undefined") {
				this.plus = true;
			}
			var config = getApp().globalData.systemconfig;
			var t_800005 = config["800005"];
			var t_800011 = config["800011"];
			var t_800017 = config["800017"];
			var t_800018 = config["800018"];
			var t_800019 = config["800019"];
			if (t_800017 == 1) {
				this.showpl = true;
			} else {
				this.showpl = false;
			}
			if (t_800018 == 1) {
				this.showdanmu = true;
			} else {
				this.showdanmu = false;
			}
			if (t_800019 == 1) {
				this.showsendDanmu = true;
			} else {
				this.showsendDanmu = false;
			}
			// if (this.showpl) {
			// 	this.tablist.push({
			// 		name: '评论'
			// 	});
			// }
			this.showmp4Xz = t_800005 == '1' ? true : false;
			this.showllsc = t_800011 == '1' ? true : false;
			// console.log("labels", this.labels);
			this.checkishj();
		},
		watch:{
			data(){
				this.checkishj();
			}
		},
		computed: {
			tablist() {
				var data = this.data;
				var _ary = [{
					name: '简介'
				}];
				if (this.showpl) {
					_ary.push({
						name: '评论' + (data.pl_count || '')
					})
				}
				return _ary;
			},
			labels() {
				var labels = this.data.labels;
				if (labels) {
					return labels.split("，")
				}
				return [];
			},
			tgr() {
				if (this.data.userinfo && this.data.userinfo.length > 0) {
					return this.data.userinfo[0].nickname || "佚名"
				}
				return "佚名"
			},
			tjcategories() {
				// debugger;
				var tjcategories = "";
				if (this.data.categorieszw) {
					tjcategories = this.data.categorieszw.split(",")[0];
				}
				return tjcategories;
			},
		},
		methods: {
			tohjHref(){
				uni.navigateTo({
					url:this.hjHref
				});
			},
			async checkishj(){
				// debugger;
				// 检查是否存在合集
				console.log("this.data._id",this.data._id);
				if(this.data._id){
					var dbcount=await db.collection("jz-opendb-resourceshj").where({
						article_id:this.data._id
					}).get();
					if(dbcount.result.data&&dbcount.result.data.length>0){
						this.showhj=true;
						this.hjHref="/pages/resourcehj/resourcehj?id="+dbcount.result.data[0].parent_id;
					}else{
						this.showhj=false;
					}
					console.log("dbcount",dbcount);
				}
			},
			async guanzhu(item) {
				var userinfo = item.userinfo ? item.userinfo[0] : "";
				if (userinfo) {
					await db.collection("opendb-news-guanzhu").add({
						user_id: db.getCloudEnv('$cloudEnv_uid'),
						buser_id: userinfo._id,
						guanzhu_date: db.getCloudEnv('$cloudEnv_now')
					});
					this.$set(item, "gz_sed", true);
					this.$refs.uToast.show({
						title: '已关注',
						type: 'success'
					});
					var dluserinfo = uni.getStorageSync("userInfo");
					var add_value = {
						type: 5,
						user_id: this.data.user_id,
						comment: dluserinfo.nickname + "关注了你"
					}
					db.collection("jz-custom-systeminfo").add(add_value);
				}
			},
			showguanzhu(item) {
				if (this.isgz) {
					return false;
				} else {
					if (item.gz_sed) {
						return false;
					} else {
						var userinfo = uni.getStorageSync("userInfo");
						if (userinfo._id == item.user_id) {
							return false;
						} else if (item.guanzhu && item.guanzhu.length > 0) {
							return false;
						} else {
							return true;
						}
					}
				}
				// !item.gz_sed
			},
			tgrHref() {
				if (this.data.userinfo && this.data.userinfo.length > 0) {
					var username = this.data.userinfo[0].username;
					if (username == "admin") {
						this.$refs.uToast.show({
							title: '该用户不支持查看主页',
							type: 'error'
						});
						return;
					}
					var id = this.data.userinfo[0]._id;
					if (id) {
						var userinfo = uni.getStorageSync("userInfo");
						if (userinfo._id == id) {
							uni.navigateTo({
								url: "/pages/ucenter/ucenter"
							});
						} else {
							uni.navigateTo({
								url: "/pages/ucenter/tacenter?id=" + id
							});
						}
					}
				}
			},
			changenumber(plNumber) {
				this.$emit("changenumber", plNumber);
				// debugger;
				// var tabs=this.$parent.tablist;
				// console.log("tabs",tabs);
			},
			changeTab(index) {
				this.current = index;
			}
		}
	}
</script>

<style>
	.detail-image-ly2 {
		display: flex;
	}

	.original-title {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
	}

	.publish_date {
		font-size: 10px;
		color: #888888;
	}

	.detail-image-ly2 .u-link {
		margin-top: 4px;
	}

	.showllsc {
		display: flex;
		flex-direction: row;
	}

	.detail-open {
		display: flex;
		flex-direction: row;
		text-align: center;
	}

	.detailtabs {
		border-bottom: 1px solid #ddd;
		display: flex;
		flex-direction: row;
	}

	.detail-image-jj1 {
		width: 3.5em;
	}

	.detail-image-jj2 {
		flex: 1;
	}

	.detail-open {
		display: flex;
		flex-direction: row;
		margin: 10px 6px;
		font-size: 1em;
		color: #909399;
	}

	.detail-image-bq {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 6px;
	}

	.detail-image-bq1 {
		margin: 6px;
	}

	.detail-image-sx3 {
		display: flex;
		flex-direction: row;
		color: #909399;
		margin: 10px 6px;
		justify-content: space-between;
	}

	.detail-image-sx31,
	.detail-image-sx32 {
		display: flex;
		flex-direction: row;
	}

	.detail-image-sx32 {
		margin-left: 20px;
	}

	.detail-image-sc1 {
		display: flex;
		flex-direction: row;

	}

	.detail-image-sc1 .u-icon,
	.detail-image-sx3 .u-icon {
		margin-top: 3px;
		margin-right: 2px;
	}

	.detail-image-ly {
		display: flex;
		flex-direction: row;
		width: 100%;
		font-size: 1em;
		color: #909399;
	}

	.detail-image-ly1 {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		/* max-width: 50%; */
	}

	.detail-image-ly2 {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 50%;
		margin-left: 20px;
	}

	.detail-image-title {
		margin-top: 10px;
		margin-left: 6px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.detail-image-title .title {
		font-size: 36rpx;
		flex: 1;
		display: flex;
	}

	.detail-image-sx {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 10px;
		margin-left: 6px;
		font-size: 1em;
	}

	.detail-image-jj {
		display: flex;
		flex-direction: row;
		margin-top: 10px;
		margin-left: 6px;
		font-size: 1em;
		color: #909399;
	}

	.detailhead1 .detail-image-ly {
		/* width: calc(100% - 110px); */
	}

	.detail-image-sc {
		display: flex;
		flex-direction: row;
	}

	.detail-image-sc .download-head {
		display: flex;
		flex-direction: row;
		text-decoration: none;
		/* color: inherit; */
		margin-left: 8px;
	}
</style>
