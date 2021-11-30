export default {
	data() {
		return {}
	},
	onShow() {
		var istgzcsh = uni.getStorageSync("istgzcsh_success"); //是否通过登录注册审核
		var question_success = uni.getStorageSync("question_success");
		if(istgzcsh&&question_success){
			this.getgonggao();
		}
		if(this.$refs.notice){
			this.$refs.notice.getList();
		}
	},
	methods: {
		async getgonggao() {
			var that = this;
			// 已通过注册审核和对暗号
			var gonggao = {};
			const db = uniCloud.database();
			const collection = await db.collection('jz-custom-gonggao').where({
				status: true
			}).get();
			if (collection.result.data && collection.result.data.length) {
				var rows = collection.result.data;
				rows.forEach((item) => {
					gonggao[item.number] = {
						content: item.content,
						type: item.type,
						title: item.title,
						number: item.number
					};
				});
				getApp().globalData.gonggao = gonggao;
				this._gonggao();
			}
		},
		_gonggao() {
			// debugger;
			var gonggaocon = {};
			var gonggao = getApp().globalData.gonggao;
			for (var key in gonggao) {
				var str = uni.getStorageSync("gonggao_" + key);
				if (!str) {
					gonggaocon = gonggao[key];
					break;
				}
			}
			if (gonggaocon.content) {
				if(this.gonggao_content){
					this.gonggao_content = gonggaocon.content;
					this.gonggao_title = gonggaocon.title;
					this.gonggao_number = gonggaocon.number;
					this.show();
				}else{
					this.$refs.gonggao.gonggao_content = gonggaocon.content;
					this.$refs.gonggao.gonggao_title = gonggaocon.title;
					this.$refs.gonggao.gonggao_number = gonggaocon.number;
					this.$refs.gonggao.show();
				}
				
				// uni.showModal({
				// 	title: gonggaocon.title || "提示",
				// 	showCancel: false,
				// 	confirmText: "确定",
				// 	content: gonggaocon.content,
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			uni.setStorageSync("gonggao_" + gonggaocon.number,true);
				// 			_gonggao();
				// 		}
				// 	}
				// });
			}
		}
	}
}
