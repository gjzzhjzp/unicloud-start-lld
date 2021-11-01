<template>
	<div class="jz-grid">
		<u-grid :col="4" :border="false">
			<u-grid-item v-for="(item,index) in gridList" :key="index">
				<!-- <u-icon :name="item.icon" :size="46"></u-icon> -->
				<view class="grid-text">{{item.name}}</view>
			</u-grid-item>
		</u-grid>
	</div>
</template>
<script>
	 const db = uniCloud.database();
	export default {
		data() {
			return {
				gridList:[]
			}
		},
		created(){
			this.getList();
		},
		methods:{
			async getList(){
				var categories=await db.collection("opendb-news-categories").get({
					getTree:{
						startWith:"flbm=='200000'"////分类顶级编码
					}
				});
				console.log("categories",categories);
				if(categories.result&&categories.result.data.length>0){
					this.gridList=categories.result.data[0].children;
				}
			}
		}
	}
</script>

<style>
</style>
