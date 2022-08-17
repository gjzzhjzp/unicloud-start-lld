<template>
	<view>
		<u-navbar :is-back="true" title="TA的个人资料"></u-navbar>
		<uni-list>
			<uni-list-item class="item">
				<template v-slot:body>
					<view :class="['item']">
						<text>{{$t('userinfo.ProfilePhoto')}}</text>
						<view :class="[isoriginal?'original':'']">
							<view class="original" v-if="isoriginal">
								<image class="original-img" src="@/static/center/ori_back.png"></image>
							</view>
							<!-- avatar_file：{{avatar_file}} -->
							<cloud-image v-if="curuserinfo.avatar_file" :src="curuserinfo.avatar_file.url" width="50px" height="50px">
							</cloud-image>
							<image v-else class="logo-img" src="@/static/center/nologin.png"></image>
							<!-- <uni-icons v-else class="chooseAvatar" type="plusempty" size="30" color="#dddddd">
							</uni-icons> -->
						</view>
					</view>
				</template>
			</uni-list-item>
			<!-- <uni-list-item class="item" title="用户/登录名" :rightText="curuserinfo.username">
			</uni-list-item> -->
			<uni-list-item class="item" title="昵称"
				:rightText="curuserinfo.nickname">
			</uni-list-item>
		</uni-list>
	</view>
</template>
<script>
	import dealimage from "@/common/dealimage.js"
	const db = uniCloud.database();
	const usersTable = db.collection('uni-id-users')
	export default {
		data() {
			return {
				curid: "", ///当前id
				isoriginal: false,
				curuserinfo: {}, ////当前用户
			}
		},
		mixins:[dealimage],
		created() {
			this.getUserinfo();
		},
		computed: {
			avatar_file() {
				if (this.userInfo.avatar_file && this.userInfo.avatar_file.url) {
					return this.userInfo.avatar_file
				}
			}
		},
		methods: {
			///获取用户信息
			async getUserinfo() {
				var _id = this.$Route.query.id;
				this.curid = _id;
				const usersTable = db.collection('uni-id-users')
				var userdata = await usersTable.where({
					_id: _id
				}).field(
					"username,weiboname,resources,weibocontent,nickname,isbdwb,original,forbiddenwords,status,avatar,avatar_file,role,register_date,token"
				).get();
				userdata.result.data= this.dealImgResource(userdata.result.data);
				var userinf = userdata.result.data[0];
				this.curuserinfo = userinf;
			},
		}
	}
</script>
<style lang="scss" scoped>
	.logo-img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	.original {
		position: relative;
	}

	.original-img {
		width: 70px;
		height: 70px;
		position: absolute;
		top: -8px;
		left: -11px;
	}

	/* #ifndef APP-NVUE */
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	/* #endif */
	.item {
		width: 750rpx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.chooseAvatar {
		border: dotted 1px #ddd;
		border-radius: 10px;
		text-align: center;
		width: 50px;
		height: 50px;
		line-height: 50px;
		z-index: 99;
	}
</style>
