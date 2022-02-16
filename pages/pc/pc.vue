<template>
	<view class="pc">
		<u-image :src="src" height="300px" width="300px">
			
		</u-image>
		<view class="text">
			请使用微信扫码浏览
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
