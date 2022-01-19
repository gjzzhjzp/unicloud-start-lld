<template>
	<view>
		<u-tabbar v-model="current" :mid-button="true" :list="list" :height="110" active-color="#777BCE" icon-size="50rpx"></u-tabbar>
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
						iconPath: "/static/newpage/center.png",
						selectedIconPath: "/static/newpage/center.png",
						text: '',
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
