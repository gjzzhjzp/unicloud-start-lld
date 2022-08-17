<template>
	<view class="gechi-all">
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="250" :bar-width="0" active-color="#fff" inactive-color="#e5e5e5"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<gequ :data="curdata"></gequ>
			</swiper-item>
			<swiper-item class="swiper-item">
				<gechi :data="curdata"></gechi>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	import gequ from "@/components/gechiAll/gequ.vue"
	export default {
		data() {
			return {
				list: [{
					name: '歌曲'
				}, {
					name: '歌词'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				resources_id:"",
				curdata:{},
				
			};
		},
		components:{gequ},
		props: {
			data: {
				type: Object,
				default () {
					return {
		
					}
				}
			}
		},
		onLoad(e) {
			this.resources_id = e.id;
		},
		mounted() {
			this.getResource();
		},
		methods: {
			getResource() {
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'resource/getResource',
						data: {
							_id: this.resources_id || "619b278913207d00010a1216"
						}
					},
				}).then((res) => {
					var res = res.result;
					if (res.state == "0000") {
						this.curdata = res.rows[0];
						// console.log("this.curdata",this.curdata);
					} else {
						console.log("res", res.msg);
					}
				});
			},
			
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			}
		}
	};
</script>
<style>
	.gechi-all{
		color: #fff;
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		background: linear-gradient(rgb(136, 211, 243), rgb(119, 126, 206), rgb(136, 211, 243));
	}
	.swiper-item{
		/* height: 90vh !important; */
	}
	.swiper-box{
		    -webkit-box-flex: 1;
		    -webkit-flex: 1;
		    flex: 1;
	}
</style>