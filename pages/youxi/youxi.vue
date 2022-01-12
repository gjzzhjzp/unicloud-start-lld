<template>
	<view class="youxi">
		<u-navbar :is-back="true" title="休闲游戏"></u-navbar>
		<u-alert-tips type="warning" :description="description"></u-alert-tips>
		<view class="youxi-sy">
			<jz-sy-youxi title="合成大西瓜"></jz-sy-youxi>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				description:"游戏拖动图标时位置稍下面一点，不然不能拖动"
			}
		}
	}
</script>

<style>
	.youxi-sy{
		margin-top: 20rpx;
	}
</style>
