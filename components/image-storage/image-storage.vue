<template>
	<image :src="img_url" :mode="mode" :fade-show="fadeShow" :webp="webp" :show-menu-by-longpress="showMenuByLongpress"
	 :lazy-load="lazyLoad" :style="[style]" @tap="fnEvent('click', $event)" @error="imgError($event)" @load="fnEvent('load', $event)"></image>
</template>

<script>
	import {API_URL, IMG_CACHE} from '@/env'
	export default {
		name: 'image-cache',
		props: {
			mode: {
				type: String,
				default: 'scaleToFill'
			},
			fadeShow: {
				type: Boolean,
				default: true
			},
			lazyLoad: {
				type: Boolean,
				default: false
			},
			webp: {
				type: Boolean,
				default: false
			},
			showMenuByLongpress: {
				type: Boolean,
				default: false
			},
			// dir: {
			//   type: String,
			//   default: 'imgcache'
			// },
			src: {
				type: String,
				default: ""
			},
			defaultImg: {
				type: String,
				default: '../../static/center/nologin.png'
			},
			customStyle: {
				type: [Object, String],
				default: () => ({})
			},
			width: {
				type: [String, Number]
			},
			height: {
				type: [String, Number]
			},
			url: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				img_url: '',
				isTemporary: false, // 是否使用缓存
				isLocal: false, // 是否本地
				storageTime: 7 * 24 * 3600, // 缓存时间
				isDown: false,
			}
		},
		computed: {
			style() {
				var style = {
					willChange: 'transform'
				}

				// 判断传过来的值不为 undefined null ''
				if ((this.width ?? '') !== '') style.width = this.addUnit(this.width)
				if ((this.height ?? '') !== '') style.height = this.addUnit(this.height)
				if (typeof(this.customStyle) == 'string') {
					var s = '';
					style.forEach(function(key, item) {
						s += key + ':' + item;
					})
					return s + this.customStyle;
				}
				return {
					...style,
					...this.customStyle
				}
			}
		},
		watch: {
			img_url: {
				handler: function() {
					var the = this;
					if (!/^https?:\/\//.test(the.src)) { // 判断是否网络地址
						the.img_url = the.url + the.src;
						if (!/^https?:\/\//.test(the.src)) {
							the.isLocal = true;
						}
						return false;
					}
					
					the.$storage.get(the.src, IMG_CACHE, true).then((res) => {
						if (res.data != '') {
							the.img_url = res.data;
							the.isTemporary = true;
						} else {
							the.getImgUrl();
						}
					}, (e) => {
						the.getImgUrl();
					})
				},
				immediate: true
			}

		},
		methods: {
			getImgUrl() {
				if (this.isDown) {
					return false;
				}
				var the = this;
				the.isDown = true;
				uni.downloadFile({
					url: the.src,
					success: (ress) => {
						if (ress.statusCode === 200) {
							the.isTemporary = false;
							// #ifndef H5
							uni.saveFile({
								tempFilePath: ress.tempFilePath,
								success: function(res) {
									the.$storage.set(the.src, res.savedFilePath, the.storageTime, IMG_CACHE);
									var savedFilePath = res.savedFilePath;
									the.img_url = res.savedFilePath;
								}
							});
							// #endif
							// #ifdef H5
							the.$storage.set(the.src, ress.tempFilePath, the.storageTime, IMG_CACHE)
							the.img_url = ress.tempFilePath;
							// #endif
						} else {
							the.img_url = the.defaultImg;
						}
					},
					fail: () => {
						the.img_url = the.src;
					}
				});
			},
			// 发送事件
			fnEvent(emit, event) {
				this.$emit(emit, event)
			},
			imgError(event) {
				// 判断是不是使用的缓存
				if (this.isTemporary && !this.isDown) {
					// 图片错误去下载
					this.getImgUrl();
				} else {
					// 判断是不是本地文件出错 添加域名尝试
					if (this.isLocal) {
						this.img_url = BASE_URL . this.img_url;
					} else {
						this.img_url = this.defaultImg;
					}
				}
				this.fnEvent('error', event);
			},
			addUnit(value) {
				value = String(value ?? '')
				return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value) ? `${value}rpx` : value
			}
		}
	}
</script>
