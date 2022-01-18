<template>
	<view>
		<u-tabbar v-model="current" :mid-button="true" :list="list" :height="100" active-color="#409eff" icon-size="44rpx"></u-tabbar>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [{
						iconPath: "/static/tabbar/1.png",
						selectedIconPath: "/static/tabbar/1_sed.png",
						text: '首页',
						pagePath: "/pages/index/index"
					},
					{
						iconPath: "/static/tabbar/2.png",
						selectedIconPath: "/static/tabbar/2_sed.png",
						text: '分类',
						pagePath: "/pages/sort/sort"
					},
					{
						iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
						selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
						text: '发布',
						midButton: true,
						customIcon: false,
						pagePath: "/pages/fabu/fabu"
						// iconPath: "/static/tabbar/3.png",
						// selectedIconPath: "/static/tabbar/3_sed.png",
						// text: '发布',
						// pagePath: "/pages/fabu/fabu"
					},
					{
						iconPath: "/static/tabbar/4.png",
						selectedIconPath: "/static/tabbar/4_sed.png",
						text: '广场',
						pagePath: "/pages/guangchang/guangchang"
					},
					{
						iconPath: "/static/tabbar/5.png",
						selectedIconPath: "/static/tabbar/5_sed.png",
						text: '我的',
						pagePath: "/pages/ucenter/ucenter"
					}
				],
				current: 0
			}
		}
	}
</script>

<style>
</style>
