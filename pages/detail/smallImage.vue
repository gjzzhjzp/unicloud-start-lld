<template>
	<view class="smallImage">
		<u-lazy-load  v-if="data.url.indexOf('gif')==-1" @click="previewOpen(data)"
		 threshold="300" height="100px" border-radius="10" :image="data.url"></u-lazy-load>
		<image v-else :src="data.url"  @click="previewOpen(data)"  mode="aspectFill"></image>
	</view>
</template>

<script>
	export default{
		name:"smallImage",
		data(){
			return {
				
			}
		},
		props:{
			data:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods:{
			previewOpen(data){
				this.$emit("preview",data);
			}
		}
	}
</script>

<style>
	.smallImage{
		height: 300rpx;
		width: 100%;
	}
</style>
