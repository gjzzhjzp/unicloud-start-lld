<template>
	<view class="rili-detail">
		<jz-navbar :issy="false" :showlogo="false" :isBack="true">
			<view class="jz-navbar-title">纪念日详情</view>
		</jz-navbar>
		<view class="rili-bottom">
			<view class="one">
				<view class="one-1">
					2020年9月1日
				</view>
				<view class="one-2">
					农历七月十四
				</view>
			</view>
			<view class="two">
				ins发图卸载微博，配字清净
			</view>
		</view>
		<view class="rili-content">
			ins发图卸载微博，配字清净ins发图卸载微博，配字清净ins发图卸载微博，配字清净ins发图卸载微博，配字清净ins发图卸载微博，配字清净ins发图卸载微博，配字清净
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {

		}
	}
</script>
<style lang="scss">
	.rili-bottom {
		margin-top: 4px;
		.one {
			display: flex;
			padding: 10px 30px;
			color: #7F88D3;
			font-size: 20px;
			justify-content: space-between;
			border-bottom: 1px solid #8C92AC;
		}

		.two {
			margin: 20px;
			color: #36c6e8;
			font-size: 18px;
			position: relative;
		}

		.two::before {
			content: "";
			height: 25px;
			width: 4px;
			color: #D84058;
			position: absolute;
			display: block;
			top: 0%;
			left: -10px;
			background: #D84058;
			border-radius: 4px;
		}
	}

	.rili-content {
		padding: 20px;
	}
</style>
