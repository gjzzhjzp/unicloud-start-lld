<template>
	<view class="operator">
		<u-action-sheet :list="list" v-model="show"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					text: '举报'
				}, {
					text: '删除'
				}],
				show: false
			}
		},
		methods:{
			open(){
				this.show=true;
			},
			close(){
				this.show=false;
			}
		}
	}
</script>

<style>
</style>
