const db = uniCloud.database();
const uid = db.getCloudEnv('$cloudEnv_uid');
const collection = db.collection('opendb-news-favoriteTaolun');
import {
	mapGetters
} from 'vuex';
export default {
	data() {
		return {
			islike: false
		}
	},
	computed: {
		...mapGetters({
			userInfo: 'user/info',
			hasLogin: 'user/hasLogin'
		})
	},
	methods: {
		async toFavorite() {
			// debugger;
			return new Promise(async (reslove) => {
				var resultdata = await collection.add({
					article_id: this.data._id,
					article_title: this.data.title,
					categories: this.data.categories,
					user_id: db.getCloudEnv('$cloudEnv_uid'),
					create_date: db.getCloudEnv('$cloudEnv_now')
				});
				this.add_like().then(async () => {
					var add_value = {
						type: 4,
						user_id:  this.data.user_id,
						comment: "你的帖子【<span class='ftid' id='"+this.data._id+"'>"+this.data.title+"</span>】被宝子【"+this.userInfo.nickname+"】收藏啦~~"
					}
					await db.collection("jz-custom-systeminfo").add(add_value);
					reslove();
				});
			});
		},
		async cancelFavorite() {
			return new Promise(async (reslove) => {
				var resultdata = await collection.where({
					article_id: this.data._id,
					user_id: db.getCloudEnv('$cloudEnv_uid')
				}).remove();
				this.cancel_like().then(() => {
					reslove()
				});
			});
		},
		cancel_like() {
			return new Promise((reslove) => {
				uniCloud.callFunction({
					name: 'jztaolun',
					data: {
						action: 'taolun/cancel_like',
						data: {
							_id: this.data._id,
							like_count: this.data.like_count || 0
						}
					},
				}).then((res) => {
					var res = res.result;
					if (res.state == "0000") {
						this.$refs.uToast.show({
							title: '已取消',
							type: 'success'
						});
						// this.islike = false;
						this.$set(this,"islike",false);
						this.$set(this.data, "like_count", --this.data.like_count);
					} else {
						console.log("res", res.msg);
					}
					reslove();
				}).catch((err) => {
					console.log("网络错误，请重试——err", err);
					uni.showModal({
						content: err.message || '网络错误，请重试',
						showCancel: false
					});
				});
			});
		},
		add_like() {
			return new Promise((reslove) => {
				if (!this.data.like_count) {
					this.data.like_count = 0;
				}
				uniCloud.callFunction({
					name: 'jztaolun',
					data: {
						action: 'taolun/add_like',
						data: {
							_id: this.data._id,
							like_count: this.data.like_count || 0
						}
					},
				}).then((res) => {
					var res = res.result;
					if (res.state == "0000") {
						this.$refs.uToast.show({
							title: '收藏成功',
							type: 'success'
						});
						// this.islike = true;
						this.$set(this,"islike",true);
						this.$set(this.data, "like_count", ++this.data.like_count);
					} else {
						console.log("res", res.msg);
					}
					reslove();
				}).catch((err) => {
					console.log("网络错误，请重试——err", err);
					uni.showModal({
						content: err.message || '网络错误，请重试',
						showCancel: false
					});
				});
			});
		},
	}
}
