<template>
	<view class="nineSquared">
		<view @click="toggleType('grid')" v-show="listtype=='grid'" style="display: flex;justify-content: flex-end;"
			class="nineSquared_icon" :style="{'top':top+'px'}">
			<u-icon size="36" name="/static/grid/list.png"></u-icon>
			<view style="color: #7275D3;margin-left: 4px;">列表</view>
		</view>
		<view @click="toggleType('list')" v-show="listtype=='list'" style="display: flex;justify-content: flex-end;"
			class="nineSquared_icon" :style="{'top':top+'px'}">
			<u-icon size="32" name="/static/grid/grid.png"></u-icon>
			<view style="color: #7275D3;margin-left: 4px;">宫格</view>
		</view>
		<template v-if="listtype=='grid'">
			<!-- <view class="nineSquared_1" v-if="list.length==1">
				<u-grid :col="1" :border="false">
					<u-grid-item v-for="(item,index) in list" :key="index" :custom-style="{padding: '0px'}">
						<small-image @load="loadsuccess" :index="index" :showNum="showNum" :single="true" :data="item"
							ref="smallImage2" @preview="preview(item)">
						</small-image>
					</u-grid-item>
				</u-grid>
			</view> -->
			<view class="nineSquared_2" v-if="list.length<5">

				<u-grid :col="2" :border="false">
					<u-grid-item v-for="(item,index) in list" :key="index" :custom-style="{padding: '0px'}">
						<small-image @load="loadsuccess" :index="index" :showNum="showNum" :data="item"
							ref="smallImage2" @preview="preview(item)"></small-image>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="nineSquared_3" v-else>
				<u-grid :col="3" :border="false">
					<u-grid-item v-for="(item,index) in list" :key="index" :custom-style="{padding: '0px'}">
						<template v-if="index>=8&&list.length>9">
							<template v-if="index==8">
								<small-image @load="loadsuccess" :index="index" :showNum="showNum" :data="item"
									ref="smallImage3" @preview="preview(item)"></small-image>
								<view v-show="!showmore" class="small-image-cover" @click="show_more()">
									<view class="small-image-cover-text">更 多</view>
								</view>
							</template>
							<template v-else>
								<small-image @load="loadsuccess" :index="index" :showNum="showNum" v-if="showmore"
									:data="item" ref="smallImage3" @preview="preview(item)">
								</small-image>
							</template>
						</template>
						<template v-else>
							<small-image @load="loadsuccess" :index="index" :showNum="showNum" :data="item"
								ref="smallImage3" @preview="preview(item)"></small-image>
						</template>
					</u-grid-item>
				</u-grid>
			</view>
		</template>
		<template v-else>
			<view style="margin: 10rpx;" v-for="(data,index) in list" :key="index">
				<u-lazy-load v-if="data.url.indexOf('gif')==-1" @click="preview(data)" threshold="300"
					border-radius="10" :image="data.url" img-mode="widthFix"></u-lazy-load>
				<image v-else :src="data.url" @click="preview(data)" mode="widthFix"></image>
			</view>
			<!-- 
		<small-image v-for="(item,index) in list" :data="item" ref="smallImage4" @preview="preview(item)">
		</small-image> -->
		</template>
	</view>
</template>
<script>
	import smallImage from "./smallImage.vue"
	export default {
		name: "nineSquared",
		data() {
			return {
				top:16,
				showmore: false,
				listtype: "grid",
				showNum: 0 ///允许显示的index
			}
		},
		components: {
			smallImage
		},
		created(){
			if(typeof plus!="undefined"){
							this.top=46;
						}
		},
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			loadsuccess(num) {
				this.showNum = num;
			},
			toggleType(type) {
				if (type == "grid") {
					this.listtype = "list";
				} else {
					this.listtype = "grid";
				}
			},
			show_more() {
				this.showmore = true;
			},
			preview(item) {
				console.log("item", item);
				this.$emit("preview", item);
			}
		}
	}
</script>

<style>
	.nineSquared_icon {
		position: fixed;
		right: 10px;
		/* top: 46px; */
		z-index: 9999;
	}

	.nineSquared_3 .nine-img {
		width: 33.33%;
		display: inline-block;
		position: relative;
	}

	.small-image-cover {
		position: absolute;
		top: 0px;
		bottom: 0px;
		z-index: 999;
		background: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
	}

	.small-image-cover-text {
		font-size: 50rpx;
		color: #fff;
	}
</style>
