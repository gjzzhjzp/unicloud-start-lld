<template>
	<view class="nineSquared">
		
		<view class="nineSquared_1" v-if="list.length==1">
			<view class="nine-img">
				<small-image :data="list[0]" ref="smallImage1"></small-image>
			</view>
		</view>
		<view class="nineSquared_2" v-else-if="list.length==2||list.length==4">
			<u-row gutter="16">
				<u-col span="6"  v-for="(item,index) in list"  :key="index">
					<small-image :data="item" ref="smallImage2"></small-image>
				</u-col>
			</u-row>
		</view>
		<view class="nineSquared_3" v-else>
			<u-row gutter="16">
				<u-col span="4"  v-for="(item,index) in list"  :key="index">
					<small-image :data="item" ref="smallImage3"></small-image>
				</u-col>
			</u-row>
		</view>
	</view>
</template>
<script>
	import smallImage from "./smallImage.vue"
	export default{
		name:"nineSquared",
		data(){
			return {
				
			}
		},
		components:{
			smallImage
		},
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
	.nineSquared_3 .nine-img{
		width: 33.33%;
		display: inline-block;
		position: relative;
	}
</style>
