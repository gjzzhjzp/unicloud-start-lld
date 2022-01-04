<template>
	<view v-if="showindex">
		<jz-navbar>
			<u-search :disabled="true" border-color="#7275D3" bg-color="#fff" height="60" placeholder=""
				@focus="$notMoreTap(tosearch,'notTap')" @click="$notMoreTap(tosearch,'notTap')"
				@search="$notMoreTap(tosearch,'notTap')" @custom="$notMoreTap(tosearch,'notTap')" :show-action="true">
			</u-search>
		</jz-navbar>
		<jz-notice ref="notice" :type="2" mode="horizontal"></jz-notice>
		<!-- <u-button @click="importExcel">导入</u-button> -->
		<view class="jz-container">
			<view>
				<jz-banner ref="banner"></jz-banner>
			</view>
			<view>
				<jz-grid></jz-grid>
			</view>
			<jz-sy-list ref="sylist4" type="tj" title="推荐内容" :showright="true" :rows="4"></jz-sy-list>
			<jz-sy-list ref="sylist1" type="rm" title="热门内容"></jz-sy-list>
			<jz-sy-list ref="sylist2" type="zx" title="最新内容"></jz-sy-list>
			<jz-sy-list ref="sylist3" title="山河令" label="山河令"></jz-sy-list>
			<!-- <jz-sy-list ref="sylist4" title="夺笋" label="夺笋"></jz-sy-list> -->
			<jz-tabbar></jz-tabbar>
			<jz-gonggao ref="gonggao"></jz-gonggao>
			
		</view>
	</view>
</template>
<script>
	import gonggao from "@/common/gonggao.js"
	export default {
		data() {
			return {
				notTap: true, //一定要设置为true
				showindex:false
			}
		},
		mixins: [gonggao],
		onShow: function() {
			var question_success1 = uni.getStorageSync("question_success1");
			if (question_success1) {
				this.showindex=true;
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.$refs.banner.getList();
			this.$refs.sylist1.getList();
			this.$refs.sylist2.getList();
			this.$refs.sylist3.getList();
			this.$refs.sylist4.getList();
			uni.stopPullDownRefresh()
		},
		methods: {
			tosearch() {
				uni.navigateTo({
					url: "/pages/list/search/search"
				});
			},
		}
	}
</script>
<style>
	.jz-sy-list {
		padding: 10rpx 0px;
	}
</style>
