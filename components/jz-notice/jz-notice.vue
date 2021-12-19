<template>
	<view class="jz-notice">
		<template v-if="list.length>0">
		<u-notice-bar :direction="mode" :text="list"></u-notice-bar>
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
					return "column"
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
				var rows=resultdata.result.data;
				if(this.mode=="column"){
					this.list.splice(0,this.list.length);
					rows.forEach((item)=>{
						this.list.push(item.content);
					});
				}else{
					if(rows.length>0){
						this.list=rows[0].content;
					}
				}
			}
		}
	}
</script>
<style>
	.jz-notice{
		padding: 10rpx 0px;
	}
</style>
