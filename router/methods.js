import checksh from "@/common/checksh.js";
export default {
	initconfig() {
		console.log("initconfig");
		var app_bbh="117";
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
			var userinf1=getApp().globalData.userinf;
			if(userinf1){
				if (userinf1.status == 1) { //禁用
					uni.reLaunch({
						url: "/uview-ui/components/u-full-screen/u-full-screen-ztjy"
					})
					reslove(false);
				} else {
					reslove(true);
				}
			}else{
				uni.showLoading({
					title:"加载中"
				})
				const db = uniCloud.database();
				var userinfo = uni.getStorageSync("userInfo");
				if(userinfo){
					const usersTable = db.collection('uni-id-users')
					var userdata = await usersTable.where('_id==$env.uid').field("username,nickname,isbdwb,original,forbiddenwords,status,avatar,avatar_file,role,register_date,token").get();
					console.log("userdata", userdata);
					var userinf = userdata.result.data[0];
					uni.setStorageSync("userInfo",userinf);
					getApp().globalData.userinf=userinf;
					setTimeout(()=>{
						getApp().globalData.userinf=null;
					},1000*60*30)
					uni.hideLoading()
					if (userinf.status == 1) { //禁用
						uni.reLaunch({
							url: "/uview-ui/components/u-full-screen/u-full-screen-ztjy"
						})
						reslove(false);
					} else {
						reslove(true);
					}
				}else{
					uni.hideLoading()
					reslove(true);
				}
			}
		});
	},
	// 获取配置项和微博内容
	getConfig() {
		return new Promise((reslove) => {
		var config=getApp().globalData.systemconfig;
		if(config){
			reslove(config);
		}else{
			uni.showLoading({
				title:"加载中"
			})
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
						getApp().globalData.systemconfig = config;
						getApp().globalData.weiboyz = weiboyz;
						// this.setfks(config);
						setTimeout(()=>{
							// 每隔10分钟请求一次，不要连续频繁请求
							getApp().globalData.systemconfig=null;
						},1000*60*30)
						uni.hideLoading()
						reslove(config);
					} else {
						uni.hideLoading()
						uni.showToast({
							title: res.msg,
							icon: null
						});
					}
				});
			}
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
