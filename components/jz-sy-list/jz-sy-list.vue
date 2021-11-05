<template>
	<view class="jz-sy-list">
		<template v-show="!isEmpty">
			<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}"
				collection="jz-opendb-resources" :where="where" field="author,title,avatar" @load="loadSuccess">
				<u-row gutter="4">
					<u-col span="4" class="jz-sy-item" v-for="(item,index) in data" :key="index">
						<view class="jz-sy-list-item" @click="toDetail(item)">
							<view>
								<u-image width="100%" height="140rpx" :src="item.avatar.url"></u-image>
							</view>
							<!-- <view>{{item.title}}</view> -->
						</view>
					</u-col>
				</u-row>
			</unicloud-db>
		</template>
		<template v-if="isEmpty">
			<u-empty text="数据为空" mode="list"></u-empty>
		</template>
	</view>
</template>
<script>
	export default {
		data() {	
			return {
				where: "",
				isEmpty:true
			}
		},
		created() {
			this.where = 'article_status==1';
		},
		methods: {
			toDetail(item) {
				uni.navigateTo({
					url: "/pages/detail/detail?id=" + item._id
				});
			},
			// 数据加载完成
			loadSuccess(data){
				console.log("loadSuccess",data);
				if(data&&data.length>0){
					this.isEmpty=false;
				}else{
					this.isEmpty=false;
				}
			}
		}
	}
</script>
<style>
	.jz-sy-list-item {
		margin: 6px 4px;
	}
</style>
