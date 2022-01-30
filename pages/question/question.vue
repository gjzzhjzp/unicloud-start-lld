<template>
	<view class="jz-container">
		<u-navbar :is-back="false" title="对暗号"></u-navbar>
		<jz-question ref="question"></jz-question>
	</view>
</template>
<script>
	export default{
		onShow(){
			if(this.$refs.question){
				this.$refs.question.getQuestion();
			}
			
		}
	}
</script>
<style>
	.jz-container{
		background-color: #fff;
		height: 100vh;
		/* padding: 10px; */
	}
</style>
