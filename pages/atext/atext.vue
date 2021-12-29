<template>
	<view>
		<div id="dplayer1" ref="dplayer">
		</div>
	</view>
</template>

<script>
	// import DPlayer from 'dplayer';
	export default {
		data() {
			return {
				dp: null
			}
		},
		mounted() {

			this.dp = new DPlayer({
				container: document.getElementById('dplayer1'),
				autoplay: true,
				theme: '#FADFA3',
				loop: true,
				lang: 'zh-cn',
				screenshot: true,
				hotkey: true,
				preload: 'auto',
				volume: 0.7,
				mutex: true,
				video: {
					url: "http://www.cdedu.com:8081/group1/M00/00/09/wKgAWGGTZF6AM3D5BguvHQ3szfA132.mp4",
					type: 'auto',
				},
				// 暂时不支持字幕
				// subtitle: {
				// 	url: 'http://47.108.224.146/jzzm/2020/20200501.ass',
				// 	type: 'ass',
				// 	fontSize: '25px',
				// 	bottom: '10%',
				// 	color: '#b7daff',
				// },
				danmaku: {
					// id: "123456",
					// api: 'getdanmu',
					// maximum: 10000,
					// user: 'jzp',
					// bottom: '15%',
					// unlimited: false,
				}
			});
		},
		methods: {
			text() {
				var pscreen = plus.webview.currentWebview().opener();
				mui.fire(pscreen, 'changescreen', {
					direction: "landscape-primary"
				});
			},
			text1() {
				var pscreen = plus.webview.currentWebview().opener();
				mui.fire(pscreen, 'changescreen', {
					direction: "portrait-primary"
				});
			}
		}
	}
</script>

<style>
</style>
