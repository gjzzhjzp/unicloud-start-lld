<template>
	<view class="pc">
		<u-image :src="src" height="300px" width="300px">
			
		</u-image>
		<view class="text">
			请使用手机浏览器（不是微信）扫码预览
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				src:"/static/pc/ewm.png"
			}
		}
	}
</script>

<style>
	.pc{
		padding: 50px;
		    width: 100%;
		    text-align: center;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    flex-direction: column;
	}
	.text{
		    font-size: 20px;
		    margin: 20px;
	}
</style>
