<template>
	<view class="jz-browser">
		<view class="jz-browser-text">
			<view class="jz-browser-text1">
				温馨提示
			</view>
			<view class="jz-browser-text2">
				<!-- <view class="browser" style="margin-top: 30px;">
					因多方面因素限制，ios将不再推出APP
				</view> -->
				<!-- <view class="browser" style="margin-top: 20px;">
					ios移动端网页版可在微信和百度浏览器中打开，其他暂不支持
				</view> -->
				<view class="browser" style="text-align: center;">
					移动端网页版暂只支持在微信中打开
				</view>
			</view>
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
				
			}
		}
	}
</script>

<style>
	.jz-browser{
		height: 100vh;
		background-color: #fff;
	}
	.jz-browser-text{
		font-size: 40rpx;
		text-align: center;
		margin-top: 200px;
		    padding: 0px 10px;
	}
	.jz-browser-text2{
		margin-top: 20px;
		text-align: left;
	}
	.jz-browser-text1{
		font-weight: 400;
		font-size: 50rpx;
	}
	.browser{
		/* text-indent: 2em; */
	}
</style>
