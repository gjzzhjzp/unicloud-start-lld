<template>
	<view class="jz-sy-list">
		<template v-show="!isEmpty">
			<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}"
				collection="jz-opendb-resources" :where="where" field="author,title,avatar,is_encryption"
				@load="loadSuccess">
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
				where: "",
				isEmpty: true
			}
		},
		mixins:[yqm],
		created() {
			this.where = 'article_status==1';
		},
		methods: {
			
			// 数据加载完成
			loadSuccess(data) {
				console.log("loadSuccess", data);
				if (data && data.length > 0) {
					this.isEmpty = false;
				} else {
					this.isEmpty = false;
				}
			},
		}
	}
</script>
<style>
	.jz-sy-list-item {
		margin: 6px 4px;
	}
</style>
