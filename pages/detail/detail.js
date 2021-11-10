const db = uniCloud.database();
const uid = db.getCloudEnv('$cloudEnv_uid');
const collection = db.collection('opendb-news-favorite');
export default {
	data() {
		return {
			islike: false
		}
	},
	created() {
		this.checkisLike();
	},
	methods: {
		// 检测当前用户是否已经收藏
		async checkisLike() {
			var res = await collection.where({
				article_id: this.data._id,
				user_id: db.getCloudEnv('$cloudEnv_uid')
			}).get();
			if (res.result && res.result.data.length > 0) {
				this.islike = true;
			} else {
				this.islike = false;
			}
			// console.log("likes",likes);
		},
		async toFavorite() {
			var resultdata = await collection.add({
				article_id: this.data._id,
				article_title: this.data.title,
				user_id: db.getCloudEnv('$cloudEnv_uid'),
				create_date: db.getCloudEnv('$cloudEnv_now')
			});
			this.add_like();
		},
		add_like() {
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
					this.islike = true;
					this.$set(this.data, "like_count", ++this.data.like_count);
				} else {
					console.log("res", res.msg);
				}
			});
		},
	}
}
