const db = uniCloud.database();
const uid = db.getCloudEnv('$cloudEnv_uid');
const collection = db.collection('opendb-news-favorite');
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
	mounted() {
		console.log("this.data", this.data);
		// this.checkisLike();
	},
	watch: {
		// data: {
		// 	deep: true,
		// 	handler() {
		// 		debugger;
		// 		this.checkisLike();
		// 	}
		// }
	},
	methods: {
		// checkisLike() {
		// 	if (this.data && this.data.favorite && this.data.favorite.length > 0) {
		// 		this.islike = true;
		// 	} else {
		// 		this.islike = false;
		// 	}
		// },
		// 检测当前用户是否已经收藏
		// async checkisLike() {
		// 	// debugger;
		// 	if (this.hasLogin) {
		// 		console.log("this.data",this.data,this.data._id);
		// 		if(this.data._id){
		// 			var res = await collection.where({
		// 				article_id: this.data._id,
		// 				user_id: db.getCloudEnv('$cloudEnv_uid')
		// 			}).get();
		// 			if (res.result && res.result.data.length > 0) {
		// 				if(res.result.data[0].article_id==this.data._id){
		// 					this.islike = true;
		// 				}else{
		// 					this.islike = false;
		// 				}
		// 			} else {
		// 				this.islike = false;
		// 			}
		// 		}
		// 	}
		// 	// console.log("likes",likes);
		// },
		async toFavorite() {
			// debugger;
			return new Promise(async (reslove) => {
				var resultdata = await collection.add({
					article_id: this.data._id,
					article_title: this.data.title,
					zy_gs: this.data.zy_gs,
					user_id: db.getCloudEnv('$cloudEnv_uid'),
					create_date: db.getCloudEnv('$cloudEnv_now')
				});
				this.add_like().then(async () => {
					var add_value = {
						type: 1,
						user_id:  this.data.user_id,
						comment: "你的投稿作品【<span class='zyid' id='"+this.data._id+"'>"+this.data.title+"</span>】被宝子【"+this.userInfo.nickname+"】收藏啦~~"
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
					name: 'jzfunction',
					data: {
						action: 'resource/cancel_like',
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
					name: 'jzfunction',
					data: {
						action: 'resource/add_like',
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
