<template>
	<view class="jz-container">
		<u-navbar :is-back="true" title="选择类型"></u-navbar>
		<view class="jz-container-button">
			<view >
				<u-button type="primary" @click="totougao()">我要投稿</u-button>
			</view>
			<view style="margin-top: 40px;">
				<u-button type="info" @click="tofatie()">我要发帖</u-button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods:{
			totougao(){
				uni.navigateTo({
					url:"/pages/addResource/addResource"
				});
			},
			tofatie(){
				uni.navigateTo({
					url:"/pages/jz-opendb-taolun/add"
				});
			}
		}
	}
</script>

<style>
	.jz-container-button {
		padding: 0px 20px;
		    height: 100vh;
		    display: flex;
		    flex-direction: column;
			margin-top: 50px;
		    /* align-items: center; */
		    /* justify-content: center; */
	}
</style>
