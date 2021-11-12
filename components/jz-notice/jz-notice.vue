<template>
	<view class="jz-notice">
		<u-notice-bar mode="vertical" :list="list"></u-notice-bar>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				list: []
			}
		},
		props:{
			type:{
				type:Number,
				default(){
					return 0
				}
			}
		},
		created(){
			this.getList();
		},
		methods:{
			async getList(){
				const db = uniCloud.database()
				const collection = db.collection('jz-custom-language');
				var resultdata = await collection.where({
					type:this.type
				}).get();
				console.log("足迹",resultdata);
				var rows=resultdata.result.data;
				rows.forEach((item)=>{
					this.list.push(item.content);
				});
			}
		}
	}
</script>
<style>
	.jz-notice{
		padding: 10rpx 0px;
	}
</style>
