<template>
	<view class="smallImage">
		<view class="smallImage1">
			<o-lazy-load  v-if="data.url.indexOf('gif')==-1" @click="previewOpen(data)"
			 threshold="300"  border-radius="10" :image="data.url" img-mode="aspectFill"></o-lazy-load>
			<image v-else :src="data.url"  @click="previewOpen(data)"  mode="aspectFill"></image>
		</view>
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
			},
			single:{
				type:Boolean,
				default(){
					return false
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
		/* height: 300rpx; */
		width: 100%;
		overflow: hidden;
		position: relative;
		padding-top: 100%;
	}
	.smallImage1{
		position: absolute;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		height: 100%;
		width: 100%;
		padding: 4rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
</style>
