<style lang="scss">
	.user-status-text {
		color: red;
		font-size: 36rpx;
	}
	.pao {  
		transform: 'translateX(100%)';  
		position: absolute;
		top: 0;
		left: 0;
	}  
	.all-content{
		position: relative;
		overflow: hidden;
	}
</style>

<template>
	<cover-view>
		<view class="all-content" :style="{width:`${screenWidth}px`,height:`${maxTop}px`}">
			<view class="pao" v-for="(item,index) in listData" :key="item.id" :ref="'pao_' + item.id" :style="{top:`${item.top}px`,width:`${screenWidth}px`}">
				<text class="user-status-text">{{item.item}}</text>
			</view>
		</view>
	</cover-view>
</template>
<script>
	// #ifdef APP-PLUS
	const animation = weex.requireModule('animation')
	// #endif
	export default {
		props: {
			maxTop: {
				type: Number,
				default: 200
			},
			screenWidth:{  //弹幕容器宽度
				type:Number,
				default: 375
			},
			list:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data() {
			return {
				listData: this.list,
				itemId:1,
			}
		},
		watch:{
			list(){
				this.listData=this.list;
			}
		},
		created() {
			// uni.getSystemInfo({
			// 	success:e => {
			// 		this.screenWidth = e.screenWidth
			// 	}
			// })
		},
		methods: {
			// 开始动画
			startAni(){
				
			},
			add(obj) {
				this.itemId++;
				let data = {
					item: obj.item,
					id:this.itemId,
					top:Math.ceil(Math.random() * (this.maxTop - 40))   //这里的40是弹幕距离弹幕容器底部的距离，可以根据自己需求修改
				}
				this.listData.push(data);
				// #ifdef APP-PLUS
				setTimeout(() => {
					animation.transition(this.$refs['pao_' + data.id][0], { 
						styles: {
							transform: 'translateX(-100%)',
							transformOrigin: 'center center'
						},
						duration: 6000, //ms     
						timingFunction: 'linear',
						delay: 0,//ms  
					}, () => {
						// 这里做动画完成 回收节点
						this.listData.shift()
					})
				},500)
				// #endif
				
			},
		
		}

	}
</script>
<style>

</style>
