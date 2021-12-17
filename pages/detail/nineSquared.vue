<template>
	<view class="nineSquared">
		<view class="nineSquared_1" v-if="list.length==1">
			<u-grid :col="1">
				<u-grid-item v-for="(item,index) in list"  :key="index" :custom-style="{padding: '0 0'}">
					<small-image :data="item" ref="smallImage2" @preview="preview(item)"></small-image>
				</u-grid-item>
			</u-grid>
			<!-- <view class="nine-img">
				<small-image :data="list[0]" ref="smallImage1" @preview="preview(item)"></small-image>
			</view> -->
		</view>
		<view class="nineSquared_2" v-else-if="list.length==2||list.length==4">
				<u-grid :col="2">
					<u-grid-item v-for="(item,index) in list"  :key="index" :custom-style="{padding: '0 0'}">
						<small-image :data="item" ref="smallImage2" @preview="preview(item)"></small-image>
					</u-grid-item>
				</u-grid>
		</view>
		<view class="nineSquared_3" v-else>
			<u-grid :col="3">
				<u-grid-item  v-for="(item,index) in list"  :key="index" :custom-style="{padding: '0 0'}">
					<template v-if="index>=8&&list.length>9">
						<template v-if="index==8">
							<small-image :data="item" ref="smallImage3" @preview="preview(item)"></small-image>
							<view v-show="!showmore" class="small-image-cover" @click="show_more()">
								<view class="small-image-cover-text">更 多</view>
							</view>
						</template>
						<template v-else>
							<small-image v-if="showmore" :data="item" ref="smallImage3" @preview="preview(item)"></small-image>
						</template>
					</template>
					<template v-else>
						<small-image :data="item" ref="smallImage3" @preview="preview(item)"></small-image>
					</template>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>
<script>
	import smallImage from "./smallImage.vue"
	export default{
		name:"nineSquared",
		data(){
			return {
				showmore:false
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
		},
		methods:{
			show_more(){
				this.showmore=true;
			},
			preview(item){
				console.log("item",item);
				this.$emit("preview",item);
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
	.small-image-cover{
		position: absolute;
		top: 0px;
		bottom: 0px;
		z-index: 999;
		background: rgba(255,255,255,0.7);
		width: 100%;
		height: 100%;
		    display: flex;
		    justify-content: center;
		    align-items: center;
	}
	.small-image-cover-text{
		font-size:50rpx;
		color:#fff;
	}
</style>
