<template>
	<div class="jz-banner">
		<u-swiper :list="bannerList" :height="height"></u-swiper>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [],
				height:300
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
			getList() {
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'banner/getList'
					},
				}).then((res) => {
					console.log("getHotList", res);
					if (res.result && res.result.rows) {
						res.result.rows.forEach((item) => {
							this.bannerList.push({
								image: item.bannerfile.url,
								title: item.title
							});
						})
					}
				})
			}
		}
	}
</script>

<style>
</style>
