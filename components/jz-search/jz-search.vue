<template>
	<view>
		<u-search border-color="#7275D3" placeholder="搜索..." bg-color="#fff" @focus="searchClick" v-model="keyword" @search="searchClick" @custom="searchClick"
			:show-action="true"></u-search>
	</view>
</template>

<script>
	export default{
		name:"jz-search",
		data(){
			return {
				keyword:""
			}
		},
		methods:{
			searchClick(e) { //点击搜索框
				uni.hideKeyboard();
				uni.navigateTo({
					url: '/pages/list/search/search',
					animationType: 'fade-in'
				});
			},
		}
	}
</script>

<style>
</style>
