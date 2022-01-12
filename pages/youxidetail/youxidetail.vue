<template>
	<view class="youxidetail">
		<view v-show="showtop" style="height:30px"></view>
		<view :class="showtop?'youxidetail1':'youxidetail2'">
			<web-view :src="src"></web-view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: "",
				showtop: false
			}
		},
		created() {
			this.src = this.$Route.query.src;
			// if (typeof plus != "undefined") {
			// 	this.showtop=true;
			// }else{
			// 	this.showtop=false;
			// }
		}
	}
</script>

<style>
	.youxidetail {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
	}

	.youxidetail1 {
		position: relative;
		height: calc(100vh - 30px);
	}
	.youxidetail2{
		position: relative;
		height: 100vh;
	}
</style>
