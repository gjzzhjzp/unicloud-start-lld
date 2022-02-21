<template>
	<view class="fabusuccess-con">
		<view class="fabusuccess-con1">
			<view class="fabusuccess-icon">
				<u-icon size="100" name="/static/newpage/success.png"></u-icon>
			</view>
			<view class="fabusuccess">
				发布成功！
			</view>
			<view class="fabusuccess-btn">
				<u-button size="medium" shape="circle" @click="returnHome()">返回首页</u-button><br><br>
				<u-button size="medium" shape="circle" @click="returnGuangchang()">返回广场</u-button>
			</view>
		</view>
		
	</view>
</template>
<script>
	export default{
		data(){
			return {}
		},
		methods:{
			returnHome(){
				uni.redirectTo({
					url:"/pages/index/index"
				});
			},
			returnGuangchang(){
				uni.redirectTo({
					url:"/pages/guangchang/guangchang"
				});
			}
		}
	}
</script>
<style>
	.fabusuccess-con{
		    height: 100vh;
		    width: 100vw;
		    display: flex;
		    flex-direction: column;
			background-color: #fff;
		    /* justify-content: center; */
		    align-items: center;
	}
	.fabusuccess{
		font-size: 20px;
		font-weight: 600;
		/* margin-top:30vh; */
	}
	.fabusuccess-con1{
		margin-top:30vh;
		    text-align: center;
	}
	.fabusuccess-icon{
		margin-bottom: 10px;
	}
	.fabusuccess-btn{
		margin-top: 10px;
	}
</style>