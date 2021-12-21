import checksh from "@/common/checksh.js";
export default {
	initconfig() {
		console.log("initconfig");
		var app_bbh="105";
		//#ifdef APP-PLUS
		app_bbh = plus.runtime.versionCode;
		//#endif
		var yqm_success = uni.getStorageSync("yqm_success");
		var config=getApp().globalData.systemconfig;
		if (config["800014"] && config["800014"] == '1'&& app_bbh<config["800004"]) {
			uni.reLaunch({
				url: "/uview-ui/components/u-full-screen/u-full-screen-xtsd"
			})
		} else if (config["800015"] && config["800015"] == "1" && !
			yqm_success) {
			uni.reLaunch({
				url: "/uview-ui/components/u-full-screen/u-full-screen-yqm"
			})
		} else {
			var question_success1 = uni.getStorageSync("question_success1");
			if (!question_success1) {
				uni.reLaunch({
					url: "/pages/question/question"
				});
			} else {
				checksh.methods.no_istgzcsh();
			}
		}
	},
	// 检查用户状态，如果禁用限制访问
	async checkUserStatus() {
		return new Promise(async (reslove) => {
			// debugger;
			const db = uniCloud.database();
			const usersTable = db.collection('uni-id-users')
			var userdata = await usersTable.where('_id==$env.uid').field("username,nickname,isbdwb,original,forbiddenwords,status,avatar,avatar_file,role,register_date,token").get();
			console.log("userdata", userdata);
			var userinf = userdata.result.data[0];
			uni.setStorageSync("userInfo",userinf);
			if (userinf.status == 1) { //禁用
				uni.reLaunch({
					url: "/uview-ui/components/u-full-screen/u-full-screen-ztjy"
				})
				reslove(false);
			} else {
				reslove(true);
			}
		});
	},
	// 获取配置项和微博内容
	getConfig() {
		// debugger;
		return new Promise((reslove) => {
			uniCloud.callFunction({
				name: 'jzfunction',
				data: {
					action: 'config/getConfig'
				},
			}).then((res) => {
				var res = res.result;
				var config = {};
				var weiboyz = [];
				if (res.state == "0000") {
					var configdata = res.data.config;
					var weiboyzdata = res.data.weiboyz;
					if (configdata.data && configdata.data.length > 0) {
						configdata.data.forEach((item) => {
							config[item.config_bm] = item.config_val;
						});
					}
					if (weiboyzdata.data && weiboyzdata.data.length > 0) {
						weiboyzdata.data.forEach((item) => {
							weiboyz.push(item.content);
						});
					}
					console.log("configaaaaaaaaaaaaaaaaaaa",config);
					getApp().globalData.systemconfig = config;
					getApp().globalData.weiboyz = weiboyz;
					// this.setfks(config);
					reslove(config);
				} else {
					uni.showToast({
						title: res.msg,
						icon: null
					});
				}
			});
		});
	}
	// setfks(config) {
	// 	debugger;
	// 	var parames = {
	// 		config: config
	// 	};
	// 	var app_bbh = "";
	// 	//#ifdef APP-PLUS
	// 	app_bbh = plus.runtime.versionCode;
	// 	//#endif
	// 	if (app_bbh) {
	// 		Object.assign(parames, {
	// 			app_bbh: app_bbh
	// 		});
	// 	}
	// 	uniCloud.callFunction({
	// 		name: 'jzfunction',
	// 		data: {
	// 			action: 'fks/setfks',
	// 			data: parames
	// 		},
	// 	}).then((res) => {
	// 		var res = res.result;
	// 		if (res.state == "0000") {
	// 			console.log(res.msg)
	// 		} else {
	// 			uni.reLaunch({
	// 				url: "/uview-ui/components/u-full-screen/u-full-screen"
	// 			})
	// 		}
	// 	});
	// }
}
