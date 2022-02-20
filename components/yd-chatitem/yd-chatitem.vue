<template>
	<view class="chatitem">
		<view v-if="isLeft" class="leftitem" :style="{backgroundColor: bgColor}">
			<image class="icon" :src="icon" :style="{height: iconSize, width: iconSize,marginTop:'10px',borderRadius:'6px'}"></image>
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
				default: "16px"
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
				default: "45px"
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
					width: 45px;
					height: 45px;
					border-radius: 6px;
				}
			}
			.time{
				    position: absolute;
				    right: 10px;
			}

			.info {
				margin: 3px 10px;
				flex:1;

				.nickname {
					font-size: 16px;
					color: #9b9b9b;
					display: block;
				}

				.message {
					display: block;
					position: relative;
					top: 0;
					left: 0;
					font-size: 16px;
					margin-top: 3px;
					padding: 10px 10px;
					background-color: #fff;
					border-radius: 5px;

					.angle {
						position: absolute;
						left: -12px;
						top: 14px;
						width: 0;
						height: 0;
						border: 5px solid transparent;
						border-right: 8px solid #fff;
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
					width: 45px;
					height: 45px;
					border-radius: 6px;
				}
			}

			.info {
				margin: 3px 10px;
				text-align: right;

				.nickname {
					font-size: 16px;
					color: #9b9b9b;
					display: block;
				}

				.message {
					display: block;
					position: relative;
					top: 0;
					right: 0;
					font-size: 16px;
					margin-top: 3px;
					padding: 10px 10px;
					background-color: #fff;
					border-radius: 5px;

					.angle {
						position: absolute;
						right: -12px;
						top: 14px;
						width: 0;
						height: 0;
						border: 5px solid transparent;
						border-left: 8px solid #fff;
					}
				}
			}
		}
	}
</style>
