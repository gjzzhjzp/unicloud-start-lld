<template>
	<u-search bg-color="#000" placeholder="搜索..." @focus="searchClick" v-model="keyword" @search="searchClick" @custom="searchClick"
		:show-action="true"></u-search>
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
