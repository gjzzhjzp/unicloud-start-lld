<template>
	<view class="sevicecontent">
		<u-modal v-model="showModel" title="服务条款" @confirm="confirm" width="85%">
			<view class="sevicecontent-slot-content">
				<view class="sevicecontent-content" >
					<rich-text :nodes="content"></rich-text>
					<!-- <view v-html="content"></view> -->
				</view>
				<view class="sevicecontent-time" style="margin-left: 2rem;">
					<view class="sevicecontent-time1" style="width:8em">
						请仔细阅读并等待
					</view>
					<view class="sevicecontent-time1 sevicecontent-time2" style="width:1.5em">
						<u-count-down @end="enddown" :timestamp="30" border-color="#7275D3" color="#7275D3" :show-days="false" :show-hours="false" :show-border="true" :show-minutes="false"></u-count-down>
					</view>
					<view class="sevicecontent-time1 sevicecontent-time3" style="width:6.5em">秒后输入内容</view>
				</view>
				<view class="content-input" style="margin-top: 10px;">
					<u-input :disabled="disabled" placeholder="请输入..." v-model="inputvalue" type="textarea" :border="true" />
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
				content:"",
				inputvalue:"",
				disabled:true
			}
		},
		created(){
			// debugger;
			var config=getApp().globalData.config;
			if(config["800013"]){
				this.content=config["800013"];
			}
		},
		methods: {
			enddown(){
				this.disabled=false;
			},
			show() {
				this.showModel = true;
			},
			confirm(){
				this.showModel=true;
				if(!this.inputvalue){
					uni.showToast({
						title:"请输入内容",
						icon:"none"
					});
					return;
				}
				if(this.inputvalue=="我已仔细阅读并同意以上内容"){
					var agree_service = uni.setStorageSync("agree_service",true);
					this.$emit("confirm");
					this.showModel=false;
				}
				else{
					uni.showToast({
						title:"你输入的内容错误",
						icon:"none"
					});
				}
			}
		}
	}
</script>

<style>
	.sevicecontent-slot-content{
		padding: 10px;
	}
	/* #ifdef H5 */
	.sevicecontent-time1,.sevicecontent-time1{
		display: inline-block;
	}
	.sevicecontent-time{
		white-space: nowrap;
	}
	/* #endif */
	/* #ifdef APP-PLUS */
		.sevicecontent-time2{
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
		}
	/* #endif */
</style>
