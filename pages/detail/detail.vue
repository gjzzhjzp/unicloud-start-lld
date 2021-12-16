<template>
	<view class="jz-container">
		<u-navbar :is-back="true" :title="title"></u-navbar>
		<view>
			<template v-if="!detaildata.aliyun_dz">
				<template v-if="zy_gs=='0'">
					<detail-image :data="detaildata"></detail-image>
				</template>
				<template v-else-if="zy_gs=='1'">
					<detail-mp4 :data="detaildata"></detail-mp4>
				</template>
				<template v-else-if="zy_gs=='2'">
					<detail-mp3 :data="detaildata"></detail-mp3>
				</template>
				<template v-else-if="zy_gs=='3'">
					<detail-image :data="detaildata"></detail-image>
					<!-- <detail-open :data="detaildata"></detail-open> -->
				</template>
			</template>
			<template v-else>
				<template v-if="zy_gs=='1'||detaildata.aliyun_dz.indexOf('/jzmp4/')!=-1">
					<detail-mp4 :data="detaildata"></detail-mp4>
				</template>
				<template v-else>
					<detail-open :data="detaildata"></detail-open>
				</template>
			</template>
		</view>
	</view>
</template>
<script>
	import {
		mapGetters
	} from 'vuex';
	import detailImage from "./detail-image.vue"
	import detailMp4 from "./detail-mp4.vue"
	import detailMp3 from "./detail-mp3.vue"
	import detailOpen from "./detail-open.vue"
	export default{
		data(){
			return {
				title:"",
				detaildata:{},
				id:"",
				zy_gs:"0"///当前资源格式
			}
		},
		components:{detailImage,detailMp4,detailMp3,detailOpen},
		onLoad(option) {
			if(option&&option.id){
				this.id=option.id;
			}
			
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			})
			},
		mounted(){
			this.getResource(this.id);
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.getResource(this.id);
			uni.stopPullDownRefresh();
		},
		methods:{
			// 获取资源
			getResource(id){
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'resource/getResource',
						data:{
							_id:id
						}
					},
				}).then((res) => {
					var res = res.result;
					if (res.state == "0000") {
						this.detaildata=res.rows[0];
						console.log("this.detaildata",this.detaildata);
						this.title=this.detaildata.title;
						this.zy_gs=this.detaildata.zy_gs;
						this.tohistory();
					} else {
						console.log("res",res.msg);
					}	
				});
			},
			// 历史记录
			async tohistory(){
				if(this.hasLogin){
					const db = uniCloud.database()
					const uid = db.getCloudEnv('$cloudEnv_uid');
					const collection = db.collection('opendb-news-history');
					var rows=await collection.where({
						article_id: this.detaildata._id,
						user_id: db.getCloudEnv('$cloudEnv_uid')
					}).get();
					if(rows.result&&rows.result.data.length>0){
						await collection.where({_id:rows.result.data[0]._id}).update({
							update_date:db.getCloudEnv('$cloudEnv_now')
						});
					}else{
						// debugger;
						await collection.add({
							article_id: this.detaildata._id,
							article_title: this.detaildata.title,
							user_id: db.getCloudEnv('$cloudEnv_uid'),
							create_date: db.getCloudEnv('$cloudEnv_now'),
							zy_gs:this.detaildata.zy_gs
						});
					}
				}
			}
		},
		
	}
</script>
<style>
	.jz-container-wl{
		/* text-indent: 2em; */
	}
</style>
