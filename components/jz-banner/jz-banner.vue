<template>
	<div class="jz-banner">
		<u-swiper :list="bannerList" :height="height" @click="clickLb"></u-swiper>
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
		props:{
			type:{
				type:Number,
				default(){
					return 0
				}
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
			clickLb(index){
				var item=this.bannerList[index];
				// console.log("item",item)
				var open_url=item.open_url;
				if(open_url){
					if(open_url.substring(0,4)=="http"){
						window.open(open_url);
					}else{
						uni.navigateTo({
							url:open_url
						});
					}
				}
			},
			getList() {
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'banner/getList',
						data:{
							type:this.type
						}
					},
				}).then((res) => {
					console.log("getHotList", res);
					this.bannerList.splice(0,this.bannerList.length);
					if (res.result && res.result.rows) {
						res.result.rows.forEach((item) => {
							console.log(item)
							this.bannerList.push({
								image: item.bannerfile.url,
								title: item.title,
								open_url:item.open_url
							});
						})
					}
				});
			}
		}
	}
</script>
<style>
</style>
