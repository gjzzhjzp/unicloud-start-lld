<template>
	<view>
		<u-modal v-model="showmodel" :title="gonggao_title" @confirm="confirm">
			<view class="slot-gonggao_content">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" >
					<view class="scroll-view-content" v-html="gonggao_content"></view>
				</scroll-view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import gonggao from "@/common/gonggao.js"
	export default {
		data() {
			return {
				scrollTop:0,
				showmodel: false,
				gonggao_content: "",
				gonggao_title: "",
				gonggao_number: ""
			}
		},
		mixins: [gonggao],
		methods: {
			show() {
				this.showmodel = true;
			},
			close() {
				this.showmodel = true;
			},
			confirm() {
				uni.setStorageSync("gonggao_" + this.gonggao_number, true);
				this._gonggao();
			}
		}
	}
</script>
<style>
	.slot-gonggao_content {
		
		overflow: auto;
		/* padding: 10px; */
	}
	.slot-gonggao_content>uni-scroll-view{
		max-height: 50vh;
		
	}
	.scroll-view-content{
		padding: 10px;
	}
</style>
