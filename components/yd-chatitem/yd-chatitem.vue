<template>
	<view class="chatitem">
		<view v-if="isLeft" class="leftitem" :style="{backgroundColor: bgColor}">
			<image class="icon" :src="icon" :style="{height: iconSize, width: iconSize,marginTop:'20rpx',borderRadius:'6px'}"></image>
			<view class="info">
				<text class="nickname" :style="{fontSize: nameSize, color: nameColor}">{{ nickname }}</text>
				<text class="message"
					:style="{backgroundColor: bubbleColor, fontSize: messageSize, color: messageColor}">
					<view class="angle" :style="{borderRightColor: bubbleColor}"></view>
					<!-- {{ message }} -->
					<view v-html="message">
					</view>
				</text>
			</view>
			<view class="time">
				<uni-dateformat :threshold="[]" :date="leftTime"></uni-dateformat>
			</view>
		</view>
		<view v-else class="rightitem">
			<view class="info">
				<text class="nickname" :style="{fontSize: nameSize, color: nameColor}">{{ nickname }}</text>
				<text class="message"
					:style="{backgroundColor: bubbleColor, fontSize: messageSize, color: messageColor}">
					<view class="angle" :style="{borderLeftColor: bubbleColor}"></view>
					{{ message }}
				</text>
			</view>
			<image class="icon" :src="icon" :style="{height: iconSize, width: iconSize,marginTop:'20rpx',borderRadius:'6px'}"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			leftTime:{
				type: [String,Number],
				default(){
					return ""
				}
			},
			isLeft: {
				type: Boolean,
				default: true
			},
			nickname: {
				type: String,
				default: "系统通知"
			},
			message: {
				type: String,
				default: "你好呀"
			},
			icon: {
				type: String,
				default: "/static/center/system.png"
			},
			bubbleColor: {
				type: String,
				default: "#7275d3"
			},
			bgColor: {
				type: String,
				default: "#fff"
			},
			nameSize: {
				type: String,
				default: "32rpx"
			},
			messageSize: {
				type: String,
				default: "16px"
			},
			nameColor: {
				type: String,
				default: "#9b9b9b"
			},
			messageColor: {
				type: String,
				default: "#fff"
			},
			iconSize: {
				type: String,
				default: "90rpx"
			}
		},
		data() {
			return {

			};
		},
		mounted(){
			$(".zyid").each(function(){
				var that=this;
				$(that).on("click",()=>{
					var that=this;
					var id=$(that).attr("id");
					uni.navigateTo({
						url:"/pages/detail/detail?id="+id
					});
				})
			})
			$(".ftid").each(function(){
				var that=this;
				$(that).on("click",()=>{
					var that=this;
					var id=$(that).attr("id");
					uni.navigateTo({
						url:"/pages/jz-opendb-taolun/detail/detail?id="+id
					});
				})
			})
		}
	}
</script>

<style lang="scss" scoped>
	
	.chatitem {
		background-color: #ededed;

		.leftitem {
			display: flex;

			.icon {
				.iconStyle {
					display: inline-block;
					width: 90rpx;
					height: 90rpx;
					border-radius: 12rpx;
				}
			}
			.time{
				    position: absolute;
				    right: 10px;
			}

			.info {
				margin: 6rpx 20rpx;
				flex:1;

				.nickname {
					font-size: 32rpx;
					color: #9b9b9b;
					display: block;
				}

				.message {
					display: block;
					position: relative;
					top: 0;
					left: 0;
					font-size: 16px;
					margin-top: 6rpx;
					padding: 20rpx 20rpx;
					background-color: #fff;
					border-radius: 10rpx;

					.angle {
						position: absolute;
						left: -23rpx;
						top: 28rpx;
						width: 0;
						height: 0;
						border: 10rpx solid transparent;
						border-right: 15rpx solid #fff;
					}
				}
			}
		}

		.rightitem {
			display: flex;
			justify-content: flex-end;

			.icon {
				.iconStyle {
					display: inline-block;
					width: 90rpx;
					height: 90rpx;
					border-radius: 12rpx;
				}
			}

			.info {
				margin: 6rpx 20rpx;
				text-align: right;

				.nickname {
					font-size: 32rpx;
					color: #9b9b9b;
					display: block;
				}

				.message {
					display: block;
					position: relative;
					top: 0;
					right: 0;
					font-size: 16px;
					margin-top: 6rpx;
					padding: 20rpx 20rpx;
					background-color: #fff;
					border-radius: 10rpx;

					.angle {
						position: absolute;
						right: -23rpx;
						top: 28rpx;
						width: 0;
						height: 0;
						border: 10rpx solid transparent;
						border-left: 15rpx solid #fff;
					}
				}
			}
		}
	}
</style>
