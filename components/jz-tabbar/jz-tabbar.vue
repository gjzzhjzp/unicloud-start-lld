<template>
	<u-tabbar v-model="current" :list="list"></u-tabbar>
</template>
<script>
	export default {
			data() {
				return {
					list: [{
							iconPath: "home",
							selectedIconPath: "home-fill",
							text: '首页',
							customIcon: false,
							pagePath:"/pages/index/index"
						},
						{
							iconPath: "photo",
							selectedIconPath: "photo-fill",
							text: '分区',
							customIcon: false,
							pagePath:"/pages/sort/sort"
						},
						{
							iconPath: "play-right",
							selectedIconPath: "play-right-fill",
							text: '纪恋日',
							customIcon: false,
							pagePath:"/pages/search/search"
						},
						{
							iconPath: "account",
							selectedIconPath: "account-fill",
							text: '俊哲',
							customIcon: false,
						},
						{
							iconPath: "account",
							selectedIconPath: "account-fill",
							text: '山总',
							customIcon: false,
						}
					],
					current: 0
				}
			}
		}
</script>

<style>
</style>
