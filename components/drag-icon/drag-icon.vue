<template>
	<view class="drag-icon" @click="toyouxi()" v-show="showicon">
		<div class="ys-float-btn" 
			:style="{'width': itemWidth+'px','height': itemHeight+'px','left': left+'px','top': top+'px'}" ref="div"
			@touchstart.prevent="(e) => {dragStart(e)}" @touchend.prevent="(e) => {dragEnd(e)}"
			@touchmove.prevent="(e) => {dragProgress(e)}">
			<image src="/static/head/dragicon.png" style="width: 100%;height: 100%;" />
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				left:0,
				top:0,
				clientWidth:0,
				clientHeight:0,
				gapWidth: 0,
				itemWidth: 40, // 图标的宽度
				itemHeight: 40, // 图标的高度
				time1:0,
				time2:0,
				showicon:false
			}
		},
		created() {
			this.clientWidth = document.documentElement.clientWidth;
			this.clientHeight = document.documentElement.clientHeight;
			this.left = this.clientWidth - this.itemWidth - this.gapWidth;
			this.top = this.clientHeight * 0.8;
			var config = getApp().globalData.systemconfig;
			if (config["800030"]=="1") {
				this.showicon=true;
			}else{
				this.showicon=false;
			}
		},

		methods: {
			toyouxi(){
				// debugger;
				uni.navigateTo({
					url:"/pages/youxi/youxi"
				});
			},
			dragStart(e) {
				this.time1=new Date().getTime();
				console.log("this.time1",this.time1)
				this.$refs.div.style.transition = 'none';
			},
			dragEnd(e) {
				this.time2=new Date().getTime();
				if(this.time2-this.time1<200){
					this.toyouxi();
				}else{
					console.log("this.time2",this.time2)
					this.$refs.div.style.transition = 'all 0.3s';
					if (this.left > this.clientWidth / 2) {
						this.left = this.clientWidth - this.itemWidth - this.gapWidth;
					} else {
						this.left = this.gapWidth;
					}
				}
				
			},
			dragProgress(e) {
				// debugger
				if (e.touches && e.touches.length === 1) {
					let touch = event.touches[0];
					this.left = touch.clientX - this.itemWidth / 2;
					this.top = touch.clientY - this.itemHeight / 2;
				}
				
			}
		}
	}
</script>

<style>
	.ys-float-btn {
		position: fixed;
	}
</style>
