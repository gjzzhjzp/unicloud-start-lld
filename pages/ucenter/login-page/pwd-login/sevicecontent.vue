<template>
	<view class="sevicecontent">
		<u-modal :show="showModel" title="服务条款" @confirm="confirm" width="350px" confirmColor="#7275D3">
			<view class="sevicecontent-slot-content">
				<view class="sevicecontent-content">
					<rich-text :nodes="content"></rich-text>
					<!-- <view v-html="content"></view> -->
				</view>
				<view class="sevicecontent-time u-flex" style="margin-left: 2rem;">
					<!-- <view class="sevicecontent-time1">

					</view>
					<view class="sevicecontent-time1 sevicecontent-time2"> -->
						<view>请仔细阅读并等待</view><u-count-down autoStart @finish="enddown" :time="30*1000" format="ss"></u-count-down>
						<view>秒后输入内容</view>
					<!-- </view>
					<view class="sevicecontent-time1 sevicecontent-time3"></view> -->
				</view>
				<view class="content-input">
					<u-input :disabled="disabled" placeholder="请输入..." v-model="inputvalue" type="textarea" />
				</view>
				<!-- <view class="content-button" style="margin-top: 10px;text-align: center;">
					<u-button type="primary" size="medium" @click="confirm">确定</u-button>
				</view> -->
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		name: "sevicecontent",
		data() {
			return {
				showModel: false,
				content: "",
				inputvalue: "",
				disabled: true
			}
		},
		created() {
			// debugger;
			var config = getApp().globalData.systemconfig;
			if (config["800013"]) {
				this.content = config["800013"];
			}
		},
		methods: {
			enddown() {
				this.disabled = false;
			},
			show() {
				this.showModel = true;
			},
			confirm() {
				this.showModel = true;
				if (!this.inputvalue) {
					uni.showToast({
						title: "请输入内容",
						icon: "none"
					});
					return;
				}
				if (this.inputvalue == "我已仔细阅读并同意以上内容") {
					var agree_service = uni.setStorageSync("agree_service", true);
					this.$emit("confirm");
					this.showModel = false;
				} else {
					uni.showToast({
						title: "你输入的内容错误",
						icon: "none"
					});
				}
			}
		}
	}
</script>

<style>
	.sevicecontent-slot-content {
		padding: 10px;
	}

	.sevicecontent-time {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

	}
	.content-input{
		margin-top: 10px;
	}

	/* #ifdef H5 */
	/* .sevicecontent-time1,.sevicecontent-time1{
		display: inline-block;
	}
	.sevicecontent-time{
		white-space: nowrap;
	} */
	/* #endif */
	/* #ifdef APP-PLUS */
	/* .sevicecontent-time2{
			position: absolute;
			left: 8em;
			top: 2px;
		}
		.sevicecontent-time3{
			position: absolute;
			left: 9.5em;
		}
		.sevicecontent-time{
			white-space: nowrap;
			position: relative;
		} */
	/* #endif */
</style>
