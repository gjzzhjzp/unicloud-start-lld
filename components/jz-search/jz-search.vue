<template>
	<view>
		<!-- <u-navbar :is-back="true" back-icon-name="arrow-leftward" :back-icon-size="40">
			<u-search border-color="#7275D3" bg-color="#fff" v-model="keyword" height="60" placeholder="搜索..." @search="searchClick" @custom="searchClick"
				:show-action="true"></u-search>
		</u-navbar> -->
		<u-search border-color="#7275D3" bg-color="#fff" v-model="keyword" height="60" placeholder="搜索..." @search="searchClick" @custom="searchClick"
			:show-action="true"></u-search>
		<!-- <u-search border-color="#7275D3" placeholder="搜索..." bg-color="#fff" @focus="searchClick" v-model="keyword" @search="searchClick" @custom="searchClick"
			:show-action="true"></u-search> -->
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
