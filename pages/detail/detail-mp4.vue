<template>
	<view class="detail-mp4">
		<view class="uni-padding-wrap uni-common-mt">
			<view style="width: 100%;">
				<video id="myVideo" :src="src" @error="videoErrorCallback" controls></video>
			</view>
		</view>
		<view class="detail-mp4-title">
			{{data.title}}
		</view>
		<view class="detail-mp4-sx">
			<view>
				<text>作者：{{data.author}}</text>
				<text style="margin-left: 10px;">投稿人：{{data.userinfo[0].nickname}}</text>
			</view>
			<view>
				<uni-dateformat class="last_modify_date" :date="data.last_modify_date" format="yyyy-MM-dd"
					:threshold="[60000, 2592000000]" />
			</view>
		</view>
		<view class="detail-mp4-jj">
			简介：{{data.excerpt}}
		</view>
		<view class="detail-mp4-list" v-if="list.length>0">
			<u-row gutter="20">
				<u-col span="3" v-for="(item,index) in list">
					<u-button @click="clickBf(item)" size="medium" :type="item.selected?'primary':''">{{index+1}}
					</u-button>
				</u-col>
			</u-row>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				src: '',
				list: [] ///集数
			}
		},
		props: {
			data: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		mounted() {
			this.videoContext = uni.createVideoContext('myVideo')
			console.log("data", this.data);
			this.data.resources.forEach((item, index) => {
				this.list.push({
					src: item,
					selected: index == 0 ? true : false
				});
			});
			this.src = this.data.resources[0].url;
		},
		methods: {
			clickBf(item) {
				console.log("item",item);
				this.src = item.src;
				this.list.forEach((item1,index)=>{
					this.$set(item1,"selected",false);
				})
				this.$set(item,"selected",true);
			}
		}
	}
</script>

<style>
	.detail-mp4-title {
		font-size: 36rpx;
	}

	.detail-mp4-sx,
	.detail-mp4-jj {
		display: flex;
		justify-content: space-between;
		margin: 10px 6px;
		color: #909399;
	}

	.detail-mp4-item {
		margin: 20rpx 0;
	}

	#myVideo {
		width: 100%;
	}

	.detail-mp4-list-button {
		display: inline-block;
		margin: 6px 10px;
	}
</style>
