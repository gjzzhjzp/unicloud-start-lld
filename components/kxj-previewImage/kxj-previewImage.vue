<template>
	<view class="previewImage" :style="{ 'background-color': 'rgba(0,0,0,' + opacity + ')' }" v-if="show" @tap="close"
		@touchmove.stop.prevent>
		<swiper class="swiper" :current="index" @change="swiperChange" :disable-touch="swiper" :circular="circular">
			<swiper-item v-for="(img, i) in imgs" :key="'swiper-item-'+i" :id="'swiper-item-'+i">
				<!-- <movable-area class="marea" scale-area>
					<movable-view :id="'movable-view-'+i" :key="'movable-view-'+i" class="mview" direction="all"
						:out-of-bounds="false" :inertia="true" damping="90" friction="2" scale="true" scale-min="1"
						scale-max="4" :scale-value="scale" @scale="onScale" @change="movableChange"> -->
						<view class="slot-gonggao_content previewImage_content">
							<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
								<image :id="'image-'+i" :key="'movable-view'+i" class="image" :src="img"
									:style="{ transform: 'rotateZ(' + deg + 'deg)' }" :data-index="i" :data-src="img"
									mode="widthFix" @touchmove="handletouchmove" @touchstart="handletouchstart"
									@touchend="handletouchend" />
							</scroll-view>
						</view>
					<!-- </movable-view>
				</movable-area> -->
			</swiper-item>
		</swiper>
		<view class="page" v-if="imgs.length > 0">
			<text class="text">{{ index + 1 }} / {{ imgs.length }}</text>
		</view>
		<!-- <view v-show="showImageXz" class="save" v-if="saveBtn" @click.stop.prevent="save"><text class="text">保存</text></view> -->
		<!-- <view class="rotate" v-if="rotateBtn" @click.stop.prevent="rotate"><text class="text">旋转</text></view> -->
		<view class="desc" v-if="descs.length > 0 && descs.length == imgs.length && descs[index].length > 0">
			{{ descs[index] }}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'kxj-previewImage', //插件名称
		props: {
			imgs: {
				//图片列表
				type: Array,
				required: true,
				default: () => {
					return [];
				}
			},
			descs: {
				//描述列表
				type: Array,
				required: false,
				default: () => {
					return [];
				}
			},
			//透明度,0到1之间。
			opacity: {
				type: Number,
				default: 0.9
			},
			//保存按键
			saveBtn: {
				type: Boolean,
				default: true
			},
			//旋转按键
			rotateBtn: {
				type: Boolean,
				default: true
			},
			//循环预览
			circular: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scrollTop: 0,
				swiper: false, //是否禁用
				show: false, //显示状态
				index: 0, //当前页
				deg: 0, //旋转角度
				time: 0, //定时器
				interval: 1000, //长按事件
				scale: 1, //缩放比例
				showImageXz: true,
				random: parseInt(1000000 * Math.random())
			};
		},
		created() {
			// debugger;
			var config = getApp().globalData.systemconfig;
			var t_800007 = config["800007"];
			this.showImageXz = t_800007 == '1' ? true : false;
		},
		methods: {
			//比例变化
			onScale(e) {

			},

			//长按事件相关内容---------开始-------------------
			//接触开始
			handletouchstart(e) {
				var tchs = e.touches.length;
				if (tchs != 1) {
					return false;
				}
				this.time = setTimeout(() => {
					this.onLongPress(e);
				}, this.interval);
				return false;
			},
			//清除定时器
			handletouchend() {
				clearTimeout(this.time);
				if (this.time != 0) {
					//处理点击时间
				}
				return false;
			},
			//清除定时器
			handletouchmove() {
				// console.log("1111111111");
				clearTimeout(this.time);
				this.time = 0;
			},
			// 处理长按事件
			onLongPress(e) {
				e.stopPropagation();
				e.preventDefault();
				var src = e.currentTarget.dataset.src;
				var index = e.currentTarget.dataset.index;
				var data = {
					src: src,
					index: index
				};
				this.$emit('longPress', data);
				console.log("长按");
			},
			//长按事件相关内容---------结束-------------------

			//图片改变
			swiperChange(e) {
				this.index = e.target.current; //更新当前图片index

				this.$nextTick(function() {
					this.scale = 1;
				})

				//this.deg = 0; //旋转角度
				//this.swiper=true;
			},

			//移动变化
			movableChange(e) {
				//console.log(e);
				/* if(this.old.scale <= 1){
					this.swiper=false;
				}else if(e.detail.x===0){
					this.swiper=false;
				} */
			},


			//保存
			save(e) {
				var _this = this;
				var src = this.imgs[this.index];
				//#ifdef MP-WEIXIN
				//提前向用户发起授权请求
				uni.authorize({
					scope: 'scope.writePhotosAlbum',
					success() {
						console.log('kxj-previewImage:允许储存');
						_this.downloadImg(src);
					}
				});
				//#endif

				//#ifdef APP-PLUS
				this.downloadImg(src);
				//#endif

				//#ifdef H5
				this.downloadIamgeH5(this.index, this.random + "_" + this.index);
				// this.downloadImg(src);
				// 非同源图片将直接打开
				// var abtn = document.createElement('a');
				// abtn.href = src;
				// abtn.download = '';
				// abtn.target = '_blank';
				// abtn.click();
				//#endif
			},
			downloadIamgeH5(index, name) {
				// debugger;
				var image = new Image()
				// 解决跨域 Canvas 污染问题
				image.setAttribute('crossOrigin', 'anonymous')
				image.onload = function() {
					var canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;

					var context = canvas.getContext('2d');
					context.drawImage(image, 0, 0, image.width, image.height);
					var url = canvas.toDataURL('image/png');

					// 生成一个a元素
					var a = document.createElement('a');
					// 创建一个单击事件
					var event = new MouseEvent('click');

					// 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
					a.download = name || '下载图片名称';
					// 将生成的URL设置为a.href属性
					a.href = url;

					// 触发a的单击事件
					a.dispatchEvent(event);
				}
				image.src = document.querySelector("#image-" + index + " img").src;
			},


			//下载并保存文件
			downloadImg(src) {
				//下载图片文件
				// uni.showLoading({
				// 	title: '大图提取中'
				// });
				uni.downloadFile({
					url: src,
					success: function(res) {
						console.log('kxj-previewImage:下载成功');
						uni.hideLoading();
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.showToast({
									title: '已保存至相册',
									duration: 1000
								});
							}
						});
					},
					fail: function() {
						uni.hideLoading();
						uni.showToast({
							title: '图片下载失败',
							icon: 'none',
							duration: 1000
						});
					}
				});
			},

			//旋转
			rotate(e) {
				this.deg = this.deg == 270 ? 0 : this.deg + 90;
			},
			//打开
			open(e) {
				if (e === null || e === '') {
					console.log('kxj-previewImage:打开参数无效');
					return;
				}

				if (!isNaN(e)) {
					if (e >= this.imgs.length) {
						console.log('kxj-previewImage:打开参数无效');
					} else {
						this.index = e;
					}
				} else {
					var index = this.imgs.indexOf(e);
					if (index === -1) {
						this.imgs = [e];
						this.index = 0;
						console.log('kxj-previewImage:未在图片地址数组中找到传入的图片，已为你自动打开单张预览模式')
					} else {
						this.index = this.imgs.indexOf(e);
					}
				}
				console.log('kxj-previewImage:当前预览图片序号' + this.index);
				this.show = true;
			},
			//关闭
			close(e) {
				this.show = false;
				this.index = 0; //当前页
				this.deg = 0; //旋转角度
				this.time = 0; //定时器
				this.interval = 1000; //长按事件
				this.scale = 1; //缩放比例
			}
		}
	};
</script>

<!--使用scss,只在本组件生效-->
<style lang="scss" scoped>
	.slot-gonggao_content {
		overflow: auto;
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.slot-gonggao_content>uni-scroll-view {
		max-height: 100vh;

	}

	.previewImage {
		z-index: 999;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #000000;
		user-select: none;

		.swiper {
			width: 100%;
			height: 100%;

			.marea {
				height: 100%;
				width: 100%;
				position: fixed;
				overflow: hidden;

				.mview {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: auto;
					min-height: 100%;

					.image {
						width: 100%;
					}
				}
			}
		}

		.page {
			position: absolute;
			width: 100%;
			bottom: 20rpx;
			text-align: center;

			.text {
				color: #fff;
				font-size: 26rpx;
				background-color: rgba(0, 0, 0, 0.5);
				padding: 3rpx 16rpx;
				border-radius: 20rpx;
				user-select: none;
			}
		}

		.save {
			position: absolute;
			left: 10rpx;
			width: 130rpx;
			height: 56rpx;
			bottom: 10rpx;
			text-align: center;
			padding: 10rpx;

			.text {
				background-color: rgba(0, 0, 0, 0.5);
				color: #fff;
				font-size: 30rpx;
				border-radius: 20rpx;
				border: 1rpx solid #f1f1f1;
				padding: 6rpx 22rpx;
				user-select: none;
			}

			.text:active {
				background-color: rgba(100, 100, 100, 0.5);
			}
		}

		.rotate {
			position: absolute;
			right: 10rpx;
			width: 130rpx;
			height: 56rpx;
			bottom: 10rpx;
			text-align: center;
			padding: 10rpx;

			.text {
				background-color: rgba(0, 0, 0, 0.5);
				color: #fff;
				font-size: 30rpx;
				border-radius: 20rpx;
				border: 1rpx solid #f1f1f1;
				padding: 6rpx 22rpx;
				user-select: none;
			}

			.text:active {
				background-color: rgba(100, 100, 100, 0.5);
			}
		}

		.desc {
			position: absolute;
			top: 0;
			width: 100%;
			padding: 5rpx 10rpx;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			background-color: rgba(0, 0, 0, 0.5);
			color: #fff;
			font-size: 28rpx;
			letter-spacing: 3rpx;
			user-select: none;
		}
	}
</style>
