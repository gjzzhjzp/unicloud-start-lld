<template>
	<view class="jz-404">
		<view class="jz-404-image">
		<u-image width="500rpx" height="500rpx" src="@/static/404/404.png" mode="aspectFill"></u-image>
		</view>
		<view class="jz-404-button">
			<u-button @click="tohome" width="200rpx" type="primary" :plain="true" >返回首页</u-button>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			tohome(){
				uni.switchTab({
					url:"/pages/index/index"
				});
			}
		}
	}
</script>

<style>
	.jz-404-image{
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.jz-404 .u-btn{
		
		    width: 120px;
	}
	.jz-404-button{
		    width: 100%;
		    text-align: center;
		    height: 50px;
		    position: absolute;
		        bottom: 100px;
	}
</style>
