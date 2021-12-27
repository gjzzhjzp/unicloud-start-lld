<template>
	<view class="smallImage">
		<view v-if="showNum>=index" class="smallImage1" @click="previewOpen(data)">
			<!-- <image-storage :src="data.url"  width="100%" :customStyle="{borderRadius:'6px'}" mode="aspectFill"></image-storage> -->
			<!-- <u-lazy-load v-if="data.url.indexOf('gif')==-1" @click="previewOpen(data)" threshold="300"
				border-radius="10" :image="data.url" img-mode="aspectFill"></u-lazy-load> -->
			<u-image :src="data.url" loading-icon="/static/center/zheng1.png" error-icon="/static/center/error_zheng.png" :border-radius="8" @click="previewOpen(data)" @load="loadSuccess(index)" @error="errorImg(index)"
				mode="aspectFill"></u-image>
		</view>
		<view v-else class="smallImage1">
			<image src="/static/center/zheng1.png"  :style="{'border-radius':'4px'}" mode="aspectFill"></image>
		</view>
		<view class="smallImage_gif" v-show="showgif">
			动图
		</view>
	</view>
</template>

<script>
	export default {
		name: "smallImage",
		data() {
			return {
			}
		},
		props: {
			showNum: {
				type: Number,
				default () {
					return 0
				}
			},
			index: {
				type: Number,
				default () {
					return 0
				}
			},
			data: {
				type: Object,
				default () {
					return {}
				}
			},
			single: {
				type: Boolean,
				default () {
					return false
				}
			}
		},
		computed:{
			showgif(){
				if(this.data.url.indexOf('gif')==-1){
					return false;
				}else{
					return true;
				}
			}
		},
		methods: {
			previewOpen(data) {
				this.$emit("preview", data);
			},
			loadSuccess(index) {
				index++;
				this.$emit("load", index);
			},
			errorImg(index) {
				index++;
				this.$emit("load", index);
			}
		}
	}
</script>

<style>
	.smallImage {
		/* height: 300rpx; */
		width: 100%;
		overflow: hidden;
		position: relative;
		padding-top: 100%;
	}

	.smallImage_gif {
		    position: absolute;
		    right: 2px;
		    z-index: 999;
		    bottom: 2px;
		    background: rgb(114, 117, 211);
		    font-size: 12px;
		    padding: 2px;
		    color: #fff;
		    border-radius: 2px;
	}

	.smallImage1 {
		position: absolute;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		height: 100%;
		width: 100%;
		padding: 4rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
