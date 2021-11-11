<template>
	<view class="content">
		<!-- <view class="listbox">
			<view style="padding:10px">音频列表:</view>
			<view v-for="(i, k) in audiolist" :key="k" class="list">
				{{ i.title }}
				<button size="mini" @click="play(k)">{{ !paused && i.src === playinfo.src ? '暂停' : '播放' }}</button>
			</view>
		</view> -->
		<zaudio theme="theme2"></zaudio>
	</view>
</template>
<script>
	import zaudio from '@/components/uniapp-zaudio/zaudio';
	export default {
		components: {
			zaudio
		},
		data() {
			return {
				audiolist: this.$zaudio.audiolist, //当前音频列表
				playIndex: this.$zaudio.playIndex, //当前播放的索引
				paused: this.$zaudio.paused, //当前是否暂停
				playinfo: this.$zaudio.playinfo //当前播放的信息
			}
		},
		created(){
			//注意: 不同的回调方法, 相同的业务函数方法名, 不会相互影响;
			this.$zaudio.on('stop', 'aaa', function(){
				console.log('我是强制暂停或关闭小程序音频浮窗触发的')
			})
			this.$zaudio.on('seek', 'aaa', function(time){
				console.log('进度拖动A', time)
			})
			//注意: 相同的回调方法, 且相同的业务函数方法名, 只作用于第一次注册的业务
			this.$zaudio.on('seek', 'aaa', function(time){
				console.log('进度拖动B', time)
			})
			
			//实时渲染当前的播放状态
			this.$zaudio.syncRender()
			
			//实时获取当前播放状态
			this.$zaudio.syncStateOn('page-index-get-state', ({ audiolist, playIndex, paused, playinfo }) => {
				this.audiolist = audiolist;
				this.playIndex = playIndex;
				this.paused = paused;
				this.playinfo = playinfo;
			});
		},
		props: {
			data: {
				type: Object,
				default () {
					return {}
				}
			},
			list:{
				type: Array,
				default () {
					return []
				}
			}
		},
		watch:{
			list(){
				this.reset();
			}
		},
		mounted() {
			this.reset();
		},
		methods: {
			play(key) {
				//播放或暂停
				this.$zaudio.operate(key);
			},
			go(key) {
				uni.navigateTo({
					url: '/pages/detail/index?key=' + key
				});
			},
			reset() {
				// debugger;
				let data =[];
				this.list.forEach((item)=>{
					data.push({
						src: item.resources[0].url,
						title: item.title,
						singer: item.author,
						coverImgUrl: item.avatar.url
					});
				});
				this.$zaudio.setAudio(data);
				this.$zaudio.operate(0);
			},
			add() {
				let data = [
					// {
					// 	src: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/jn/12.jlhg/8.zhg/2.mp3',
					// 	title: '天边',
					// 	singer: '作者222',
					// 	coverImgUrl: 'https://img.1ting.com/images/special/377/s300_4631dc844ab6429b6bc6fe4ccdc6ed6f.jpg'
					// }
				];
				this.$zaudio.updateAudio(data);
			},
			//异步加载音频并渲染
			asyncSetAudio() {
				let data = [
					// {
					// 	src: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/zzzzzmp3/2014iSep/15F/15xwsk/21.mp3',
					// 	title: '蓝莲花',
					// 	singer: '许巍',
					// 	coverImgUrl: 'https://img.1ting.com/images/special/358/s100_6d9c9a3f9f67fa76b041561ff0042ae4.jpg'
					// },
					];
					
					uni.showLoading()
					setTimeout(()=>{
						this.$zaudio.setAudio(data);
						this.$zaudio.setRender(0);  //setRender: 用于渲染zaudio, 具体查看文档
						uni.hideLoading()
					},1500)
			},
			setRender(){
				this.$zaudio.setRender(1);
			},
			willStop() {
				this.$zaudio.on('playing', 'recharge', info => {
					if (info.current_value > 5) {
						this.$zaudio.stop();
						uni.showModal({
							title: '提示',
							content: '请续费',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				});
			},
		
			removeStop() {
				this.$zaudio.off('playing', 'recharge');
				this.$zaudio.operate();
			},
		
			logPlaying(action) {
				// 一个回调事件可以注册多次业务, action用于区分相同回调事件的不同业务
				//例: playing回调时注册 打印事件
				this.$zaudio.on('playing', action, info => {
					console.log('播放中----' + action, info);
				});
			},
			offPlaying(action) {
				//注意解除事件action必须与注册事件的action相同
				this.$zaudio.off('playing', action);
			},
			stepPlay(val) {
				this.$zaudio.stepPlay(val);
			}
		}
	}
</script>
<style scoped lang="scss">
.listbox {
	margin: 20px 10px 10px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	.list {
		line-height: 40px;
		border-top: 1px solid #ccc;
		padding: 0 10px;

		button {
			float: right;
			margin-top: 5px;
			margin-left: 5px;
		}
	}
}

.demo {
	margin-top: 20px;
	button {
		margin: 5px;
	}
}
.imt-audio.theme2{
	    position: absolute;
	    bottom: 0;
}
</style>
