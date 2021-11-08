<template>
	<view class="jz-sy-list">
		<template v-show="!isEmpty">
				<u-row gutter="4">
					<u-col span="4" class="jz-sy-item" v-for="(item,index) in list" :key="index">
						<view class="jz-sy-list-item" @click="toDetail(item)">
							<view>
								<u-image width="100%" height="140rpx" :src="item.avatar.url"></u-image>
							</view>
							<view class="jz-sy-list-text">{{item.title}}</view>
						</view>
					</u-col>
				</u-row>
		</template>
		<template v-if="isEmpty">
			<u-empty text="数据为空" mode="list"></u-empty>
		</template>
		<u-modal v-model="showmodel" title="输入邀请码" :show-cancel-button="true" @confirm="confirm">
			<view class="slot-content" style="padding: 10px;">
				<u-input v-model="yqm" type="text" :border="true" placeholder="请输入邀请码"  />
			</view>
		</u-modal>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import yqm from "./yqm.js"
	export default {
		data() {
			return {
				list:[],
				where: "",
				isEmpty: true
			}
		},
		props:{
			// 类型，热门还是最新
			type:{
				type:String,
				default(){
					return ""
				}
			},
			// 标签
			label:{
				type:String,
				default(){
					return ""
				}
			}
		},
		mixins:[yqm],
		created() {
			// this.where = 'article_status==1';
			this.getList();
		},
		methods: {
			getList() {
				uniCloud.callFunction({
					name: 'jzfunction',
					data: {
						action: 'resource/getList',
						data:{
							type:this.type,
							label:this.label
						}
					},
				}).then((res) => {
					var res = res.result;
					console.log("res",res)
					if (res.state == "0000") {
						this.list = res.rows;
						if(this.list.length>0){
							this.isEmpty = false;
						}else{
							this.isEmpty = true;
						}
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						});
					}
				});
			},
		}
	}
</script>
<style lang="scss">
	.jz-sy-list-item {
		margin: 6px 4px;
	}
	.jz-sy-list-text{
		color:$u-type-primary;
		margin-top: 10rpx;
		margin-left: 10rpx;
	}
</style>
