<template>
	<view class="jz-container">
		<u-navbar :is-back="true" title="资源详情"></u-navbar>
		<view>
			<template v-if="detaildata.zy_gs=='jpg'||detaildata.zy_gs=='png'">
				<detail-image :data="detaildata"></detail-image>
			</template>
			<template v-else-if="detaildata.zy_gs=='mp4'">
				<detail-mp4 :data="detaildata"></detail-mp4>
			</template>
			<template v-else-if="detaildata.zy_gs=='mp3'">
				<detail-mp3 :data="detaildata"></detail-mp3>
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
	export default{
		data(){
			return {
				detaildata:{},
				id:""
			}
		},
		components:{detailImage,detailMp4,detailMp3},
		onLoad(option) {
			if(option&&option.id){
				this.id=option.id;
			}
			
		},
		computed: {
			...mapGetters({
				hasLogin: 'user/hasLogin'
			})
			},
		mounted(){
			this.getResource(this.id);
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
						this.tohistory();
					} else {
						console.log("res",res.msg);
					}	
				});
			},
			// 历史记录
			async tohistory(){
				// console.log("this.hasLogin",this.hasLogin);
				if(this.hasLogin){
					const db = uniCloud.database()
					const uid = db.getCloudEnv('$cloudEnv_uid');
					console.log("uid",uid);
					const collection = db.collection('opendb-news-history');
					var rows=await collection.get({
						article_id: this.detaildata._id,
						user_id: db.getCloudEnv('$cloudEnv_uid')
					});
					if(rows.result&&rows.result.data.length>0){
						await collection.where({_id:rows.result.data[0]._id}).update({
							update_date:db.getCloudEnv('$cloudEnv_now')
						});
					}else{
						await collection.add({
							article_id: this.detaildata._id,
							article_title: this.detaildata.title,
							user_id: db.getCloudEnv('$cloudEnv_uid'),
							create_date: db.getCloudEnv('$cloudEnv_now')
						});
					}
				}
			}
		},
		
	}
</script>
<style>
</style>
