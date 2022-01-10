<template>
	<view>
		<u-tabbar v-model="current" :list="list" :height="100" active-color="#409eff" icon-size="44rpx"></u-tabbar>
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
						text: '分区',
						pagePath: "/pages/sort/sort"
					},
					{
						iconPath: "/static/tabbar/3.png",
						selectedIconPath: "/static/tabbar/3_sed.png",
						text: '纪恋日',
						pagePath: "/pages/jilianri/jilianri"
					},
					{
						iconPath: "/static/tabbar/4.png",
						selectedIconPath: "/static/tabbar/4_sed.png",
						text: '俊哲',
						pagePath: "/pages/junzhe/junzhe"
					},
					{
						iconPath: "/static/tabbar/5.png",
						selectedIconPath: "/static/tabbar/5_sed.png",
						text: '山总',
						pagePath: "/pages/shanzong/shanzong"
					}
				],
				current: 0
			}
		}
	}
</script>

<style>
</style>
