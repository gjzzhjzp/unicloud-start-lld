<template>
	<view class="jz-container">
		<u-navbar :is-back="true" title="检测版本升级"></u-navbar>
		<view class="zx" v-if="zxbb.app_bbh&&zxbb.app_bbtp.length>0">
			<view style="margin-bottom: 10px;">
				您当前的版本是{{app_bbmc}},可升级到最新版本
			</view>
			<u-image :src="zxbb.app_bbtp[0].url" height="250px" mode="heightFix"></u-image>
			<view class="zxbb_button" style="margin: 10px;">
				<view class="zxbb_button_a">
					<a class="zxbb_button_a1" @click="saveImage" target="_self">保存图片</a>
				</view>
				<view class="zxbb_button_a">
					<a class="zxbb_button_a2" download :href="zxbb.app_bbdz" target="_self">下载最新版</a>
				</view>
			</view>
			<view class="zxbb_ss" style="text-align: left;">
				<view style="padding: 10px;">
					升级方法：
					<view>
						1、直接点击下载最新版APP安装
					</view>
					<view style="margin-top: 6px;">
						2、保存图片》微信二维码扫码》右上角选择浏览器打开(或直接通过浏览器扫码)》自动下载APP》安装升级
					</view>
				</view>
				<view style="padding: 10px;">
					版本升级说明：<view style="margin-top: 6px;" v-html="zxbb.app_bbsm"></view>
				</view>
			</view>
		</view>
		<view v-else class="nozx">
			您的版本是{{app_bbmc}},已经是最新版本了哦~~
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				app_bbmc: "0.0.0",
				app_bbh: 0,
				zxbb: {}
			}
		},
		created() {
			this.app_bbh=plus.runtime.versionCode;
			this.app_bbmc=plus.runtime.version;
			this.checkBb();
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.checkBb();
			uni.stopPullDownRefresh();
		},
		methods: {
			// 检测版本
			async checkBb() {
				const db = uniCloud.database();
				const collection = db.collection('opendb-news-appbb');
				var resultdata = await collection.where({
					app_bbh: db.command.gt(this.app_bbh)
				}).orderBy("app_bbh", "desc").get();
				if (resultdata.result.data && resultdata.result.data.length > 0) {
					this.zxbb = resultdata.result.data[0];
				}
			},
			// 保存图片
			saveImage() {
				var src = this.zxbb.app_bbtp[0].url;
				//#ifdef APP-PLUS
				this.downloadImg(src);
				//#endif
			},
			downloadImg(src) {
				uni.downloadFile({
					url: src,
					success: function(res) {
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
			}
		}
	}
</script>
<style>
	.nozx,
	.zx {
		text-align: center;
		padding: 10px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.zxbb_button_a {
		width: 100px;
		height: 36px;
		margin: 10px;
		line-height: 36px;
		display: inline-block;
	}

	.zxbb_button_a1 {
		background-color: #AAD9FF;
	}

	.zxbb_button_a2 {
		background-color: #777BCE;
	}

	.zxbb_button a {
		color: #fff;
		text-decoration: none;
		display: block;
		border-radius: 6px;
	}

	.zxbb_ss {
		font-size: 1.1em;
	}
</style>
