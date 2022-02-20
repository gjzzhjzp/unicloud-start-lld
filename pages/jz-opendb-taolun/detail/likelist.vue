<template>
	<view>
		<u-grid :col="1" :border="false">
			<u-grid-item v-for="(item, index) in list" bg-color="#F5F5F5" :custom-style="{'padding':0}" :key="index">
				<view class="er-item-list-warter">
					<view class="er-item-list-warter2">
						<view class="er-item-list-warter1">
							<!-- item：{{item}} -->
							<view class="er-item-list-img" @click="toperson(item)">
								<view class="original" v-if="item.user_id&&item.user_id[0].original">
									<image class="original-img" src="@/static/center/ori_back.png"></image>
								</view>
								<u-avatar :size="40"
									:src="(item.user_id&&item.user_id[0].avatar_file)?item.user_id[0].avatar_file.url:''">
								</u-avatar>
								<view class="original-title">
									<text
										style="color: #333333;font-size: 14px;">{{item.user_id&&item.user_id[0].nickname?item.user_id[0].nickname:'佚名'}}</text>
									<uni-dateformat class="publish_date" :date="item.create_date"
										format="yyyy-MM-dd hh:mm:ss" :threshold="[60000, 2592000000]" />
								</view>
							</view>
						</view>
						<view @click="$notMoreTap(toDetail,'notTap',item)">
							<view class="er-item-list-content">
								{{item.excerpt}}
							</view>
						</view>
					</view>
				</view>
			</u-grid-item>
		</u-grid>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				notTap: true, //一定要设置为true
				list: []
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
		watch: {
			data: {
				deep: true,
				handler() {
					// debugger
					this.getList();
				}
			}
		},
		created() {

		},
		methods: {
			showguanzhu(item) {
				if (item.gz_sed) {
					return false;
				} else {
					var user_id = uni.getStorageSync("userInfo");
					if (user_id._id == item.user_id) {
						return false;
					} else if (item.guanzhu && item.guanzhu.length > 0) {
						return false;
					} else {
						return true;
					}
				}
			},
			toperson(item) {
				if (item.user_id && item.user_id.length > 0) {
					var id = item.user_id[0]._id;
					if (id) {
						var user_id = uni.getStorageSync("userInfo");
						if (user_id._id == id) {
							uni.navigateTo({
								url: "/pages/ucenter/ucenter"
							});
						} else {
							uni.navigateTo({
								url: "/pages/ucenter/tacenter?id=" + id
							});
						}
					}
				}
			},
			async getList() {
				var article_id = this.data._id;
				if (article_id) {
					// 获取点赞总数
					var rescount = await db.collection("opendb-news-likeTaolun").where({
						article_id: article_id
					}).count();
					var _number = rescount.result.total;
					db.collection("jz-opendb-taolun").where({
						_id: this.data._id
					}).update({
						like_count1: _number || 0
					});
					const _taolun = db.collection('opendb-news-likeTaolun').where({
							article_id: article_id
						}).field('user_id,create_date').orderBy(
							"create_date desc").getTemp();
					const _user = db.collection('uni-id-users').field('_id,username,nickname,avatar_file,original').getTemp();
					var res = await db.collection(_taolun,_user).get();
					if (res.result && res.result.data) {
						this.list = res.result.data;
					}
				}
			},
			async guanzhu(item) {
				var user_id = item.user_id ? item.user_id[0] : "";
				if (user_id) {
					await db.collection("opendb-news-guanzhu").add({
						user_id: db.getCloudEnv('$cloudEnv_uid'),
						buser_id: user_id._id,
						guanzhu_date: db.getCloudEnv('$cloudEnv_now')
					});
					this.$set(item, "gz_sed", true);
					this.$refs.uToast.show({
						title: '已关注',
						type: 'success'
					});
				}
			},
		}
	}
</script>

<style>
	.er-item-list-content {
		font-size: 14px;
	}

	.publish_date {
		font-size: 10px;
		color: #888888;
	}

	.original {
		position: relative;
	}

	.original-title {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
	}

	.original-img {
		width: 55px;
		height: 55px;
		position: absolute;
		top: -25px;
		left: -8px;
	}

	.er-item-list-warter {
		border-radius: 8px;
		position: relative;
		width: 100%;
	}

	.er-item-list-warter2 {
		padding: 10px;
		background-color: #fff;
		border-radius: 8px;
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
		font-size: 18px;
		font-weight: 600;
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
		border-radius: 25px;
		font-size: 10px;
	}

	.er-item-list-author {
		font-size: 12px;
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
		// border-bottom: 1px solid #d5d5d6;
		// box-shadow: 0px 0px 6px #d5d5d6;
		border-radius: 10px;
		/* padding-bottom: 10px; */
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		// padding: 10px;
	}
</style>
