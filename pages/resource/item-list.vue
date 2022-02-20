<template>
	<view class="er-item-list resource-tg">
		<u-grid :col="2" :border="false" >
			<u-grid-item v-for="(item, index) in list" :custom-style="{'padding':0}" :key="index" @click="$notMoreTap(toDetail,'notTap',item)">
				<view class="er-item-list-warter">
					<view class="er-item-list-warter1">
						<u-image :show-loading="true" loading-icon="/static/center/chang1.png" error-icon="/static/center/error_chang.png"  height="100px" border-radius="10" :src="imageUrl(item)" mode="aspectFill">
										
						</u-image>
						<view style="padding: 8px;">
							<view class="er-item-list-title">
								{{item.title}}
							</view>
							<view class="er-item-list-author" v-if="item.userinfo">
								<view class="er-item-list-img">
									<view class="original" v-if="item.userinfo&&item.userinfo[0].original">
										<image class="original-img" src="@/static/center/ori_back.png"></image>
									</view>
									<u-avatar :size="25"
										:src="(item.userinfo&&item.userinfo[0].avatar_file)?item.userinfo[0].avatar_file.url:''">
									</u-avatar>
									<text
										style="margin-left: 4px;">{{item.userinfo&&item.userinfo[0].nickname?item.userinfo[0].nickname:'佚名'}}</text>

								</view>
								<view class="er-item-list-right">
									<u-icon name="heart"></u-icon>{{item.like_count||0}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-grid-item>
		</u-grid>
		<u-modal v-model="showmodel" title="输入邀请码" :show-cancel-button="true" @confirm="confirm">
			<view class="slot-content" style="padding: 10px;">
				<view style="margin-bottom: 8px;">
					<u-alert-tips type="warning" description="个人中心>>我的邀请码中可申请邀请码"></u-alert-tips>
				</view>
				<u-input v-model="yqm" type="text" :border="true" placeholder="请输入邀请码" />
			</view>
		</u-modal>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import yqm from "../../components/jz-sy-list/yqm.js"
	export default {
		data() {
			return {
				notTap: true, //一定要设置为true
			}
		},
		mixins: [yqm],
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		watch: {
			list() {
				this.list.forEach((item) => {
					if (item.labels) {
						var arr = [];
						var _labels = item.labels.split("，");
						_labels.forEach((item1) => {
							if (item1) {
								arr.push(item1);
							}
						})
						this.$set(item, "labelarr", arr);
					}
				});
			}
		},
		mounted() {
			// console.log("list", this.list);
		},
		methods: {
			imageUrl(item) {
				var url = "";
				if (Array.isArray(item.avatar)) {
					url = item.avatar[0].url;
				} else {
					url = item.avatar?item.avatar.url:'';
				}
				return url;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.original {
		position: relative;
	}

	.original-img {
		width: 34px;
		height: 34px;
		position: absolute;
		top: -16px;
		left: -5px;
	}

	.er-item-list-warter {
		border-radius: 8px;
		// margin: 10px;
		// background-color: #ffffff;
		padding: 8px;
		position: relative;
		width: 100%;
	}

	.u-close {
		position: absolute;
		top: 16px;
		right: 16px;
	}

	.er-item-list-image {
		width: 100%;
		border-radius: 4px;
	}

	.er-item-list-title {
		font-size: 15px;
		margin-top: 5px;
		color: $u-main-color;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

	}

	.er-item-list-tag {
		display: flex;
		margin-top: 5px;
	}

	.er-item-list-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 2px 7px;
		border-radius: 25px;
		font-size: 10px;
		line-height: 1;
	}

	.er-item-list-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 25px;
		line-height: 1;
		padding: 2px 7px;
		display: flex;
		align-items: center;
		font-size: 10px;
	}

	.er-item-list-author {
		font-size: 11px;
		color: $u-tips-color;
		margin-top: 5px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.er-item-list-img {
		display: flex;
		align-items: center;
	}

	.er-item-list .er-item-list-warter {}

	.er-item-list-right {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.er-item-list .er-item-list-warter {
		// width: 50%;
		display: inline-block;
	}

	.er-item-list-warter1 {
		width: 100%;
		box-shadow: 0px 0px 6px #d5d5d6;
		border-radius: 10px;
		// padding: 10px;
	}
</style>
