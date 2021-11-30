<template>
	<view>
		<u-modal v-model="showmodel" :title="gonggao_title" @confirm="confirm">
			<view class="slot-gonggao_content">
				<view v-html="gonggao_content"></view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import gonggao from "@/common/gonggao.js"
	export default {
		data() {
			return {
				showmodel: false,
				gonggao_content: "",
				gonggao_title: "",
				gonggao_number:""
			}
		},
		mixins:[gonggao],
		methods: {
			show() {
				this.showmodel = true;
			},
			close() {
				this.showmodel = true;
			},
			confirm(){
				uni.setStorageSync("gonggao_" + this.gonggao_number,true);
				this._gonggao();
			}
		}
	}
</script>
<style>
	.slot-gonggao_content {
		max-height: 50vh;
		overflow: auto;
		padding: 10px;
	}
</style>
