<template>
	<view class="jz-sy-list">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}"
			collection="jz-opendb-resources" :where="where" field="author,title,avatar">
			<u-row gutter="16">
				<u-col span="6" class="jz-sy-item" v-for="(item,index) in data" :key="index">
					<view class="jz-sy-list-item" @click="toDetail(item)">
						<view>
							<u-image width="100%" height="150rpx" :src="item.avatar.url"></u-image>
						</view>
						<view>{{item.title}}</view>
					</view>
				</u-col>
			</u-row>
		</unicloud-db>
	</view>
</template>
<script>
	export default {
		data() {	
			return {
				where: "",
				list: []
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
			}
		}
	}
</script>
<style>
	.jz-sy-list-item {
		margin: 6px
	}
</style>
