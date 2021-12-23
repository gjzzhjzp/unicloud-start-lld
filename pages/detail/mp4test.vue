<template>
	<view>
		<!-- <web-view src="/hybrid/html/video.html"></web-view> -->
		<div id="dplayer" ref="dplayer">
		</div>
	</view>
</template>

<script>
	import DPlayer from 'dplayer';
	export default {
		data() {
			return {
				dp: null
			}
		},
		mounted() {
			// return;
			// console.log("DPlayer", DPlayer);
			// uniCloud.callFunction({
			// 		name: 'getdanmu1',
			// 		data: {
			// 			a: 1
			// 		}
			// 	})
			// 	.then(res => {
			// 		console.log("res", res);
			// 	});
			// 	console.log("this.$refs.dplayer",this.$refs.dplayer);
			// 	console.log("this.$refs.dplayer1111",document.getElementById('dplayer'));
			setTimeout(() => {
				this.dp = new DPlayer({
					container: document.getElementById('dplayer'),
					autoplay: false,
					theme: '#FADFA3',
					loop: true,
					lang: 'zh-cn',
					screenshot: true,
					hotkey: true,
					preload: 'auto',
					volume: 0.7,
					mutex: true,
					video: {
						url: 'http://www.cdedu.com:8081/group1/M00/00/05/wKgAWWGTDBuAWQmOCKxp_-aEPSg311.mp4',
						// pic: 'dplayer.png',
						// thumbnails: 'thumbnails.jpg',
						type: 'auto',
					},
					// subtitle: {
					// 	url: 'dplayer.vtt',
					// 	type: 'webvtt',
					// 	fontSize: '25px',
					// 	bottom: '10%',
					// 	color: '#b7daff',
					// },
					danmaku: {
						id: 'jzszd51129',
						api: 'http://127.0.0.1:57249/cloudfunctions/getdanmu1',
						token: 'gjzzhjzszd511291640',
						getparam: {
							"provider": "aliyun",
							"platform": "h5",
							"param": {
								"a": 1,
								"clientInfo": {
									"PLATFORM": "h5",
									"OS": "ios",
									"APPID": "__UNI__0583E60",
									"LOCALE": "zh-Hans",
									"DEVICEID": "16400017130135763295",
									"CLIENT_SDK_VERSION": "1.0.14"
								},
								"uniIdToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTczZmMzNjllZTY1ZjAwMDE4ZmQ1ZTYiLCJyb2xlIjpbIkFVRElUT1IiXSwicGVybWlzc2lvbiI6WyJtYW5hZ2UiXSwiaWF0IjoxNjQwMjU5OTc1LCJleHAiOjE2NDAyNjcxNzV9.wvbAWA88WAP9lPL08mcXiZJxb5ddwnFu7D8EZ1LWSqI"
							}
						},
						maximum: 10000,
						user: 'jzp',
						bottom: '15%',
						unlimited: true,
					}
				});
			})
		}
	}
</script>

<style>
</style>
