<template>
	<view class="jz-container">
		<u-navbar :is-back="true" title="搜索"></u-navbar>
		<view>
			<u-search placeholder="输入关键字搜素" v-model="keyword" @search="searchList" @custom="searchList"></u-search>
		</view>
		<view style="margin-top: 20px;">
			<o-section title="历史搜索" :right="false"></o-section>
			<view class="er-search-button">
				<text class="er-search-minibutton" v-for="(item,index) in historyList" :key="index">
					<u-button size="mini">{{item.title}}</u-button>
				</text>
			</view>
		</view>
		<view>
			<o-section title="热门搜索" :right="false"></o-section>
			<view class="er-search-button">
				<view class="er-search-minibutton" v-for="(item,index) in hotList" :key="index">
					<u-button size="mini">{{item.title}}</u-button>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	export default{
		data(){
			return {
				keyword:"",
				historyList:[],///历史搜索列表
				hotList:[]///热门搜索列表
			}
		},
		mounted(){
			this.getHotList();
			this.getHistoryList();
		},
		methods:{
			// 获取热门搜索列表
			getHotList(){
				uniCloud.callFunction({
				  name: 'jzfunction', 
				  data: {
				    action: 'search/getHotList'
				  },
				}).then((res)=>{
					console.log("getHotList",res);
					if(res.result&&res.result.rows){
						res.result.rows.forEach((item)=>{
							if(item.title){
								this.hotList.push(item);
							}
						})
					}
				})
			},
			// 获取历史搜索列表
			getHistoryList(){
				uniCloud.callFunction({
				  name: 'jzfunction', 
				  data: {
				    action: 'search/getHistoryList'
				  },
				}).then((res)=>{
					console.log("getHistoryList",res);
					if(res.result&&res.result.rows){
						res.result.rows.forEach((item)=>{
							if(item.title){
								this.historyList.push(item);
							}
						})
					}
				});
			},
			/*
			搜索列表
			*/
			searchList(){
				if(!this.keyword){
					this.$refs.uToast.show({
						message: "宝，请输入内容哦~",
						type: 'error'
					});
					return;
				}
				uniCloud.callFunction({
				  name: 'jzfunction', 
				  data: {
				    action: 'search/addSerach',
				    data: {
				     keyword:this.keyword
				    },
				  },
				}).then((res)=>{
					console.log("res",res);
				})
			}
		}
	}
</script>

<style>
	.er-search-minibutton{
		padding: 12rpx 20rpx;
		display: inline-block;
	}
	.er-search-button{
		padding: 20rpx;
	}
</style>
