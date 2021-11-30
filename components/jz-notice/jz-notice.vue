<template>
	<view class="jz-notice">
		<template v-if="list.length>0">
		<u-notice-bar :mode="mode" :list="list"></u-notice-bar>
		</template>
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
			},
			mode:{
				type:String,
				default(){
					return "vertical"
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
				// console.log("足迹",resultdata);
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
